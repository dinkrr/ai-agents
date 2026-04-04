# Session Notes — Assessment Automation Agent Build
> Last updated: 2026-04-03
> Status: Implementation complete. Ready for testing.

---

## What We Built

An assessor-side automation workflow for EPAM's promotion assessment process (A2/A3/A4, .NET discipline). Covers the two pre-session steps: Self Presentation review and question generation.

---

## Files Created This Session

### Agent Definitions — `.github/agents/`

| File | Invoke | Role |
|---|---|---|
| `assessment-orchestrator.md` | `@assessment-orchestrator` | ⭐ Entry point. Runs Phase 1 (PPT review), then presents two handoff buttons for human decision. |
| `self-presentation-reviewer.md` | `@self-presentation-reviewer` | Subagent. Evaluates the PPT across 4 categories, outputs APPROVE or SEND BACK. Can also be invoked standalone. |
| `pre-assessment-question-generator.md` | `@pre-assessment-question-generator` | Subagent. Generates structured question set by section/expert. Can also be invoked standalone. |

### Resource Files — `resources/assessments/`

| File | Purpose |
|---|---|
| `level-up-requirements-dotnet.md` | Converted from Excel. Skill groups, required proficiency levels (Core/Required/Optional) per title (A2/A3/A4). Read by both subagents. |
| `level-up-skill-proficiency-descriptions.md` | Per-skill bullet-point definitions of Novice/Intermediate/Advanced/Expert. Read by both subagents for depth evaluation. Separate file — SRP. |
| `pre-asmt-template-format.md` | Session timing structure (70–80 min), section breakdown, question volume targets, expert assignment patterns. Read by question generator. |
| `selfPPT.md` | Test file — Amir Ghanem's Self Presentation converted from `.pptx`. Target title: A4. Use this for first test run. |

### Conversion Script — `scripts/`

| File | Purpose |
|---|---|
| `scripts/convert-presentation.js` | Converts `.pptx` → `.md` using `officeparser`. Extracts text slide-by-slide with metadata header. |

**Usage:**
```bash
npm run convert-ppt -- <path-to-file.pptx>
# Output: same directory, .md extension
```

### `.gitignore` additions
```
resources/assessments/archived/   # Excel source files (content now in .md)
node_modules/
package-lock.json
.claude/settings.local.json
```

### Archived (not deleted)
```
resources/assessments/archived/
  Software_Engineers_.NET_04012026_Requirements.xlsx   # source for level-up-requirements-dotnet.md
  Pre-ASMT template - 2026 - Suraj Kentura.xlsx        # source for pre-asmt-template-format.md
```

---

## How the Orchestrator Works

```
User invokes @assessment-orchestrator
        │
        ▼
Collect inputs (candidate, title, PPT path, expert assignments)
        │
        ▼
Convert .pptx → .md if needed  (npm run convert-ppt)
        │
        ▼
Invoke @self-presentation-reviewer as subagent
  ├── Reads: level-up-requirements-dotnet.md
  ├── Reads: level-up-skill-proficiency-descriptions.md
  └── Returns: category table + gaps + APPROVE/SEND BACK decision
        │
        ▼
Present full review output to user
        │
        ▼
⛔ TWO HANDOFF BUTTONS APPEAR (human-in-the-loop)
  ├── ✅ "Approve — Generate Session Questions"
  │     → Transitions to @pre-assessment-question-generator
  │     → send: false  (user reviews pre-filled prompt, hits Send)
  │
  └── ❌ "Send Back to Candidate"
        → Transitions to @copilot
        → send: false  (user reviews draft email prompt, hits Send)
```

**If Approve is clicked → Question Generator runs:**
```
@pre-assessment-question-generator
  ├── Reads: level-up-requirements-dotnet.md
  ├── Reads: level-up-skill-proficiency-descriptions.md
  ├── Reads: pre-asmt-template-format.md
  ├── Reads: Self Presentation content (from conversation context)
  └── Generates: question set per section/expert
        │
        ▼
  Offers to save → evaluations/pre-assessment-question-generator/[Name]-[Title]-Questions.md
```

---

## Key Architectural Decisions

| Decision | Why |
|---|---|
| Two separate resource files (`level-up-requirements-dotnet.md` + `level-up-skill-proficiency-descriptions.md`) | SRP — summary table vs. depth definitions serve different purposes. Agents load both. |
| `handoffs` for human approval gate (not natural-language "reply PROCEED") | Renders as visual clickable buttons in Copilot UI — proper human-in-the-loop UX rather than text-based gate |
| `send: false` on both handoffs | User must manually hit Send after reviewing pre-filled prompt — explicit human confirmation |
| Phase 2 triggered via handoff (not as orchestrator subagent) | Conversation context (PPT content, gaps, expert assignments) is already visible — next agent can reference it via "above" |
| `agent: copilot` for Send Back handoff | No custom agent needed for drafting an email — default Copilot handles it using the Feedback section in context |
| `tools: [execute, read, agent]` on orchestrator | `agent` enables subagent invocation; `execute` enables running the conversion script; `read` enables reading files |
| Agents can be run standalone OR via orchestrator | `user-invocable` left at default (`true`) — both subagents work independently too |

---

## How to Test

### Quickest test (skip conversion — file already exists):
```
@assessment-orchestrator
Candidate: Amir Ghanem
Target title: A4
PPT: resources/assessments/selfPPT.md
Expert 1: Development Experience + Architecture on Practice
Expert 2: Engineering Excellence
Committee Head: Leadership + Warm-up
```

### Test with .pptx conversion:
```
@assessment-orchestrator
Candidate: Amir Ghanem
Target title: A4
PPT: resources/assessments/selfPPT.pptx
[same expert assignments]
```

### Test subagents standalone:
```
@self-presentation-reviewer
Candidate: Amir Ghanem, Target: A4, PPT: resources/assessments/selfPPT.md

@pre-assessment-question-generator
Candidate: Amir Ghanem, Target: A4, PPT: resources/assessments/selfPPT.md
Expert 1: Dev Experience + Architecture, Expert 2: EngX, Committee Head: Leadership
```

---

## Open Questions (from original plan — not yet addressed)

1. **Other disciplines** — current resource files are .NET only. If other disciplines need assessment (Java, Python, etc.), additional `level-up-requirements-{discipline}.md` and `level-up-skill-proficiency-descriptions-{discipline}.md` files would be needed, and the agents would need a discipline parameter.

2. **PPT format support** — `officeparser` handles `.pptx`. If candidates submit `.pdf` presentations, Claude Code's `Read` tool handles PDF natively, but Copilot's `read` tool may not. A `convert-pdf` script might be needed.

3. **Copilot `execute` tool support** — the `.pptx` → `.md` auto-conversion in the agents depends on `execute` working in Copilot's agent runtime. This was not explicitly confirmed in the docs. If it doesn't work, users should manually run `npm run convert-ppt` before invoking the agent and pass the `.md` path instead.

4. **Handoff conversation context** — the question generator receives context via "above" in the handoff prompt. Exact behaviour of context passing in handoffs is not fully documented. If the question generator lacks context, the handoff prompt may need to be made more explicit (user can edit it before hitting Send since `send: false`).

---

## What Was NOT Built (out of scope per plan)

- Candidate-side automation (eligibility check, artifact prep guidance)
- During-session note-taking
- Post-session feedback (covered by existing `@promotion-assessor`)
- Committee scheduling / calendar coordination
- Any API integration with Assessment Portal or Level Up
