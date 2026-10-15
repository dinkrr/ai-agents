---
name: save-output
description: Saves a generated assessment artifact (question set, promotion feedback, AI Native evaluation, pre-screening feedback, Java TI2 feedback, or mentee code review round) to the correct evaluations/ subdirectory. Determines the save path from the artifact type and candidate name, writes the file, and confirms completion.
compatibility: GitHub Copilot
---

# Save Output

Saves a generated artifact to the appropriate location in the `evaluations/` directory.

## Required Inputs for This Skill

- Artifact type — one of: `questions`, `promotion-feedback`, `ai-native-evaluation`, `ai-native-prescreening-feedback`, `ai-native-java-feedback`, `mentee-code-review`
- Candidate Name — full name (used in the filename; the mentee name for `mentee-code-review`)
- Target Title — A2 / A3 / A4 (required for `questions` type only)
- Task Name — required for `mentee-code-review` only (for example `liskov-substitution-principle-csharp`)
- Content — the full Markdown content to save

## Save Paths

| Artifact Type | Save Path |
|---|---|
| `questions` | `evaluations/pre-assessment/{Candidate Name}-{Target Title}-Questions.md` |
| `promotion-feedback` | `evaluations/promotion-assessment/feedback/{Candidate Name}-Feedback.md` |
| `ai-native-evaluation` | `evaluations/ai-native-engineer-assessment/{Candidate Name}-Evaluation.md` |
| `ai-native-prescreening-feedback` | `evaluations/ai-native-engineer-assessment/feedback/{Candidate Name}-Pre-Screening-Feedback.md` |
| `ai-native-java-feedback` | `evaluations/ai-native-engineer-assessment/java/{Candidate Name}-Technical-Interview-2-Feedback.md` |
| `mentee-code-review` | `evaluations/mentee-code-review/{Candidate Name}/{Task Name}-review-{N}.md` |
## Steps

1. Determine the correct save path from the table above, substituting the candidate name and title where required. For `mentee-code-review`, set `{N}` to one more than the highest existing `{Task Name}-review-{N}.md` in that mentee folder (start at 1). Each round is a new file, so never ask to overwrite.
2. Create the parent directory if it does not exist.
3. Write the content to that file path. Create the file if it does not exist. If it exists, confirm that the user intends to overwrite it before replacing its content.
4. Confirm to the user: "Saved to `{path}`."
