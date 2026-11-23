# MindMux Plugins

Plugins and connectors that bring [MindMux Cloud Brain](https://mindmux.ai) to AI agents. This repository contains the platform-specific packages for Cursor, ChatGPT/Codex, and DeepSeek Harness (DSH).

## Choose your platform

| Platform | Package | Setup and submission materials |
| --- | --- | --- |
| Cursor | [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json), [`mcp.json`](mcp.json) | [Cursor setup](#cursor) |
| ChatGPT / Codex | [`openai-plugin/`](openai-plugin) | [OpenAI package and submission guide](OPENAI_SUBMISSION.md) |
| DeepSeek Harness | [`packages/dsh/`](packages/dsh) | [DSH installation guide](packages/dsh/README.md), [marketplace submission materials](DSH_SUBMISSION.md) |

Each package uses the same production MCP service, with its own host-specific manifest and packaging. No API key or separate local MCP server is required.

## Cloud Brain capabilities

With a MindMux account and access to an active Plus or Team Workspace, connected agents can:

- List accessible Workspaces, Projects, and Cloud Brains.
- Search, read, create, and update Brain pages and root pages.
- Create a Project and its attached Cloud Brain in a Workspace you explicitly select, subject to your permissions.

Agents must select the intended Workspace and Brain rather than infer a Brain from a repository or folder name. MindMux enforces account permissions, plan restrictions, and Brain format requirements on the server.

## Connection and authorization

All packages connect to the production Streamable HTTP endpoint:

```text
https://mcp.mindmux.ai/mcp
```

Use your host's connection controls to sign in to MindMux and authorize access. Use those controls again to disconnect or clear saved authorization. See each platform's guide for version requirements and account controls, or the [MindMux MCP setup guide](https://mindmux.ai/docs/getting-started/connect-cloud-brain-mcp) for manual setup.

## Cursor

The repository root contains the Cursor plugin manifest, MCP configuration, and brand assets. Install **MindMux Cloud Brain** from the Cursor Marketplace and complete the MindMux OAuth flow when connecting.

For local testing, copy this repository into `~/.cursor/plugins/local/mindmux`, restart Cursor (or run **Developer: Reload Window**), then open **Customize** and confirm the MindMux MCP server is available.

## Build packages

Build the OpenAI submission archive:

```sh
node scripts/build-openai-submission-zip.mjs
node scripts/verify-openai-submission-package.mjs
```

Build the DSH tarball using the Node version required by its [installation guide](packages/dsh/README.md):

```sh
cd packages/dsh
npm ci --ignore-scripts
npm test
cd ../..
node scripts/verify-dsh-package.mjs
```

Generated packages are written to `dist/`. Follow the platform's submission guide for publishing and marketplace requirements.

## Privacy and support

MindMux Cloud Brain is a hosted service. Review the [Privacy Policy](https://mindmux.ai/privacy) and [Terms of Service](https://mindmux.ai/terms) before connecting.

For setup help, see the [MindMux documentation](https://mindmux.ai/docs/getting-started/connect-cloud-brain-mcp). Report plugin issues in [this repository](https://github.com/mindmuxai/mindmux-plugin/issues), without credentials or authorization tokens.

Licensed under [Apache-2.0](LICENSE).
