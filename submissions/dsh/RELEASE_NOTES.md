MindMux connector for DeepSeek Harness, using the shared MCP manager and OAuth account surface.

- Discover accessible Workspaces, Projects, and Cloud Brains and read or update knowledge through the production MindMux MCP server.
- DSH manages authorization, saved grants and refresh. Tools load on demand by default.
- Requires DSH 0.2.3-alpha.2 (compatible peers), Node ^24.22.3 or >=26.13.1, and a MindMux account with access to an active Plus/Team Workspace.

Install in the profile you actually run:

```sh
dsh plugin --profile web add -w https://github.com/mindmuxai/mindmux-plugin/releases/download/dsh-v1.0.1/mindmux-dsh-mindmux-1.0.1.tgz
```

Open Plugins → MindMux → Connect MindMux. Read packages/dsh/README.md for privacy, account requirements and sign-out instructions. This is a MindMux integration, not an official DeepSeek plugin. The release does not modify the existing Cursor or OpenAI plugin packages.
