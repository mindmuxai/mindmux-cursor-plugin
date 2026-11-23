# MindMux for DeepSeek Harness

Connect [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) to [MindMux Cloud Brain](https://mindmux.ai) using its shared MCP manager and browser OAuth. Discover accessible Workspaces, Projects, and Brains, then read or update knowledge from conversations.

## Requirements

- **DSH 0.2.3-alpha.2**, with the matching official MCP manager and system prompt packages. The default npm `latest` (0.2.2-rc.5 at preparation time) does not provide this connector's account UI. Use `@deepseek-ai/dsh@0.2.3-alpha.2`; later versions must satisfy the package's peer dependencies.
- Node.js **^24.22.3 or >=26.13.1**, matching that DSH release.
- A MindMux account with access to an active Plus or Team Workspace and the appropriate Brain permissions. The plugin is free; the hosted service has [paid plans](https://mindmux.ai/pricing).
- Local DSH Web/Desktop with its browser OAuth callback reachable on a loopback address. Headless hosts can load the plugin but do not have a Plugins page account surface.

## Install and connect

Install the `dsh-v1.0.1` release:

```sh
dsh plugin --profile web add -w https://github.com/mindmuxai/mindmux-plugin/releases/download/dsh-v1.0.1/mindmux-dsh-mindmux-1.0.1.tgz
dsh --profile web
```

Use the same profile for installation and startup. For Desktop, use its Plugins page or the profile managed by your Desktop installation. Do not install a second manually configured MCP server called `mindmux` alongside this plugin.

1. Open **Plugins → MindMux** and select **Connect MindMux**.
2. Sign in on `mindmux.ai`, review the Brain read/write permissions, and authorize. Return to DSH after the callback completes.
3. Ask: “List my MindMux Workspaces and Projects.” Choose a Workspace and Brain explicitly before requesting changes.

Tools load **on demand** by default. The host's MCP tool loader discovers the server-qualified `mcp__mindmux__*` tools; the absence of eagerly listed tools alone does not mean authentication failed. The plugin also supports `toolLoading: eager` in its Cordis entry configuration.

### Local package verification (before release)

```sh
cd packages/dsh
npm ci --ignore-scripts
npm test
npm pack --pack-destination /tmp
dsh plugin --profile web add -w /tmp/mindmux-dsh-mindmux-1.0.1.tgz
```

No build or install lifecycle script is required. Source installation from a monorepo Git URL is not required; use the prebuilt tarball.

## Authorization and data

The only server is `https://mcp.mindmux.ai/mcp`. The endpoint is fixed; there is no API-key configuration. DSH owns dynamic client registration, PKCE, saved OAuth grants, refresh, reconnect, and sign-out. The stable credential key is `mcp-client/mindmux`. This package does not read or persist tokens, upload local files, scan repositories, or run a local server. Agent tool calls send the requested content to the hosted MindMux service and obey its access, plan, and format validation rules.

Use **Sign out** on the plugin account page to remove the authorization saved by this DSH host. Disabling or removing the plugin stops its connection and prompt contributions but does not itself revoke server grants or sign you out of the MindMux website.

For a remotely hosted DSH instance, the callback origin may be non-loopback. MindMux rejects unapproved callbacks: the operator must verify the exact HTTPS callback and configure its allowlist; this plugin does not weaken that policy. Never share token stores or authorization URLs containing codes.

See [Privacy](https://mindmux.ai/privacy), [Terms](https://mindmux.ai/terms), and the [MCP guide](https://mindmux.ai/docs/getting-started/connect-cloud-brain-mcp). Report plugin problems at [GitHub Issues](https://github.com/mindmuxai/mindmux-plugin/issues), including DSH version and profile, without credentials.

## 中文说明

此插件通过 DSH 官方 MCP 管理器连接 MindMux 云端知识库，不需要 API key 或本地服务。需要 DSH **0.2.3-alpha.2**、相应 Node 版本，以及可访问 Plus／Team Workspace 的 MindMux 账号。安装到实际启动的同一个 profile，在 Plugins 的 MindMux 页面点击连接并完成网页授权。

默认按需加载工具，首次使用时由 DSH 发现工具。可以列出 Workspace、Project、Brain，并按权限读写知识。修改前明确选择目标，插件不会根据本地目录猜测 Brain。OAuth token 的保存、刷新和退出由 DSH 负责。移除插件不等于撤销授权；请使用账号页的退出操作。云端部署 DSH 的 HTTPS 回调需要单独审核并加入 MindMux 白名单。

Licensed under Apache-2.0. This is a MindMux integration, not an official DeepSeek plugin.
