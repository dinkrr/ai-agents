# ai-agents
AI Agents for Assessment Activities — Automating candidate evaluation workflows

---

## Agents

| Agent | Invoke | Purpose |
|-------|--------|---------|
| **AI Native Engineer Assessor** | `@ai-native-engineer-assessor` | Evaluate candidates for the **AI Native Engineer** role designation from a 1-hour presentation transcript |
| **Promotion Assessor** | `@promotion-assessor` | Generate structured **promotion feedback** (A2 / A3 / A4) from an assessment session transcript, using the skill matrix |

---

## When to Use Which Agent

```
Assessing for the AI Native Engineer role?
  └─ @ai-native-engineer-assessor

Assessing a candidate for level promotion (A2 / A3 / A4)?
  └─ @promotion-assessor
```

---

## Folder Structure

```
.github/agents/
  ai-native-engineer-assessor.md   # agent definition
  promotion-assessor.md            # agent definition

resources/
  assessments/
    skill_matrix.toon              # skill matrix — canonical source of truth

evaluations/
  ai-native-engineer-assessor/     # transcripts for AI Native Engineer assessments
  promotion-assessor/
    transcripts/
      *.txt                          # transcripts for promotion assessments
    feedback/
      *-Feedback.md                # generated promotion feedback
```
