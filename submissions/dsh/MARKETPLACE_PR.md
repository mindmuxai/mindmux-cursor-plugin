Adds one independently installable monorepo plugin entry in the `memory` category.

MindMux connects DSH to its hosted Cloud Brain MCP server. The package contributes a managed server, context-selection guidance and a Plugins-page OAuth account surface; DSH owns authorization and token refresh. It requires DSH 0.2.3-alpha.2-compatible peers and a MindMux account with access to an active Plus/Team Workspace.

- Source and user instructions: https://github.com/mindmuxai/mindmux-plugin/tree/main/packages/dsh
- Submission checklist and validation: https://github.com/mindmuxai/mindmux-plugin/blob/main/DSH_SUBMISSION.md
- Pinned prebuilt tarball: https://github.com/mindmuxai/mindmux-plugin/releases/download/dsh-v1.0.1/mindmux-dsh-mindmux-1.0.1.tgz
- Declares `dsh.bundle.patch`, official peer dependencies with explicit prerelease support, and a GitHub-hosted PNG icon.
- No generated READMEs or other plugins' entries are changed.

The package includes no install lifecycle scripts, local server, or custom token storage. Privacy, hosted-service requirements and disconnect behavior are documented in its README.
