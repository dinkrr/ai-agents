# MR Comment Templates

Plain markdown only. No emojis. One note per violation.

## Per-violation note

````markdown
## [Blocking | Should fix | Hygiene] {Principle}: {short title}

**File:** `{path}` ({method or lines})
**Rule:** {doc name} - {rule or section name}

**Issue**
{One to three sentences: what the code does today and why it breaks the rule.}

**Change required**
{Numbered steps, only if more than one change is needed.}

Before:
```{lang}
{current code}
```

After:
```{lang}
{exact replacement code}
```

**Why**
{One or two sentences on what this improves, and why behavior and tests are preserved.}
````

Rules:
- The heading must start with the severity in square brackets, then the principle.
- Principle values: SRP, OCP, LSP, ISP, DIP, TDA, LoD, ODS, Naming, Functions, Comments, DRY, YAGNI, Exceptions, Task rules, Hygiene.
- Show only the affected lines in Before/After. Keep surrounding context short.
- If the same violation occurs in several files, use one note and list every file and location.
- If a fix needs a related change elsewhere (for example a test rename), list it in "Change required".

## Re-review summary note

````markdown
## Re-review: {Mentee Name} - round {N}

**Build and tests:** {pass | fail}, {passed}/{total} on commit `{short sha}`

**Previously reported**
| # | Item | Status |
|---|------|--------|
| 1 | {title} | Resolved / Unresolved / Partially resolved |

**New findings**
{List each as a short title with a pointer to the separate note, or write "None".}

**Result**
{One sentence: blocking items remain, only non-blocking items remain, or no remaining violations.}
````

After the summary note, post a separate per-violation note for every Unresolved, Partially resolved or New item.

## Review round file (saved to evaluations/)

```markdown
# Mentee Code Review - {Mentee Name} - {Task Name} - Round {N}

- MR: {url}
- Commit reviewed: {sha}
- Mode: initial | re-review
- Scope: {all | list}
- Build and tests: {result}

## AI review triage
| # | AI comment | Verdict | Reason |

## Violations
| # | Severity | Principle | File | Title | Status | Posted note id |

## Notes
{Drafts for any note that was not posted.}
```
