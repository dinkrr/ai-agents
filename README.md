# ai-agents

AI Agents for Assessment Activities — automating candidate evaluation workflows.

---

## Agents

| Agent | Invoke | Purpose |
|-------|--------|---------|
| **AI Native Engineer Assessment** | `@ai-native-engineer-assessment` | Evaluate a **main assessment**, **pre-screening**, or **Java TI2 interview** using the matching skill. |
| **Promotion Assessment Feedback** | `@assessment-feedback-generator` | Generate structured **promotion feedback** (A2 / A3 / A4) from an assessment session transcript. |
| **Unified Assessment** | `@unified-assessment-agent` | Start the pre-assessment workflow: review the presentation, wait for the human approval gate, then generate session questions. |
| **EngX Reviewer Agent** | `@engx-reviewer-agent` | Review a mentee's MR for EngX Clean Design / Clean Code tasks against the course docs, triage the platform AI review, draft one exact-change comment per violation, post after approval, and re-review fixes. |

---

## When to Use Which Agent

```text
Assessing for the AI Native Engineer role?
  └─ @ai-native-engineer-assessment
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

     Java TI2 interview:
       → Uses evaluate-ai-native-java
       → Produces the Java hands-on 30-point assessment and hiring feedback
       → Reads from:
         inputs/transcripts/ai-native-java-engineer-assessment/{Candidate Name}/{filename}
       → Saves to:
         evaluations/ai-native-engineer-assessment/java/{Candidate Name}-Technical-Interview-2-Feedback.md

Assessing a candidate for level promotion (A2 / A3 / A4)?

  Pre-session (Steps 1 + 2 automated with human gate):
    └─ @unified-assessment-agent
       Provide candidate name + target title + PPT + expert assignments
       → Runs Self Presentation Review, waits for your PROCEED/SEND BACK,
          then generates the session question set

  Or run each step individually:
    Or invoke the `review-self-presentation` and `generate-questions` skills directly.

  Step 3 — After the session, write feedback:
    └─ @assessment-feedback-generator
       Provide the session transcript
       → Structured promotion feedback with recommendation

Mentee stuck on an EngX Clean Design / Clean Code task MR?
  └─ @engx-reviewer-agent
     Provide:
       - Mentee name
       - Local task repo path (under EngX Reviewer)
       - MR URL on autocode.git.epam.com
       - Mode: initial or re-review
       - Optional: the platform AI review comments
       - Optional: narrowed scope (default is all principles + Clean Code)

     → Reads the task README rules, fetches the MR head into a temporary worktree,
       runs build and tests (read-only)
     → Reviews with clean-code-advance-review (violations only, doc-backed, exact before/after code)
     → Triages the AI review comments as Valid / Partially valid / Invalid
     → Shows draft notes (one per violation) and waits for your approval
     → Posts approved notes with post-mr-review (GitLab-MCP, fallback EPAMAutoCodeGit)
     → Saves to:
       evaluations/mentee-code-review/{Mentee Name}/{Task Name}-review-{N}.md
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
    engx-reviewer-agent.agent.md                # EngX mentee MR review, AI review triage, approval-gated posting

  skills/
    evaluate-ai-native/
      SKILL.md                                  # main AI Native Engineer assessment evaluator
    evaluate-ai-native-prescreening/
      SKILL.md                                  # AI Native pre-screening readiness feedback
    evaluate-ai-native-java/
      SKILL.md                                  # Java TI2 hands-on and technical evaluator
      references/
        flight-tracker-task.md
        technical-interview-guide.md
    save-output/
      SKILL.md                                  # saves generated outputs to evaluations/
    clean-code-advance-review/
      SKILL.md                                  # violations-only review against docs + AI review triage
      references/
        review-rules.md                         # task rules, severity, known AI false positives
        comment-template.md                     # MR note and review round templates
        clean-design/                           # srp, ocp, lsp, isp, dip, tda, law-of-demeter, ods (.md)
        clean-code/                             # naming, functions, general-principles (.md)
    post-mr-review/
      SKILL.md                                  # allowed/forbidden GitLab MCP tools, posting rules
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
    ai-native-java-engineer-assessment/
      {Candidate Name}/                          # Java AI Native Engineer TI2 transcripts and notes
        *.txt

evaluations/
  ai-native-engineer-assessment/
    {Candidate Name}-Evaluation.md              # generated AI Native main assessment output
    feedback/
      {Candidate Name}-Pre-Screening-Feedback.md
    java/
      {Candidate Name}-Technical-Interview-2-Feedback.md

  promotion-assessment/
    feedback/
      {Candidate Name}-Feedback.md

  pre-assessment/
    {Candidate Name}-{Target Title}-Questions.md

  mentee-code-review/
    {Mentee Name}/
      {Task Name}-review-{N}.md                 # one file per review round
```

