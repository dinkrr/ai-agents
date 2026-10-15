---
name: clean-code-advance-review
description: Reviews a mentee's code changes against the bundled Clean Design principle docs (SRP, OCP, LSP, ISP, DIP, Tell Don't Ask, Law of Demeter, Object/Data Structure) and Clean Code docs (naming, functions, general principles) plus the task README rules. Triages a pasted AI review as valid or invalid, and re-reviews a mentee's fixes. Produces a violations-only list with exact before/after code per violation. Use when reviewing mentee MRs for EngX clean design or clean code tasks.
compatibility: GitHub Copilot
---

# Review Clean Design

Produces a violations-only review of mentee code, with the exact change to make for each violation.

## Required Inputs

- Task repo path (a local checkout of the mentee's work)
- Diff to review: changed files and hunks versus the target branch
- Scope: `all` (default) or a list of principles
- Optional: AI review text to triage
- Optional (re-review): earlier violations list, or the MR notes we posted before
- Optional: build and test result from the caller

## References (read before reviewing)

| File | Use |
|---|---|
| `references/review-rules.md` | Task rules, scope, severity, safe-fix checks, AI-review triage, known false positives |
| `references/comment-template.md` | Note layouts |
| `references/clean-design/*.md` | Clean Design principles: srp, ocp, lsp, isp, dip, tda, law-of-demeter, ods |
| `references/clean-code/*.md` | Clean Code: naming, functions, general-principles |

The task repo's own `docs/` folder holds the same material as `.txt` files (for example `docs/lsp.txt`, `docs/clean-code/naming.txt`). If a task `docs/` file differs from the bundled copy, prefer the task copy. Ignore empty files (some `ocp.txt` copies are empty).

## Steps

### 1. Load rules
Read the task `README.md` and extract the task rules. Read `review-rules.md`. Read the doc files that fall in the requested scope. Read the full text of each, not only the headings.

### 2. Understand the change
Read the diff, then read each changed file in full. Read the related tests. Compare before and after to see what behavior changed. Note any change to a test's Arrange or Assert.

### 3. Find violations
Check in this order:
1. **Task rules**: behavior preserved, tests' Arrange/Assert kept, ThirdParty untouched, version unchanged.
2. **Principles in scope**: SRP, OCP, LSP, ISP, DIP, TDA, LoD, ODS.
3. **Clean Code in scope**: naming, functions (size, one thing, one abstraction level, arguments), comments, DRY, YAGNI, exception handling, formatting.
4. **Hygiene**: unused usings, empty doc tags, whitespace, mismatched test names.

For each candidate, verify it against the code and cite the exact doc rule. Drop it if no rule backs it. Run the "false positives" list in `review-rules.md` before keeping any LSP, DIP or ISP finding.

### 4. Build each violation
For every violation record: severity, principle, doc rule, file and lines, issue, exact before/after code, why. Check that the fix is safe (section 5 of `review-rules.md`): tests stay green, behavior is unchanged, and no new violation is created.

### 5. Triage the AI review (only if provided)
For each AI comment, give a verdict (Valid / Partially valid / Invalid) with a one-line doc-based reason. Merge Valid and Partially valid points into the violation list, with the corrected principle.

### 6. Re-review mode
Given earlier violations or earlier notes:
1. For each earlier item, mark Resolved / Unresolved / Partially resolved by reading the current code, not the mentee's commit message.
2. Look for regressions and new violations introduced by the fixes.
3. Confirm that the fix did not break a task rule.
4. Produce: the status table, then per-violation notes for Unresolved, Partially resolved and New items only.

### 7. Output
Return, in this order:
1. Scope and build/test result (from the caller, or "not run").
2. AI review triage table (if any).
3. Violations summary table: `# | Severity | Principle | File | Title`.
4. The full draft note for each violation, using `comment-template.md`.
5. In re-review mode, the re-review summary note first.

If there are no violations, say so in one line and stop. Do not pad the output with positives.

## Constraints

- Violations only. No praise sections.
- Every violation cites a bundled doc rule.
- No emojis in drafts.
- Do not edit the mentee's code. Do not promise a score.
