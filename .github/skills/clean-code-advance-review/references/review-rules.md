# Review Rules for EngX Clean Design / Clean Code Tasks

These rules apply to every review. They were distilled from past mentee MR reviews.

## 1. Task rules come first (from the task README)

Read the task `README.md` before reviewing code. Breaching any of these is **Blocking**, even if the principle fix itself is correct:

- **Behavior must be preserved.** Return values, exceptions thrown, and side effects stay the same. Example: replacing `Dictionary.Add` with the indexer changes a duplicate from `ArgumentException` to overwrite. Example: turning a silent no-op into a thrown exception.
- **Unit tests:** Arrange and Assert of existing tests must be kept. Tests may be edited only to fit a new API (renamed type or method, new constructor). Replacing a test scenario with a different one is a violation.
- **Do not modify `ThirdParty/` files.**
- **Do not change the framework or language version** (`.csproj`, `pom.xml`, `package.json` engines, etc.).
- **Do not refactor the tests** beyond API compatibility.
- Any extra rule in the specific README applies as well.

## 2. Scope

- Default scope is all principle docs plus all clean-code docs.
- If the user narrows the scope (for example "only SRP, OCP, TDA, ODS"), report **only** those principles. Everything else is out of scope. Task rules (section 1) are always in scope.
- Review only code that the MR changes or that the change affects. Do not flag untouched legacy code unless the MR made it worse.

## 3. Violations only

- Report violations only. No praise, no "looks good" sections, no "no violation found" lists.
- Exception: the re-review summary may list previously reported items as resolved.
- Every violation must have: principle and doc rule, file and lines, why it is a violation, and the exact before/after code.
- A violation must be backed by a specific rule in a bundled doc. If you cannot cite one, do not report it. Speculative points are dropped.

## 4. Severity

| Severity | Use for |
|---|---|
| **Blocking** | README task-rule breach (behavior, tests, ThirdParty, version); clear violation of a principle the task is about; build or tests failing |
| **Should fix** | Doc-backed design issue (TDA, ODS, SRP, OCP, DIP, ISP, LoD, DRY, YAGNI) that does not break behavior |
| **Hygiene** | Unused usings or imports, empty or malformed doc comments, trailing whitespace, naming nits, test name that no longer matches its assertion |

## 5. Suggested fixes must be safe

Before proposing a change, check that it:
- keeps all existing tests green and keeps the tested behavior,
- does not break a README rule (section 1),
- does not introduce a violation of another principle. For example, moving logic to fix TDA must not create a God class (SRP).

Keep the fix as small as possible. Do not ask for large refactors beyond the task's scope.

## 6. AI review triage

The platform's AI review is not authoritative. For each AI comment, give a verdict:

- **Valid**: backed by a doc rule and present in the code. Merge it into our violation list.
- **Partially valid**: a real issue, but the AI states the wrong principle or reasoning. Correct it.
- **Invalid**: no doc backing, contradicts itself, or misreads the code. Give the reason.

Also ignore AI scores and score formulas (for example "100 - 3 x 15"). Never promise the mentee a score.

### Known false positives (check these before accepting an AI comment)

- **LSP: "sibling subtypes are not interchangeable."** LSP requires substituting a subtype where the *base* type is expected. It does not require two siblings (`GenericUser` and `PowerUser`) to replace each other. Different capabilities across siblings is not a violation.
- **LSP: "documented exception is undeclared."** If the base contract documents the exception, a subtype throwing it is within the contract.
- **LSP: "a method accepts the concrete subtype, so it breaks LSP."** A method declared for a specific subtype is a design choice. Widening it to the base type can allow illegal operations.
- **LSP: "missing documentation of return value is a violation."** This is a documentation gap, not broken substitutability.
- **DIP: "a static in-memory store violates DIP"** or "a data class depends on a concrete type" without a high-level module depending on a low-level one. Flag DIP only when a high-level policy class news up or depends on a concrete low-level detail that should be an abstraction.
- **ISP: "interface is large"** without a client that is forced to implement unused members.
- **SRP: "class has several methods."** SRP is about reasons to change, not method count.
- **Score or percentage deductions** with no cited rule.

### Real issues that AI reviews usually miss

- README breaches (behavior or test changes) caused by the mentee's refactor.
- Tell, Don't Ask / Object-Data anti-symmetry: a collaborator asks an object for its state and then makes the decision itself.
- Test names that no longer describe the assertion after a rename.

## 7. Comment style

- Plain markdown. **No emojis.**
- Address the mentee directly and politely. Say what to change, where, and why.
- Always include the exact code to change, as before and after snippets in fenced blocks.
- One MR note per violation (see `comment-template.md`).
