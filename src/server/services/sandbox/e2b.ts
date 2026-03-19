import { Sandbox } from '@e2b/code-interpreter';
import debug from 'debug';

const log = debug('lobe-server:e2b-sandbox');

export interface E2BExecutionResult {
  error?: {
    code?: string;
    message: string;
  };
  output?: string;
  success: boolean;
}

/**
 * E2B Sandbox Service for self-hosted code execution
 * 
 * This service uses E2B (https://e2b.dev) for secure code execution
 * instead of relying on LobeHub's marketplace.
 */
export class E2BSandboxService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.E2B_API_KEY || '';
    if (!this.apiKey) {
      log('Warning: E2B_API_KEY not set. Code execution will not work.');
    }
  }

  /**
   * Check if E2B is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Execute Python code in E2B sandbox
   */
  async executePython(code: string): Promise<E2BExecutionResult> {
    if (!this.isConfigured()) {
      return {
        error: {
          code: 'E2B_NOT_CONFIGURED',
          message: 'E2B API key not configured. Please set E2B_API_KEY environment variable.',
        },
        success: false,
      };
    }

    let sandbox: Sandbox | null = null;

    try {
      log('Creating E2B sandbox for Python execution');
      sandbox = await Sandbox.create({ apiKey: this.apiKey });

      log('Executing Python code');
      const execution = await sandbox.runCode(code);

      const output = execution.logs.stdout.join('\n') + execution.logs.stderr.join('\n');

      if (execution.error) {
        return {
          error: {
            message: execution.error.message || 'Execution error',
          },
          output,
          success: false,
        };
      }

      return {
        output: output || execution.text || 'Code executed successfully',
        success: true,
      };
    } catch (error) {
      log('E2B execution error: %O', error);
      return {
        error: {
          message: (error as Error).message,
        },
        success: false,
      };
    } finally {
      if (sandbox) {
        try {
          await sandbox.kill();
        } catch (e) {
          log('Error killing sandbox: %O', e);
        }
      }
    }
  }

  /**
   * Execute JavaScript/Node.js code in E2B sandbox
   */
  async executeJavaScript(code: string): Promise<E2BExecutionResult> {
    if (!this.isConfigured()) {
      return {
        error: {
          code: 'E2B_NOT_CONFIGURED',
          message: 'E2B API key not configured. Please set E2B_API_KEY environment variable.',
        },
        success: false,
      };
    }

    let sandbox: Sandbox | null = null;

    try {
      log('Creating E2B sandbox for JavaScript execution');
      sandbox = await Sandbox.create({ apiKey: this.apiKey });

      // Write JS file and execute with Node
      await sandbox.filesystem.write('/tmp/script.js', code);
      const execution = await sandbox.process.start({
        cmd: 'node /tmp/script.js',
      });
      
      await execution.wait();
      const output = execution.output.stdout + execution.output.stderr;

      return {
        output: output || 'Code executed successfully',
        success: execution.exitCode === 0,
      };
    } catch (error) {
      log('E2B execution error: %O', error);
      return {
        error: {
          message: (error as Error).message,
        },
        success: false,
      };
    } finally {
      if (sandbox) {
        try {
          await sandbox.kill();
        } catch (e) {
          log('Error killing sandbox: %O', e);
        }
      }
    }
  }
}

// Singleton instance
let e2bService: E2BSandboxService | null = null;

export function getE2BSandboxService(): E2BSandboxService {
  if (!e2bService) {
    e2bService = new E2BSandboxService();
  }
  return e2bService;
}
