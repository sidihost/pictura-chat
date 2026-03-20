import { Sandbox } from '@e2b/code-interpreter';
import debug from 'debug';

const log = debug('pictura-server:e2b-sandbox');

export interface E2BExecutionResult {
  error?: {
    code?: string;
    message: string;
  };
  output?: string;
  success: boolean;
}

export interface E2BFileResult extends E2BExecutionResult {
  fileData?: string; // Base64 encoded file data
  filename?: string;
  mimeType?: string;
}

/**
 * Pictura AI E2B Sandbox Service for powerful code execution and document creation
 * 
 * This service uses E2B (https://e2b.dev) for secure code execution.
 * Supports Python, JavaScript, and document creation (DOCX, PDF, XLSX, CSV, TXT, HTML, JSON, etc.)
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

  /**
   * Create any type of document using Python in E2B sandbox
   * Supports: docx, pdf, xlsx, csv, txt, html, json, md, xml, pptx
   */
  async createDocument(
    type: string,
    content: string,
    filename?: string,
    options?: {
      title?: string;
      author?: string;
      headers?: string[];
      rows?: string[][];
    }
  ): Promise<E2BFileResult> {
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
    const fileType = type.toLowerCase().replace('.', '');
    const outputFilename = filename || `document.${fileType}`;
    const escapedContent = content.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"').replace(/`/g, '\\`');

    try {
      log('Creating E2B sandbox for document creation: %s', fileType);
      sandbox = await Sandbox.create({ apiKey: this.apiKey });

      let pythonCode: string;
      let mimeType: string;

      switch (fileType) {
        case 'docx':
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'python-docx'], capture_output=True, check=True)

from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# Add title if provided
title = """${options?.title || ''}"""
if title:
    heading = doc.add_heading(title, 0)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER

# Add content
content = """${escapedContent}"""
for para in content.split('\\n'):
    if para.strip():
        p = doc.add_paragraph(para)

doc.save('/tmp/${outputFilename}')
print('DOCX created successfully')

# Read and output as base64
import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'pdf':
          mimeType = 'application/pdf';
          pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'reportlab'], capture_output=True, check=True)

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

doc = SimpleDocTemplate('/tmp/${outputFilename}', pagesize=letter)
styles = getSampleStyleSheet()
story = []

# Add title if provided
title = """${options?.title || ''}"""
if title:
    story.append(Paragraph(title, styles['Title']))
    story.append(Spacer(1, 12))

# Add content
content = """${escapedContent}"""
for para in content.split('\\n'):
    if para.strip():
        story.append(Paragraph(para, styles['Normal']))
        story.append(Spacer(1, 6))

doc.build(story)
print('PDF created successfully')

# Read and output as base64
import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'xlsx':
        case 'xls':
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'openpyxl'], capture_output=True, check=True)

from openpyxl import Workbook
from openpyxl.styles import Font, Alignment

wb = Workbook()
ws = wb.active
ws.title = "Sheet1"

# Parse content as CSV-like data or plain text
content = """${escapedContent}"""
headers = ${JSON.stringify(options?.headers || [])}
rows = ${JSON.stringify(options?.rows || [])}

if headers:
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.font = Font(bold=True)
    
    for row_idx, row_data in enumerate(rows, 2):
        for col_idx, value in enumerate(row_data, 1):
            ws.cell(row=row_idx, column=col_idx, value=value)
else:
    # Parse content as lines
    for row_idx, line in enumerate(content.split('\\n'), 1):
        if line.strip():
            cols = line.split(',') if ',' in line else line.split('\\t') if '\\t' in line else [line]
            for col_idx, value in enumerate(cols, 1):
                ws.cell(row=row_idx, column=col_idx, value=value.strip())

