# DSH marketplace submission

Prepared for [mindmux-cloud-web#205](https://github.com/mindmuxai/mindmux-cloud-web/issues/205). This change adds a DSH connector in `packages/dsh`; it does not change the Cursor or OpenAI packages, Cloud authorization, or App behavior.

## Research and design

Checked against upstream sources on 2026-11-23:

| Reference | What we adopted |
| --- | --- |
| [Marketplace contribution rules](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md) | One YAML entry; installable `dsh.bundle.patch`; monorepo subdirectory naming; original upstream peers; prerelease-aware ranges; pinned release tarball; GitHub raster icon. |
| [dsh-mem0](https://github.com/0Junze0/dsh-mem0) | Plain ESM can be installable without compilation; bundle patch and explicit package file list. Its Python service, automatic capture, and local data management are unnecessary for the hosted MindMux service. |
| [dsh-mcp-workbench](https://github.com/2239058652/dsh-mcp-workbench) | Prebuilt release distribution and artifact verification. MindMux does not duplicate its general-purpose MCP configuration UI. |
| [Official Linear connector](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/connector/linear) | Lifetime-owned manager registration, stable server/credential identity, system prompt section, optional Plugins-page account registry. |
| [Official MCP architecture](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/mcp.md) and [OAuth](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/mcp/mcp-client) | Delegate DCR, PKCE, token persistence, refresh and reconnect to DSH; initiate authorization explicitly; use on-demand tool loading. |

The implementation is independent MindMux code following these public extension interfaces; it does not copy a community plugin or package another author's implementation.

**Version decision:** the published `@deepseek-ai/dsh@latest` was `0.2.2-rc.5`; the account service is available in `0.2.3-alpha.2`. Installation documentation and `engines.dsh` require `~0.2.3-alpha.2`. Cordis must be `~4.2.0-alpha.1` and Schemastery `~3.20.0-alpha.1`, matching that host rather than older stable packages. Peer ranges explicitly include the tested prerelease tuples. The package does not claim compatibility with all DSH releases.

## Submission materials

- Installable source: [`packages/dsh`](packages/dsh).
- User instructions, paid-service prerequisite, privacy, permissions, disconnect, support: [`packages/dsh/README.md`](packages/dsh/README.md).
- English/Chinese display metadata: `packages/dsh/locale/`.
- GitHub-hosted square PNG: `packages/dsh/icon.png` (same MindMux brand asset as the existing plugin).
- Exact marketplace entry: [`submissions/dsh/mindmuxai__mindmux-plugin--packages-dsh.yml`](submissions/dsh/mindmuxai__mindmux-plugin--packages-dsh.yml).
- Archive: `dist/mindmux-dsh-mindmux-1.0.1.tgz`, generated locally and by the Verify DSH package workflow; intentionally not committed as a binary.
- No screenshots are declared: these are optional, and no connected-account screenshot is fabricated.

## Requirement checklist

| Requirement | Evidence / action |
| --- | --- |
| Working implementation, not README-only or a dependency-only meta-package | `index.js` registers the production MCP server, context guidance and account surface. |
| Installable bundle | `package.json` declares `dsh.bundle.patch`; patch inserts the package's exact name. |
| Existing, maintained, public repository older than one day | `mindmuxai/mindmux-plugin`, created 2026-10-23; existing Cursor integration is retained. |
| `dsh-plugin` repository topic | Add using the command below; verify before submitting. |
| Factual bilingual description and suitable category | Prepared YAML uses `memory`; no invented tool counts or unsupported offline/automatic-sync claims. |
| Official dependencies and prerelease support | Official packages are peer dependencies; test-only versions are pinned under devDependencies. |
| No install-time surprises or secrets | No prepare/postinstall scripts, external executables, token handling, local file ingestion or configurable destination for grants. |
| Icon requirements | PNG on raw.githubusercontent.com; included within the package. |
| Single-entry submission | Copy only the prepared YAML to the catalog's `data/plugins/`; do not edit generated READMEs. |
| Stable, downloadable distribution | Publish the pinned `dsh-v1.0.1` release and archive **after this source PR is merged**, before the marketplace PR. |

## Validation and limits

Completed locally with Node 24.22.3 and the published DSH 0.2.3-alpha.2 packages:

- Real Cordis plugin lifecycle tests: on-demand default, eager reconfiguration, delayed optional account service, unload cleanup, stable identity after reinstall, invalid configuration rejection, bundle/name consistency.
- `npm ci --ignore-scripts`, tests, `npm pack`, archive allowlist/license verification. Runtime archive contains only nine declared files, no credentials, node_modules, tests or dev lockfile.
- In an isolated `DSH_HOME`, actual `dsh plugin --profile web add -w <archive>` succeeded. `--dump-config` contains the `mindmux` entry and Web boot succeeds.
- Plugins page renders the MindMux account and Connect button. Clicking Connect successfully performs discovery and DCR against production, then opens MindMux's login page with PKCE S256, the requested read/write scopes, resource `https://mcp.mindmux.ai/mcp`, and a loopback callback under `/mcp/oauth/callback/…`. No production callback allowlist change was needed.

**Not claimed as tested:** completing an interactive MindMux account authorization, authorized tool calls, refresh with real user tokens, Desktop-specific behavior, or remote DSH deployment. These require an authorized test account/session and are the final acceptance steps below. This connector delegates refresh to DSH rather than implementing its own token algorithm. Upstream marketplace CI and human approval can only be checked once the source and release URLs are public.

Independent sub-agent review checked current marketplace rules, published runtime APIs, package contents and lifecycle behavior. It found a Schemastery peer mismatch; this was fixed to match the host's `3.20.0-alpha.1`, and the lockfile was regenerated against `registry.npmjs.org`. No other blocking source-PR findings remained. This review does not substitute for the authenticated acceptance steps below.

## Final acceptance before marketplace submission

1. Install the final release tarball into a fresh local Web profile with the documented DSH and Node versions.
2. Connect a test MindMux account with a Plus/Team Workspace. Confirm the browser callback completes and Plugins shows Connected.
3. Ask for Workspaces, Projects and Brains. Read a chosen test page; create/update a disposable page only in the explicitly selected test Brain. Confirm a disallowed Workspace stays inaccessible.
4. Restart DSH and confirm the saved grant works. After access-token expiry, make another read request to exercise DSH refresh. Never include tokens/codes in evidence.
5. Sign out on the plugin account surface; confirm tools require authorization again. Reconnect; disable/uninstall and confirm the server contribution disappears.

## Publish and submit

Run from this repository after merging the source PR, on a clean updated `main`. Use the required Node version.

```sh
git switch main
git pull --ff-only
cd packages/dsh
npm ci --ignore-scripts
npm test
cd ../..
node scripts/verify-dsh-package.mjs
gh repo edit mindmuxai/mindmux-plugin --add-topic dsh-plugin
gh release create dsh-v1.0.1 dist/mindmux-dsh-mindmux-1.0.1.tgz \
  --repo mindmuxai/mindmux-plugin --target "$(git rev-parse HEAD)" \
  --title 'MindMux for DSH 1.0.1' --notes-file submissions/dsh/RELEASE_NOTES.md
```

No npm publish is necessary. Check that the release download and `main/packages/dsh/package.json` URLs return successfully before submitting. Never replace a published archive silently; bump version and release tag for changes.

Fork/clone [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin), create a branch, then copy **one** file:

```sh
# From your marketplace checkout; replace the source path with your plugin checkout.
cp /path/to/mindmux-plugin/submissions/dsh/mindmuxai__mindmux-plugin--packages-dsh.yml data/plugins/
git add data/plugins/mindmuxai__mindmux-plugin--packages-dsh.yml
git commit -m 'Add MindMux Cloud Brain plugin'
git push -u origin HEAD
gh pr create --repo awesome-dsh-plugin/awesome-dsh-plugin \
  --title 'Add MindMux Cloud Brain plugin' \
  --body-file /path/to/mindmux-plugin/submissions/dsh/MARKETPLACE_PR.md
```

Review the upstream contribution guide again at submission time. Follow its CI and human feedback; only change our own entry. The main source PR does **not** publish a release or submit to the external catalog automatically.
