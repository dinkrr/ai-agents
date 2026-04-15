---
name: convert-ppt
description: Converts a .pptx file to Markdown using the project's npm script. Use when the input self-presentation is a .pptx file path. Returns the full text content of the converted Markdown file.
compatibility: GitHub Copilot. Requires Node.js and npm install to have been run in the project.
---

# Convert PowerPoint to Markdown

This skill converts a `.pptx` file to Markdown so the presentation content can be read and analyzed.

## When to Use

Use this skill when the Self Presentation input is a `.pptx` file path. If the input is already a `.md` / `.txt` file path, read it directly. If it is pasted inline, use it as-is — do not run this skill.

## Steps

1. Run the conversion script, passing the `.pptx` file path as an argument:

   ```
   npm run convert-ppt -- <path-to-file.pptx>
   ```

2. The script produces a `.md` file in the same directory as the input file. Read that `.md` file.

3. Use the file's text content in all subsequent steps. Do not re-run the conversion later in the same session.

## Output

The converted Markdown file. Use its content as the presentation text for the current task.