wb.save('/tmp/${outputFilename}')
print('Excel file created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'csv':
          mimeType = 'text/csv';
          pythonCode = `
import csv

content = """${escapedContent}"""
headers = ${JSON.stringify(options?.headers || [])}
rows = ${JSON.stringify(options?.rows || [])}

with open('/tmp/${outputFilename}', 'w', newline='') as f:
    writer = csv.writer(f)
    if headers:
        writer.writerow(headers)
        writer.writerows(rows)
    else:
        for line in content.split('\\n'):
            if line.strip():
                writer.writerow(line.split(',') if ',' in line else [line])

print('CSV created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'html':
          mimeType = 'text/html';
          pythonCode = `
content = """${escapedContent}"""
title = """${options?.title || 'Document'}"""

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }}
        h1 {{ color: #C87941; }}
    </style>
</head>
<body>
    <h1>{title}</h1>
    {''.join(f'<p>{p}</p>' for p in content.split(chr(10)) if p.strip())}
</body>
</html>'''

with open('/tmp/${outputFilename}', 'w') as f:
    f.write(html)

print('HTML created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'json':
          mimeType = 'application/json';
          pythonCode = `
import json

content = """${escapedContent}"""

# Try to parse as JSON, otherwise create a simple structure
try:
    data = json.loads(content)
except:
    data = {"content": content.split('\\n')}

with open('/tmp/${outputFilename}', 'w') as f:
    json.dump(data, f, indent=2)

print('JSON created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'md':
        case 'markdown':
          mimeType = 'text/markdown';
          pythonCode = `
content = """${escapedContent}"""
title = """${options?.title || ''}"""

md_content = f"# {title}\\n\\n" if title else ""
md_content += content

with open('/tmp/${outputFilename}', 'w') as f:
    f.write(md_content)

print('Markdown created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'pptx':
          mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          pythonCode = `
import subprocess
subprocess.run(['pip', 'install', 'python-pptx'], capture_output=True, check=True)

from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()
title_slide_layout = prs.slide_layouts[0]
content_slide_layout = prs.slide_layouts[1]

content = """${escapedContent}"""
title = """${options?.title || 'Presentation'}"""

# Title slide
slide = prs.slides.add_slide(title_slide_layout)
title_shape = slide.shapes.title
subtitle = slide.placeholders[1]
title_shape.text = title
subtitle.text = "Created by Pictura AI"

# Content slides (split by double newlines or create one slide per paragraph)
sections = [s.strip() for s in content.split('\\n\\n') if s.strip()]
for section in sections[:10]:  # Limit to 10 slides
    slide = prs.slides.add_slide(content_slide_layout)
    slide.shapes.title.text = section[:50] + "..." if len(section) > 50 else section
    body = slide.placeholders[1]
    body.text = section

prs.save('/tmp/${outputFilename}')
print('PowerPoint created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;

        case 'txt':
        default:
          mimeType = 'text/plain';
          pythonCode = `
content = """${escapedContent}"""
with open('/tmp/${outputFilename}', 'w') as f:
    f.write(content)

print('Text file created successfully')

import base64
with open('/tmp/${outputFilename}', 'rb') as f:
    print('BASE64_START')
    print(base64.b64encode(f.read()).decode('utf-8'))
    print('BASE64_END')
`;
          break;
      }

      log('Executing document creation code for type: %s', fileType);
      const execution = await sandbox.runCode(pythonCode);

      const stdout = execution.logs.stdout.join('\n');
      const stderr = execution.logs.stderr.join('\n');

      if (execution.error) {
        return {
          error: { message: execution.error.message || 'Document creation error' },
          output: stderr,
          success: false,
        };
      }

      // Extract base64 data from output
      const base64Match = stdout.match(/BASE64_START\n([\s\S]*?)\nBASE64_END/);
      const fileData = base64Match ? base64Match[1].trim() : undefined;

      return {
        fileData,
        filename: outputFilename,
        mimeType,
        output: `Document created: ${outputFilename}`,
        success: true,
      };
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
   * Install Python packages and run code
   */
  async installAndRun(packages: string[], code: string): Promise<E2BExecutionResult> {
    if (!this.isConfigured()) {
      return {
        error: {
          code: 'E2B_NOT_CONFIGURED',
          message: 'E2B API key not configured.',
        },
        success: false,
      };
    }

    let sandbox: Sandbox | null = null;

    try {
      sandbox = await Sandbox.create({ apiKey: this.apiKey });

      // Install packages
      if (packages.length > 0) {
        const installCode = `import subprocess\nsubprocess.run(['pip', 'install', ${packages.map(p => `'${p}'`).join(', ')}], capture_output=True)`;
        await sandbox.runCode(installCode);
      }

      // Run user code
      const execution = await sandbox.runCode(code);
      const output = execution.logs.stdout.join('\n') + execution.logs.stderr.join('\n');

      return {
        output: output || execution.text || 'Code executed successfully',
        success: !execution.error,
      };
    } catch (error) {
      return {
        error: { message: (error as Error).message },
        success: false,
      };
    } finally {
      if (sandbox) {
        try { await sandbox.kill(); } catch {}
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
