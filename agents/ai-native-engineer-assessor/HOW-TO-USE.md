# How to Use: AI Native Engineer Assessor Agent

## Quick Start

### Step 1: Prepare the Session Transcript
After your 1-hour assessment session with the candidate, gather the transcript. This should include:
- Candidate's presentation content
- Your questions and their responses
- Any demonstrations or examples discussed

### Step 2: Use the Agent
Copy the system prompt from `prompts/system-prompt.md` and use it with your AI assistant (Claude, ChatGPT, etc.). Then provide the transcript.

**Example prompt to the AI:**
```
[Paste the system prompt first]

---

Here is the session transcript for evaluation:

[Paste the transcript here]

Please evaluate this candidate for the AI Native Engineer role.
```

### Step 3: Review the Output
The agent will provide:
1. ✅ Eligibility check against all 6 criteria
2. ⭐ Star ratings (1-5) for each evaluation dimension
3. 📋 Final recommendation (Yes / No / Yes with improvements)
4. 💬 Detailed comments and suggestions

### Step 4: Fill the Evaluation Form
Use the agent's output to fill the Microsoft Form:
- Form Link: https://forms.microsoft.com/pages/responsepage.aspx?id=0HIbtJ9OJkyKaflJ82fJHRcVgeLO-gxCqGvQNI-dLzhUMjhSTERWSEE3RVFCSkE5RTI5RTcyUDNFTy4u&route=shorturl

---

## What the Agent Evaluates

### Eligibility Criteria (Must Have)
| Criterion | What It Means |
|-----------|---------------|
| Active AI Tool Usage | Using Copilot, Windsurf, Claude Code, Cursor in real projects |
| Advanced GenAI Capabilities | Agent Mode, MCP, VS Code extensions, custom MCP servers |
| End-to-End Use Cases | Production-grade implementations with business value |
| Programming Experience | Hands-on coding ability |
| Multi-Language Proficiency | Experience with 2+ programming languages |
| Polyglot Mindset | Flexibility to work across tech stacks |

### Form Rating Criteria (1-5 Stars)
| Criterion | Low (1) | High (5) |
|-----------|---------|----------|
| Presentation Clarity | Very unclear | Extremely clear |
| AI Tool Utilization | Not effective | Highly effective |
| Advanced Features Usage | Not demonstrated | Very well demonstrated |
| Optimization Using GenAI | Limited knowledge | Expert knowledge |
| Productivity Gains | Not much | Good productivity gain |

---

## Tips for Better Evaluations

1. **Capture detailed transcripts** - The more detail, the better the analysis
2. **Note specific examples** - When candidates mention tools or projects, capture specifics
3. **Record Q&A** - Your questions and their responses reveal depth of knowledge
4. **Include context** - If the candidate showed demos, describe what was shown

---

## Example Usage in VS Code Copilot Chat

You can use this agent directly in VS Code by:

1. Open the system prompt file
2. Start a new Copilot Chat session
3. Paste: "Use the following as your system instructions:" + the system prompt
4. Then paste the transcript and ask for evaluation
