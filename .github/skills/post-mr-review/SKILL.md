---
name: post-mr-review
description: Posts approved review notes to a GitLab merge request on autocode.git.epam.com using the GitLab MCP server (preferred GitLab-MCP, fallback EPAMAutoCodeGit). Defines which MCP tools are allowed and forbidden, resolves the project id from the MR URL, and posts one plain-markdown note per violation without emojis. Use only after the user has approved the draft notes.
compatibility: GitHub Copilot
---

# Post MR Review

Posts already-approved notes to a GitLab MR.

## Required Inputs

- MR URL, or project id and MR iid
- Approved notes: a list of `{title, body}` (final text, already approved by the user)
- Optional: whether to post inline threads (only on explicit request)

## MCP server

Use the `GitLab-MCP` server. If its tools are unavailable, use `EPAMAutoCodeGit` (same tool names). Tell the user which server was used.

## Allowed tools

| Purpose | Tool |
|---|---|
| Resolve MR and project | `get_merge_request` |
| Read diff | `get_merge_request_diffs`, `get_merge_request_file_diff`, `list_merge_request_changed_files` |
| Read existing notes | `get_merge_request_notes`, `get_merge_request_note` |
| Post a note | `create_merge_request_note` |

Only on explicit user request:
- `create_merge_request_thread` (inline thread, needs diff SHAs and line positions from `get_merge_request_diffs`)
- `update_merge_request_note` and `delete_merge_request_note`, and only for notes this agent posted in this session

## Forbidden tools

Never call these, even if a call to an allowed tool fails:
- Anything for issues: `create_issue`, `create_issue_note`, `create_note`, `update_issue*`, `delete_issue*`
- Any `*emoji_reaction*` tool
- `approve_merge_request`, `unapprove_merge_request`, `merge_merge_request`, `update_merge_request`
- Any write to the repo: `create_or_update_file`, `push_files`, `create_branch`, `delete_branch`, `create_commit_status`

If posting fails, stop and report the error. Do not switch to a different kind of tool.

## Steps

1. **Resolve the MR.** Take the project and iid from the URL. Call `get_merge_request` to confirm the project id and iid. Never guess the id. Confirm the title and source branch match what the user expects.
2. **Skip duplicates.** Call `get_merge_request_notes` and skip any note whose heading is already posted with the same text.
3. **Post notes one by one** with `create_merge_request_note` (`project_id`, `merge_request_iid`, `body`):
   - Body is exactly the approved text.
   - Plain markdown. No emojis.
   - Heading format `## [Blocking|Should fix|Hygiene] {Principle}: {title}`.
   - One note per violation. Re-review summary notes go first.
4. **Report.** List each posted note: id, heading, and the MR URL. List any note that failed.

## Constraints

- Do not post anything the user has not approved.
- Do not edit approved text except to fix obvious formatting breakage, and then say so.
- Never print or echo tokens or credentials.
