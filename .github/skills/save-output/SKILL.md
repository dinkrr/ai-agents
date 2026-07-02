---
name: save-output
description: Saves a generated assessment artifact (question set, promotion feedback, AI native evaluation, or AI native pre-screening feedback) to the correct evaluations/ subdirectory. Determines the save path from the artifact type and candidate name, writes the file, and confirms completion.
compatibility: GitHub Copilot
---

# Save Output

Saves a generated artifact to the appropriate location in the `evaluations/` directory.

## Required Inputs for This Skill

- Artifact type — one of: `questions`, `promotion-feedback`, `ai-native-evaluation`, `ai-native-prescreening-feedback`
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

## Steps

1. Determine the correct save path from the table above, substituting the candidate name and title where required.
2. Create the parent directory if it does not exist.
3. Write the content to that file path. Create the file if it does not exist; overwrite it if the user is intentionally updating the artifact.
4. Confirm to the user: "Saved to `{path}`."
