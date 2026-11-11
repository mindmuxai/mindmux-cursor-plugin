---
name: mindmux-cloud-brain-get-started
description: Connect a MindMux account and use its Cloud Brains, Projects, and Workspaces safely through the MindMux MCP server.
---

# MindMux Cloud Brain

Use this skill when a user wants to connect, browse, read, or maintain their MindMux Cloud Brain.

## Connect

Ask the user to connect their MindMux account when the server is not authenticated. The OAuth page explains the requested read and write scopes. Do not ask for passwords, API keys, or tokens in chat.

## Start with the user's Workspace

1. Call `list_workspaces` when the user has not identified a Workspace.
2. Call `list_projects` for the Workspace the user selects. Do not infer a Project or Brain from a local folder, repository name, or a similar name.
3. Use `resolve_brain` with a known Brain ID, or ask the user to choose from the accessible list.
4. Before modifying a Brain, call `get_brain_guide`, then read the relevant Page and use its returned version where required.

## Permissions and safety

- Only use data returned by MindMux for the connected account.
- Confirm the intended Workspace and Project before `create_project` or any write operation.
- Prefer updating an existing relevant Page over creating duplicate Pages.
- Do not delete a Page unless the user explicitly asks to delete it. Prefer archiving when history should remain available.
- If a requested Workspace, Project, or Brain is not listed, state that it is unavailable rather than guessing or attempting to bypass access controls.

## When no Project is selected

The user can still list accessible Workspaces, Projects, and Brains. Ask them to select the correct Brain before reading or writing project content.
