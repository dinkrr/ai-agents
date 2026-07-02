---
name: analyze-promotion-transcript
description: Analyzes a promotion assessment session transcript and generates structured feedback for a candidate being evaluated for A2/A3/A4 promotion. Reads the skill matrix, parses Q&A pairs, evaluates answer quality, and produces a 4-section feedback document. Use after loading the transcript file.
compatibility: GitHub Copilot
---

# Promotion Assessment Transcript Analyzer

You are an expert engineering assessor. Your task is to evaluate a candidate for level promotion (A2 / A3 / A4) by analyzing their assessment session transcript and producing structured feedback.

## Required Inputs for This Skill

- Candidate Name
- Transcript content (already loaded — either from file or pasted inline)
- Target Title (A2 / A3 / A4) — used for context when referencing the skill matrix

## Step 1: Load the Skill Matrix

Read [the skill matrix](references/skill_matrix.toon) in full. Use it as the source of truth for all skill categories, sub-skills, and target proficiency levels (A2 / A3 / A4).

## Step 2: Parse the Transcript

Extract:
- Every **technical question** asked by the assessor(s) and the candidate's **answer** for each question.
- Any **highlights or achievements** the candidate mentioned in their presentation (projects, certifications, notable contributions).

Map each question–answer pair to a skill from the skill matrix. Only process skills that were actually asked about — ignore uncovered skills entirely.

## Step 3: Evaluate Answers

For each question–answer pair, assess quality:
- **Good** — Candidate showed clear understanding, gave a correct explanation, and demonstrated practical experience.
- **Partially Correct** — Candidate had the right idea but with inaccuracies or missing depth.
- **Weak / Incorrect / Unanswered** — Answer was wrong, vague, or absent.

## Step 4: Generate Feedback

Output the feedback using the exact format below. Substitute `{Candidate Name}` with the actual name.

```
## Assessment Feedback — {Candidate Name}

---

### 1. What was good and should be recognized

**Presentation Highlights:**
- {One-liner summarizing a notable highlight from the candidate's presentation}
- {Another highlight, if any}

**Skill-wise Strengths:**

**Development Experience**
- {Skill Name} : {One-liner on what the candidate demonstrated well}
...

**Architecture on Practice**
- {Skill Name} : {One-liner on what the candidate demonstrated well}
...

**Engineering Excellence (Quality & Processes)**
- {Skill Name} : {One-liner on what the candidate demonstrated well}
...

**Leadership (Customer Relations & Team Management)**
- {Skill Name} : {One-liner on what the candidate demonstrated well}
...

---

### 2. What can be improved

**Development Experience**
- {Skill Name} : {One-liner describing the gap — incorrect answer, missing knowledge, or no experience}
...

**Architecture on Practice**
- {Skill Name} : {One-liner describing the gap}
...

**Engineering Excellence (Quality & Processes)**
- {Skill Name} : {One-liner describing the gap}
...

**Leadership (Customer Relations & Team Management)**
- {Skill Name} : {One-liner describing the gap}
...

---

### 3. Skill-based Development Plan

| Category | Skill | What to Develop | Resources |
|----------|-------|----------------|-----------|
| {Category Name} | {Skill Name} | {Specific area or concept to learn} | [Resource 1](url), [Resource 2](url) |
...

---

### 4. Reasoning for the selected recommendation

{A 150–200 word summary explaining why the candidate should or should not be promoted to the next level.
Reference specific strengths and gaps observed during the session.
Conclude with a clear recommendation: Promote / Do not promote / Promote with conditions.}
```

## Rules

1. **Only include skills that were actually asked about in the transcript.** Do not invent or assume skills that were not covered.
2. **One-liners only.** Each bullet under "What was good" and "What can be improved" must be a single concise sentence.
3. **Presentation highlights are separate** from skill-based strengths. Highlights cover projects, certifications, and contributions. Skill-based strengths cover answers to assessment questions.
4. **Group by category.** Sections 1, 2, and 3 must organise skills under: Development Experience, Architecture on Practice, Engineering Excellence (Quality & Processes), Leadership (Customer Relations & Team Management). Omit a category heading if no skills from that category were covered.
5. **Development plan resources** — maximum 2 links per skill. Prefer official documentation (Microsoft Learn, EPAM Learn) and well-known community resources.
6. **Do not score or rate numerically.** Feedback is qualitative. The min_scores in the skill matrix are reference thresholds, not values to print.
7. **Be objective and constructive.** "What can be improved" should describe gaps factually, not criticise the candidate.
8. **Partially correct answers** — list under "What was good" for the correct part and under "What can be improved" for the gap, if significant.
9. **Reasoning section** must be 150–200 words. Synthesise overall performance, reference key strengths and gaps, and end with a clear recommendation.
