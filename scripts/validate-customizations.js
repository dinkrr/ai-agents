const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skillsDirectory = path.join(root, '.github', 'skills');
const agentDirectory = path.join(root, '.github', 'agents');
const references = [
  '.github/skills/evaluate-ai-native-java/references/flight-tracker-task.md',
  '.github/skills/evaluate-ai-native-java/references/technical-interview-guide.md'
];

function getFiles(directory, predicate) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return getFiles(entryPath, predicate);
    }
    return predicate(entry.name) ? [entryPath] : [];
  });
}

const customizations = [
  ...getFiles(skillsDirectory, (name) => name === 'SKILL.md'),
  ...getFiles(agentDirectory, (name) => name.endsWith('.agent.md'))
];

for (const file of customizations) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/^---\r?\n[\s\S]*?\r?\n---/.test(content)) {
    throw new Error(`${path.relative(root, file)} is missing YAML frontmatter.`);
  }
}

for (const file of references) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing reference file: ${file}`);
  }
}

const javaSkillDirectory = path.join(skillsDirectory, 'evaluate-ai-native-java');
const javaSkill = fs.readFileSync(path.join(javaSkillDirectory, 'SKILL.md'), 'utf8');
const router = fs.readFileSync(path.join(agentDirectory, 'ai-native-engineer-assessment.agent.md'), 'utf8');
const saveOutput = fs.readFileSync(path.join(skillsDirectory, 'save-output', 'SKILL.md'), 'utf8');

if (!/^name: evaluate-ai-native-java$/m.test(javaSkill)) {
  throw new Error('Java TI2 skill name must match its directory name.');
}

if (!router.includes('evaluate-ai-native-java') || !router.includes('ai-native-java-feedback')) {
  throw new Error('AI Native assessment agent must route Java TI2 evaluations and outputs.');
}

if (!saveOutput.includes('ai-native-java-feedback')) {
  throw new Error('Save-output skill must support Java TI2 feedback.');
}

console.log('Customization validation passed.');