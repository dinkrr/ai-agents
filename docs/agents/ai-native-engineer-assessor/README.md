# AI Native Engineer Assessor Agent

## Overview
This agent helps assess candidates for the AI Native Engineer role based on their 1-hour presentation session.

## How to Use

### Step 1: Conduct Assessment Session
- Schedule a 1-hour session with the candidate
- Candidate presents their contributions, achievements, and AI use-cases
- Record the transcript (presentation + Q&A)
- **Ask technical questions** to validate understanding (Temperature, TopP, MCP, etc.)

### Step 2: Invoke the Agent
In VS Code Copilot Chat, type:
```
@ai-native-engineer-assessor
```
Then paste the session transcript.

### Step 3: Review Output
The agent provides:
- ✅ Eligibility check (6 criteria)
- 🎯 Use Case Quality Assessment (Team vs Individual impact)
- 🧪 Technical Q&A Validation (correctness of answers)
- 📊 Productivity Metrics Extraction (quantifiable improvements)
- ⭐ Star ratings (1-5) for 5 evaluation dimensions
- 📋 Final recommendation (Yes / No / Yes with improvements)
- 💬 Detailed comments including knowledge gaps

### Step 4: Submit Evaluation
Use the output to fill the Microsoft Form:
https://forms.microsoft.com/pages/responsepage.aspx?id=0HIbtJ9OJkyKaflJ82fJHRcVgeLO-gxCqGvQNI-dLzhUMjhSTERWSEE3RVFCSkE5RTI5RTcyUDNFTy4u&route=shorturl

---

## Key Evaluation Features

### 1. Use Case Quality Assessment
The agent evaluates if use cases are truly AI Native Engineer worthy:

| ✅ Good Use Cases | ❌ Weak Use Cases |
|-------------------|-------------------|
| Team/org-wide automation | Personal code completion |
| Shared tools/agents | One-off personal scripts |
| Production deployments | Basic autocomplete usage |
| Multi-user solutions | Individual productivity only |

### 2. Technical Answer Validation
The agent validates correctness of technical Q&A:

| Topic | What Agent Validates |
|-------|---------------------|
| Temperature | Randomness control (0=deterministic, 1+=creative) |
| Top-P | Nucleus sampling probability threshold |
| Top-K | Token selection limit |
| Context Window | Model's max token capacity |
| MCP | Model Context Protocol understanding |
| Agent Mode | Autonomous task execution concepts |

### 3. Productivity Metrics Extraction
The agent captures all quantifiable improvements:

| Metric Type | Examples |
|-------------|----------|
| Time Savings | "Reduced from 4 days to 1 hour" |
| Effort Reduction | "Automated 80% of manual steps" |
| Quality Gains | "95% accuracy, 50% fewer errors" |
| Scale of Impact | "Used by 14 developers across 95 stories" |

The agent assesses if metrics are:
- **Quantifiable** - Specific numbers provided
- **Verifiable** - Claims are reasonable
- **Impactful** - Shows significant value
- **Team-level** - Benefits beyond individual

---

## Eligibility Criteria (Must Have)

| # | Criterion | What It Means |
|---|-----------|---------------|
| 1 | Active AI Tool Usage | Using Copilot, Windsurf, Claude Code, Cursor in real projects |
| 2 | Advanced GenAI Capabilities | Agent Mode, MCP, VS Code extensions, custom MCP servers |
| 3 | End-to-End Use Cases | Production-grade implementations with **team-level** business value |
| 4 | Programming Experience | Hands-on coding ability |
| 5 | Multi-Language Proficiency | Experience with 2+ programming languages |
| 6 | Polyglot Mindset | Flexibility to work across tech stacks |

---

## Evaluation Form Criteria (1-5 Stars)

| Criterion | Low (1) | High (5) |
|-----------|---------|----------|
| Presentation Clarity | Very unclear | Extremely clear |
| AI Tool Utilization | Not effective | Highly effective |
| Advanced Features Usage | Not demonstrated | Very well demonstrated |
| Optimization Using GenAI | Limited knowledge | Expert knowledge |
| Productivity Gains | Not much | Good productivity gain |

---

## Tips for Better Evaluations

1. **Ask technical questions** - Validate understanding of LLM params, MCP, agents
2. **Probe use case impact** - "Who uses this solution? How many people benefit?"
3. **Capture detailed transcripts** - More detail = better analysis
4. **Note specific examples** - Tools, projects, metrics mentioned
5. **Include demo context** - Describe what was shown
