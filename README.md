# ai-agents
AI Agents for Assessment Activities — Automating candidate evaluation workflows

---

## Agents

| Agent | Invoke | Purpose |
|-------|--------|---------|
| **AI Native Engineer Assessor** | `@ai-native-engineer-assessor` | Evaluate candidates for the **AI Native Engineer** role designation from a 1-hour presentation transcript |
| **Promotion Assessor** | `@promotion-assessor` | Generate structured **promotion feedback** (A2 / A3 / A4) from an assessment session transcript, using the skill matrix |
| **Assessment Orchestrator** | `@assessment-orchestrator` | ⭐ **Start here for the pre-assessment workflow** — runs the full review → approval → question generation pipeline with a human-in-the-loop gate |
| **Self Presentation Reviewer** | `@self-presentation-reviewer` | Review a candidate's **Self Presentation** before the session — approves it or sends it back with specific feedback *(also invoked by the orchestrator)* |
| **Pre-Assessment Question Generator** | `@pre-assessment-question-generator` | Generate a structured **question set** for the assessment session, organized by expert and section *(also invoked by the orchestrator)* |

---

## When to Use Which Agent

```
Assessing for the AI Native Engineer role?
  └─ @ai-native-engineer-assessor

Assessing a candidate for level promotion (A2 / A3 / A4)?

  Pre-session (Steps 1 + 2 automated with human gate):
    └─ @assessment-orchestrator
       Provide candidate name + target title + PPT + expert assignments
       → Runs Self Presentation Review, waits for your PROCEED/SEND BACK,
          then generates the session question set

  Or run each step individually:
    Step 1 — @self-presentation-reviewer   (PPT review only)
    Step 2 — @pre-assessment-question-generator  (questions only)

  Step 3 — After the session, write feedback:
    └─ @promotion-assessor
       Provide the session transcript
       → Structured promotion feedback with recommendation
```

---

## Folder Structure

```
.github/agents/
  ai-native-engineer-assessor.md          # agent definition
  promotion-assessor.md                   # agent definition
  assessment-orchestrator.md              # orchestrator — entry point for pre-assessment workflow (NEW)
  self-presentation-reviewer.md           # subagent — PPT review (NEW)
  pre-assessment-question-generator.md    # subagent — question generation (NEW)

resources/
  assessment-orchestrator/
    level-up-requirements-dotnet.md             # skill groups + proficiency levels per title — shared by subagents
    level-up-skill-proficiency-descriptions.md  # per-skill definitions of Novice/Intermediate/Advanced/Expert — shared by subagents
  pre-assessment-question-generator/
    pre-asmt-template-format.md                 # session timing structure — used by question generator only
  promotion-assessor/
    skill_matrix.toon                           # skill matrix — used by promotion-assessor only
  archived/                                     # gitignored — original source files (xlsx, pptx)

scripts/
  assessment-orchestrator/
    convert-presentation.js                     # converts .pptx → .md for agent input (run via npm run convert-ppt)

evaluations/
  ai-native-engineer-assessor/            # transcripts for AI Native Engineer assessments
  promotion-assessor/
    transcripts/
      *.txt                               # transcripts for promotion assessments
    feedback/
      *-Feedback.md                       # generated promotion feedback
  pre-assessment-question-generator/      # generated question sets (NEW)
    *-Questions.md
```
