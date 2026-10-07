---
name: save-output
description: Saves a generated assessment artifact (question set, promotion feedback, AI Native evaluation, pre-screening feedback, or Java TI2 feedback) to the correct evaluations/ subdirectory. Determines the save path from the artifact type and candidate name, writes the file, and confirms completion.
compatibility: GitHub Copilot
---

# Save Output

Saves a generated artifact to the appropriate location in the `evaluations/` directory.

## Required Inputs for This Skill

- Artifact type — one of: `questions`, `promotion-feedback`, `ai-native-evaluation`, `ai-native-prescreening-feedback`, `ai-native-java-feedback`
- Candidate Name — full name (used in the filename)
- Target Title — A2 / A3 / A4 (required for `questions` type only)
- Content — the full Markdown content to save

## Save Paths

| Artifact Type | Save Path |
|---|---|
| `questions` | `evaluations/pre-assessment/{Candidate Name}-{Target Title}-Questions.md` |
| `promotion-feedback` | `evaluations/promotion-assessment/feedback/{Candidate Name}-Feedback.md` |
| `ai-native-evaluation` | `evaluations/ai-native-engineer-assessment/{Candidate Name}-Evaluation.md` |
| `ai-native-prescreening-feedback` | `evaluations/ai-native-engineer-assessment/feedback/{Candidate Name}-Pre-Screening-Feedback.md` |
| `ai-native-java-feedback` | `evaluations/ai-native-engineer-assessment/java/{Candidate Name}-Technical-Interview-2-Feedback.md` |

## Steps

1. Determine the correct save path from the table above, substituting the candidate name and title where required.
2. Create the parent directory if it does not exist.
3. Write the content to that file path. Create the file if it does not exist. If it exists, confirm that the user intends to overwrite it before replacing its content.
4. Confirm to the user: "Saved to `{path}`."
