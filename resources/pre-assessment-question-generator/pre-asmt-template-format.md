# Pre-ASMT Session Structure

> **Used by:** `@pre-assessment-question-generator`
> **Purpose:** Defines the timing structure and section ownership for the assessment session. The question generator uses this to ensure questions fit within time budgets and are correctly attributed to each expert.

---

## Session Overview

| | |
|---|---|
| **Total duration** | 70–80 minutes |
| **Participants** | Candidate · Representative (RM) · Committee Head · Expert 1 · Expert 2 |
| **Format** | Experience-based and knowledge-based questions only — **no coding exercises** |

---

## Section Breakdown

| # | Section | Duration | Default Owner | Notes |
|---|---|---|---|---|
| 1 | **Warm-up** | 20 min | Committee Head | 10 min self-presentation · 5 min introductions · 5 min warm-up questions |
| 2 | **Development Experience** | 15–17 min | Expert 1 (typical) | .NET, C#, ASP.NET, Algorithms, Async/Threading, SQL, NoSQL, ORM, MQ |
| 3 | **Architecture on Practice** | 15–17 min | Expert 1 or Expert 2 | API design, Software design, Architectural styles, Cloud |
| 4 | **Engineering Excellence — Quality** | 7–10 min | Expert 2 (typical) | Testing, code quality, CI/CD, Software Engineering Practices |
| 5 | **Engineering Excellence — Processes** | 5–7 min | Expert 2 (typical) | SDLC, Agile, Estimation, Software Engineering Processes |
| 6 | **Leadership** | 10–15 min | Committee Head | Mentoring, Customer relations, Teamwork, Communication, Conflict management |

---

## Warm-up Section Script (Committee Head)

**Minutes 0–10: Self-Presentation**
- Candidate presents their Self Presentation (PPT) without interruption
- Assessors take notes on claimed experience for follow-up questions

**Minutes 10–15: Introductions**
- Committee Head introduces assessors and explains session format
- Confirms candidate's current role and project context

**Minutes 15–20: Warm-up Questions**
- 2–3 light questions to ease the candidate in
- Typically: current project overview, tech stack, team size, candidate's role and responsibilities

---

## Question Mix Guidelines

| Question Type | Target Mix | Example Starters |
|---|---|---|
| Experience-based | ~65–70% | "Tell me about a time when...", "Walk me through how you...", "Describe a situation where...", "What tradeoffs did you consider when..." |
| Knowledge-based | ~30–35% | "How would you explain X?", "What's your understanding of Y?", "How do you typically approach Z?", "What are the pros and cons of...?" |

**No coding exercises.** All questions test real-world experience and conceptual knowledge.

---

## Expert Assignment Patterns

The Committee Head assigns topic areas to each expert before the session. Common patterns:

**Pattern A (most common):**
- Expert 1 → Development Experience + Architecture on Practice
- Expert 2 → Engineering Excellence (Quality + Processes)
- Committee Head → Warm-up + Leadership

**Pattern B:**
- Expert 1 → Development Experience
- Expert 2 → Architecture on Practice + Engineering Excellence
- Committee Head → Warm-up + Leadership

**Pattern C (3-expert panel):**
- Expert 1 → Development Experience
- Expert 2 → Architecture on Practice
- Expert 3 → Engineering Excellence
- Committee Head → Warm-up + Leadership

---

## Question Volume Guidelines

| Section | Time | Target Questions |
|---|---|---|
| Warm-up (warm-up Qs only) | 5 min | 2–3 questions |
| Development Experience | 15–17 min | 4–6 questions |
| Architecture on Practice | 15–17 min | 4–6 questions |
| Engineering Excellence — Quality | 7–10 min | 2–4 questions |
| Engineering Excellence — Processes | 5–7 min | 2–3 questions |
| Leadership | 10–15 min | 3–5 questions |

> Allow 2–3 minutes per question for the candidate to respond and for follow-up. Prioritize depth over breadth — fewer, deeper questions are better than rushing through a long list.

---

## Skill Coverage Priority

When generating questions, use this priority order within each section:

1. **Skills the candidate highlighted in their PPT** — probe the claimed experience deeper
2. **Core skills required for the target title** — always cover these
3. **Required skills the candidate did NOT mention in their PPT** — use knowledge questions
4. **Optional/recommended skills** — only if time allows

---

## Output Format for Question Generator

The question generator should produce output in this structure:

```
## Pre-ASMT Questions — [Candidate Name] → [Target Title]

---
### Warm-up — Committee Head — 20 min
[Self-presentation walkthrough instructions + 2-3 warm-up questions]

---
### Development Experience — [Expert Name] — 15–17 min
| Skill | Question | Type | Notes |
...

---
### Architecture on Practice — [Expert Name] — 15–17 min
| Skill | Question | Type | Notes |
...

---
### Engineering Excellence: Quality — [Expert Name] — 7–10 min
| Skill | Question | Type | Notes |
...

### Engineering Excellence: Processes — [Expert Name] — 5–7 min
| Skill | Question | Type | Notes |
...

---
### Leadership — [Expert Name] — 10–15 min
| Skill | Question | Type | Notes |
...

---
## Skills to Probe (Required for Title — Not Mentioned in PPT)
- [Skill]: [suggested question]
```
