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
   * Create a document (DOCX, PDF, etc.) using Python in E2B sandbox
   */
  async createDocument(
    type: 'docx' | 'pdf' | 'txt',
    content: string,
    filename?: string
  ): Promise<E2BExecutionResult & { fileData?: string }> {
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
    const outputFilename = filename || `document.${type}`;

    try {
      log('Creating E2B sandbox for document creation');
      sandbox = await Sandbox.create({ apiKey: this.apiKey });

      let pythonCode: string;

      if (type === 'docx') {
        // Install python-docx and create DOCX
        pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'python-docx'], capture_output=True)

from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# Add content
content = """${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""

for para in content.split('\\n'):
    if para.strip():
        p = doc.add_paragraph(para)

doc.save('/tmp/${outputFilename}')
print('Document created successfully: ${outputFilename}')
`;
      } else if (type === 'pdf') {
        // Install reportlab and create PDF
        pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'reportlab'], capture_output=True)

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch

c = canvas.Canvas('/tmp/${outputFilename}', pagesize=letter)
width, height = letter

content = """${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""

y = height - inch
for line in content.split('\\n'):
    if y < inch:
        c.showPage()
        y = height - inch
    c.drawString(inch, y, line[:80])  # Truncate long lines
    y -= 14

c.save()
print('PDF created successfully: ${outputFilename}')
`;
      } else {
        // Simple text file
        pythonCode = `
content = """${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"""
with open('/tmp/${outputFilename}', 'w') as f:
    f.write(content)
print('Text file created successfully: ${outputFilename}')
`;
      }

      log('Executing document creation code');
      const execution = await sandbox.runCode(pythonCode);

      const output = execution.logs.stdout.join('\n') + execution.logs.stderr.join('\n');

      if (execution.error) {
        return {
          error: { message: execution.error.message || 'Document creation error' },
          output,
          success: false,
        };
      }

      // Read the created file as base64
      try {
        const fileContent = await sandbox.filesystem.read(`/tmp/${outputFilename}`);
        const base64Data = Buffer.from(fileContent).toString('base64');
        
        return {
          fileData: base64Data,
          output: `Document created: ${outputFilename}`,
          success: true,
        };
      } catch {
        return {
          output: output || 'Document created but could not read file',
          success: true,
        };
      }
    } catch (error) {
      log('E2B document creation error: %O', error);
      return {
        error: { message: (error as Error).message },
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
