---
name: save-output
description: Saves a generated assessment artifact (question set, promotion feedback, or AI native evaluation) to the correct evaluations/ subdirectory. Determines the save path from the artifact type and candidate name, writes the file, and confirms completion.
compatibility: GitHub Copilot
---

# Save Output

Saves a generated artifact to the appropriate location in the `evaluations/` directory.

## Required Inputs for This Skill

- Artifact type — one of: `questions`, `promotion-feedback`, `ai-native-evaluation`
- Candidate Name — full name (used in the filename)
- Target Title — A2 / A3 / A4 (required for `questions` type only)
- Content — the full Markdown content to save

## Save Paths

| Artifact Type | Save Path |
|---|---|
| `questions` | `evaluations/pre-assessment/{Candidate Name}-{Target Title}-Questions.md` |
| `promotion-feedback` | `evaluations/promotion-assessment/feedback/{Candidate Name}-Feedback.md` |
| `ai-native-evaluation` | `evaluations/ai-native-engineer-assessment/{Candidate Name}-Evaluation.md` |

## Steps

1. Determine the correct save path from the table above, substituting the candidate name and title.
2. Write the content to that file path. Create the file if it does not exist.
3. Confirm to the user: "Saved to `{path}`."
