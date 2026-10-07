---
name: evaluate-ai-native-java
description: Evaluates a Java AI Native Engineer Technical Interview 2 from its hands-on-task evidence and technical interview transcript. Applies the 30-point Java TI2 rubric and produces scenario verdict and hiring feedback. Use for Java TI2, Java hands-on, or Flight Tracker API assessment sessions.
compatibility: GitHub Copilot
---

# Java AI Native Engineer Technical Interview 2 Evaluator

Evaluate a Java AI Native Engineer candidate from a Technical Interview 2 (TI2) session. This is a separate assessment contract from the generic AI Native Engineer main assessment and pre-screening flows.

## Required Inputs

- Candidate name
- Technical interview transcript, including the hands-on walkthrough when available
- Hands-on evidence when available: repository/files, screen-share notes, test or API output, or an explicit statement that evidence was not captured

Do not infer missing hands-on behavior. State the missing evidence and reduce confidence rather than treating it as a failed demonstration.

## Assessment Scope

The hands-on task is a Java/Spring Boot Flight Tracker API developed through an AI-native feature-delivery workflow. Assess the following 30-point rubric:

| Area | Points | Evidence to assess |
|---|---:|---|
| Product/API implementation | 8 | Layered Spring Boot API; create/update, get, list, and delayed-flight behavior; validation, error handling, and runnable/explainable solution |
| GitHub Copilot / AI tool usage | 4 | Planning, generation, review, refinement, testing, and ability to explain generated code |
| Agents / skills / rules | 7 | Meaningful reusable assets, correct boundaries, defined roles, inputs/outputs, handoffs, and evaluation criteria |
| AI-native SDLC workflow | 4 | BA -> Developer -> Tester handoffs, human checkpoint, quality gate, and team-scale framing |
| MCP / enterprise integration thinking | 4 | MCP versus REST trade-offs, security, permissions, versioning, auditability, observability, and integrations |
| Communication and ownership | 3 | Clear decisions, trade-offs, known limitations, and ownership of the solution |

For every area, assign an integer score from zero through its maximum. Use only demonstrated evidence. If an area was not observed, score conservatively and mark it `Not observed`; do not invent a weakness.

## Interpretation

- `24-30`: Strong evidence; normally supports **Strong Hire** or **Hire**.
- `18-23`: Mixed but viable evidence; normally supports **Hire** or **Borderline** depending on critical gaps.
- `12-17`: Material evidence gaps or shallow delivery; normally supports **Borderline**.
- `0-11`: Insufficient delivery or critical AI-native understanding gaps; normally supports **No Hire**.

Do not apply these bands mechanically. A fundamental inability to explain generated code, absent product delivery, or unsafe enterprise-integration thinking may warrant a lower verdict despite the total.

## Output Format

```markdown
# Technical Interview 2 Feedback - [Candidate Name]

## Evidence Summary

- **Hands-on evidence reviewed:** [what was available, or `Not captured`]
- **Interview evidence reviewed:** [what was covered]
- **Evidence limitations:** [only limitations that affect confidence]

## 30-Minute Scenario Verdict

| Area | Score | Evidence |
|---|---:|---|
| Product/API delivery | [0-8] / 8 | ... |
| GitHub Copilot / AI tool usage | [0-4] / 4 | ... |
| Agents / skills / rules | [0-7] / 7 | ... |
| AI-native SDLC workflow | [0-4] / 4 | ... |
| MCP / enterprise integration thinking | [0-4] / 4 | ... |
| Communication and ownership | [0-3] / 3 | ... |
| **Total** | **[0-30] / 30** | |

**Product/API delivery:** [Strong / Adequate / Weak / Not observed]

**AI-native workflow:** [Strong / Adequate / Weak / Not observed]

**Agents/skills/rules understanding:** [Strong / Adequate / Weak / Not observed]

**MCP/integration thinking:** [Strong / Adequate / Weak / Not observed]

**GitHub Copilot usage:** [Strong / Adequate / Weak / Not observed]

## Strengths

- **[Area]:** [specific demonstrated evidence]

## Gaps and Follow-Ups

- **[Area]:** [observed gap or specific evidence to confirm]

## Verdict

**[Strong Hire / Hire / Borderline / No Hire]**

[Short rationale, including whether the candidate can contribute independently to an AI-native Java project or needs targeted enablement.]
```

## Quality Rules

1. Keep the Java TI2 rubric distinct from the generic ten-field AI Native Engineer form.
2. Distinguish observed gaps from topics that were not covered.
3. Flag a mismatch between claimed and demonstrated delivery without assuming intent.
4. Treat generated code as the candidate's responsibility only when they can explain and validate it.
5. For MCP and enterprise integrations, assess security, governance, and operational trade-offs, not tool name recognition alone.
6. Do not include personal data, secrets, or customer details beyond what is necessary for the assessment record.
