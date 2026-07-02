# ai-agents

AI Agents for Assessment Activities — automating candidate evaluation workflows.

---

## Agents

| Agent | Invoke | Purpose |
|-------|--------|---------|
| **AI Native Engineer Assessment / Pre-Screening Agent** | `@ai-native-engineer-assessor` | Evaluate AI Native Engineer candidates from either a **main assessment** transcript or a **pre-screening** transcript. Routes to the correct skill based on session type. |
| **Promotion Assessor** | `@promotion-assessor` | Generate structured **promotion feedback** (A2 / A3 / A4) from an assessment session transcript, using the skill matrix. |
| **Assessment Orchestrator** | `@assessment-orchestrator` | ⭐ **Start here for the pre-assessment workflow** — runs the full review → approval → question generation pipeline with a human-in-the-loop gate. |
| **Self Presentation Reviewer** | `@self-presentation-reviewer` | Review a candidate's **Self Presentation** before the session — approves it or sends it back with specific feedback *(also invoked by the orchestrator)*. |
| **Pre-Assessment Question Generator** | `@pre-assessment-question-generator` | Generate a structured **question set** for the assessment session, organized by expert and section *(also invoked by the orchestrator)*. |

---

## When to Use Which Agent

```text
Assessing for the AI Native Engineer role?
  └─ @ai-native-engineer-assessor
     Provide:
       - Candidate name
       - Transcript file or pasted transcript
       - Session type:
           1. main assessment
           2. pre-screening

     Main assessment:
       → Uses evaluate-ai-native
       → Produces eligibility check, use case assessment, Q&A validation,
         productivity metrics, ratings, final recommendation, and form link
       → Saves to:
         evaluations/ai-native-engineer-assessment/{Candidate Name}-Evaluation.md

     Pre-screening:
       → Uses evaluate-ai-native-prescreening
       → Checks Level 1 baseline readiness before main assessment nomination
       → Produces concise Strengths, Gaps, and Verdict feedback
       → Saves to:
         evaluations/ai-native-engineer-assessment/feedback/{Candidate Name}-Pre-Screening-Feedback.md

Assessing a candidate for level promotion (A2 / A3 / A4)?

  Pre-session (Steps 1 + 2 automated with human gate):
    └─ @assessment-orchestrator
       Provide candidate name + target title + PPT + expert assignments
       → Runs Self Presentation Review, waits for your PROCEED/SEND BACK,
          then generates the session question set

  Or run each step individually:
    Step 1 — @self-presentation-reviewer
      → PPT review only

    Step 2 — @pre-assessment-question-generator
      → Questions only

  Step 3 — After the session, write feedback:
    └─ @promotion-assessor
       Provide the session transcript
       → Structured promotion feedback with recommendation
```

---

## AI Native Engineer Pre-Screening Scope

The AI Native pre-screening flow is intended to check whether a candidate is familiar with the **Level 1 baseline** required before they are nominated for the main AI Native Engineer assessment / Level 2 path.

The mandatory Level 1 baseline includes:

- **Create agents** — author an agent definition with role, instructions, inputs/outputs, evaluation criteria, and run it against a target.
- **Create and use skills** — understand skills as long-lived reusable knowledge, distinct from per-task agents or prompts.
- **Create and use rules** — write scoped rules / project memory such as `AGENTS.md`, repository instructions, or Cursor rules.
- **Know when to use which** — explain the difference between a skill, rule, and playbook/runbook, and choose the right one rather than defaulting to one tool.
- **Ship at least one feature end-to-end through agents** during Level 1.
- **Build or operate a basic feature-development workflow** where one instruction such as “develop this feature” triggers BA → Developer → Tester sub-agents, with skills and rules loaded dynamically.

The pre-screening feedback is not limited to the above list. If the call covers other AI Native Engineering areas — for example MCP/API decisioning, orchestration, model selection, context management, cost/token optimization, telemetry/debugging, productivity metrics, or integrity concerns — those should also be included when they affect readiness.

---

## Folder Structure

```text
.github/
  agents/
    ai-native-engineer-assessment.agent.md      # routes AI Native main assessment vs pre-screening
    assessment-feedback-generator.agent.md      # promotion feedback generator
    unified-assessment-agent.md                 # orchestrator entry point for pre-assessment workflow

  skills/
    evaluate-ai-native/
      SKILL.md                                  # main AI Native Engineer assessment evaluator
    evaluate-ai-native-prescreening/
      SKILL.md                                  # AI Native pre-screening readiness feedback
    save-output/
      SKILL.md                                  # saves generated outputs to evaluations/
    analyze-promotion-transcript/
      SKILL.md
      references/
        skill_matrix.toon
    review-self-presentation/
      SKILL.md
      references/
      scripts/
    generate-questions/
      SKILL.md
      references/

inputs/
  transcripts/
    ai-native-engineer-assessment/
      *.txt                                     # AI Native main assessment or pre-screening transcripts

evaluations/
  ai-native-engineer-assessment/
    {Candidate Name}-Evaluation.md              # generated AI Native main assessment output
    feedback/
      {Candidate Name}-Pre-Screening-Feedback.md

  promotion-assessment/
    feedback/
      {Candidate Name}-Feedback.md

  pre-assessment/
    {Candidate Name}-{Target Title}-Questions.md
```

