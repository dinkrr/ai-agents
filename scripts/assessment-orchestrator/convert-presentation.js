/**
 * convert-presentation.js
 * Converts a .pptx file to a .md file for use by assessment agents.
 *
 * Usage:
 *   node scripts/assessment-orchestrator/convert-presentation.js <path-to-file.pptx> [output-path.md]
 *   npm run convert-ppt -- <path-to-file.pptx> [output-path.md]
 *
 * Output defaults to the same directory as the input, with a .md extension.
 */

const { parseOffice } = require('officeparser');
const path = require('path');
const fs = require('fs');

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Error: No input file provided.');
  console.error('Usage: npm run convert-ppt -- <path-to-file.pptx> [output-path.md]');
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found — ${inputPath}`);
  process.exit(1);
}

const ext = path.extname(inputPath).toLowerCase();
if (ext !== '.pptx' && ext !== '.ppt') {
  console.error(`Error: Expected a .pptx file, got ${ext}`);
  process.exit(1);
}

const defaultOutput = inputPath.replace(/\.(pptx|ppt)$/i, '.md');
const outputPath = process.argv[3] || defaultOutput;

console.log(`Converting: ${inputPath}`);

parseOffice(inputPath, (result, err) => {
  if (err) {
    console.error('Conversion failed:', err.message);
    process.exit(1);
  }

  const filename = path.basename(inputPath, ext);
  const lines = [
    `# ${filename}`,
    '',
    `> Converted from .pptx for agent processing.`,
    `> Author: ${result.metadata.author || 'Unknown'} | Modified: ${result.metadata.lastModifiedBy || 'Unknown'} | Date: ${result.metadata.modified ? new Date(result.metadata.modified).toDateString() : 'Unknown'}`,
    '',
    '---',
    ''
  ];

  result.content.forEach((slide, i) => {
    if (slide.type !== 'slide') return;
    const slideText = extractText(slide).trim();
    if (!slideText) return;
    lines.push(`## Slide ${i + 1}`);
    lines.push('');
    lines.push(slideText);
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`Done: ${outputPath}`);
});

function extractText(node) {
  if (node.type === 'image') return '';
  if (node.type === 'text') return node.text || '';
  if (node.children && node.children.length) {
    const childText = node.children.map(extractText).join('').trim();
    if (node.type === 'paragraph' && childText) return childText + '\n';
    return childText;
  }
  return node.text || '';
}
