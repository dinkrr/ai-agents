---
name: evaluate-ai-native-prescreening
description: Produces concise pre-screening readiness feedback for AI Native Engineer candidates from a screening call transcript. Use for pre-assessment/pre-screening sessions, not the full 1-hour main assessment. Checks whether the candidate is familiar with and can demonstrate the Level 1 baseline required before Level 2 nomination: creating agents, creating/using skills, creating/using rules, choosing between skills/rules/playbooks, shipping at least one feature end-to-end through agents, and building/operating a basic orchestrated BA-Developer-Tester feature workflow. Outputs Strengths, Gaps, and Verdict, covering all AI Native Engineering areas assessed in the call, including any areas beyond the examples listed in this skill.
---

# AI Native Engineer Pre-Screening Evaluator

Evaluate whether a candidate is ready to proceed to the main AI Native Engineer assessment based on a pre-screening call transcript.

The primary aim of these pre-screening calls is to confirm whether the candidate is familiar with and can demonstrate the **Level 1 baseline** that is mandatory before Level 2 nomination.

## Required Inputs

- Candidate name, preferably inferred from the transcript filename or transcript speaker metadata. If not inferable, ask for it.
- Full pre-screening transcript content.

## Assessment Approach

1. Read the full transcript and identify only the areas actually discussed in the call.
2. Assess readiness against the Level 1 baseline and readiness to proceed to the main assessment, not final role certification.
3. Keep feedback concise, bullet-based, and evidence-grounded.
4. Do not create star ratings, tables, or the main-assessment form link.
5. Focus on demonstrated understanding, practical ownership, and readiness to defend use cases in the main assessment.
6. If the transcript shows interviewer concern about reading from another screen, scripted answers, external prompting, or similar behavior, treat it as a major integrity concern and a strong reason not to advance.

## Level 1 Baseline to Check

A candidate should only be recommended forward if the transcript shows familiarity with, and preferably hands-on evidence of, these mandatory Level 1 items:

1. **Create agents** — can author an agent definition with role, instructions, inputs/outputs, evaluation criteria, and run it against a target.
2. **Create and use skills** — understands a skill file as long-lived, reusable knowledge distinct from a per-task agent; can write one; knows what skills are for instead of cramming everything into a prompt.
3. **Create and use rules** — can write scoped rules/project memory such as `AGENTS.md`, repository instructions, or Cursor rules, and knows where they apply.
4. **Know when to use which, and when not to** — can articulate the difference between a skill, a rule, and a playbook/runbook, and can choose the right one rather than defaulting to one tool.
5. **Shipped at least one feature end-to-end through agents during Level 1** — can describe a real feature/use case delivered using agents, including ownership and outcome.
6. **Build a basic feature-development workflow (mandatory)** — can compose or operate an orchestrated pipeline where a single instruction such as "develop this feature" triggers BA → Developer → Tester sub-agents, with skills and rules loaded dynamically.

Optional/advanced Level 1 topics that are **not mandatory for entry** but can strengthen feedback if discussed:

- Critic/evaluator loop
- Failure/recovery flow
- Human checkpoints
- Advanced telemetry, governance, or quality gates

## Areas to Cover When Assessed in the Call

Include relevant bullets under Strengths/Gaps for:

- Evidence against the Level 1 baseline items above
- AI Native Engineering understanding and mindset
- Practical AI-assisted SDLC use cases
- Team-level vs individual productivity impact
- AI tool exposure: GitHub Copilot, Cursor, Claude, ChatGPT, Gemini, etc.
- Prompts, custom instructions, rules, skills, commands, and agents
- Agentic workflows and end-to-end SDLC automation
- Orchestration and multi-agent/tool coordination
- MCP usage and MCP vs direct API decisioning
- Context management and context enrichment
- Model selection and model/cost trade-offs
- Token usage, cost optimization, and AI workflow efficiency
- Telemetry, debugging, tracing, and observability
- Productivity metrics and measurable impact
- Ownership depth, authenticity, and integrity concerns

This list is not exhaustive. If the transcript covers additional AI Native Engineering topics, include them in the feedback when they materially affect readiness.

## Output Format

Use exactly this structure:

```markdown
# [Candidate Name] — AI Native Engineer Pre-Screening Feedback

## Strengths

- **[Area]:** [Concise feedback based on transcript.]
- **[Area]:** [Concise feedback based on transcript.]

## Gaps

- **[Area]:** [Concise feedback based on transcript.]
- **[Area]:** [Concise feedback based on transcript.]

## Verdict

**[One of: Recommended for the main AI Native Engineer assessment. / Conditionally ready for the main AI Native Engineer assessment. / Not recommended for the main AI Native Engineer assessment.]**

[One short paragraph explaining the decision and what must happen next.]
```

## Verdict Guidance

- **Recommended**: Candidate clearly satisfies the Level 1 baseline, has concrete team-level AI-native use cases, clear ownership, good conceptual depth, and can likely defend decisions in Q&A.
- **Conditionally ready**: Candidate shows useful practical exposure and at least one credible use case, but has partial gaps in the Level 1 baseline and must prepare metrics, architecture, workflow explanation, and deeper answers before main assessment.
- **Not recommended**: Candidate does not satisfy key Level 1 baseline items, lacks conceptual clarity, lacks credible hands-on ownership, has weak use cases, cannot answer core topics, or has integrity/authenticity concerns.

If there is a credible integrity concern, state it plainly in Gaps and normally use **Not recommended** unless the concern is very minor and clearly resolved in the transcript.

## Save Location

The generated feedback should be saved as:

`evaluations/ai-native-engineer-assessment/feedback/{Candidate Name}-Pre-Screening-Feedback.md`
