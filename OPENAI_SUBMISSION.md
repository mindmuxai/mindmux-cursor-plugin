# OpenAI Plugin submission

`openai-plugin/` is the source for the MindMux Cloud Brain OpenAI Plugin package. It is intentionally separate from the Cursor Marketplace manifest, so OpenAI's portable MCP transport settings cannot change Cursor behavior. Generate the uploadable archive with:

```sh
node scripts/build-openai-submission-zip.mjs
node scripts/verify-openai-submission-package.mjs
```

The result is `dist/mindmux-cloud-brain-<version>.zip`. It contains only the package manifest, remote MCP configuration, onboarding skill, and four listing icons. It intentionally excludes service source code, `node_modules`, Git metadata, test credentials, secrets, and environment files.

## Before submitting

The package configures the public production endpoint `https://mcp.mindmux.ai/mcp`, OAuth Dynamic Client Registration, and the read/write scopes it exposes. The endpoint and OAuth metadata must remain publicly reachable during OpenAI's review.

In the OpenAI submission dashboard, complete the items that must not be committed to the ZIP:

- Enter the credentials for a fully featured demo account with safe sample Workspace and Brain data.
- Add exactly five positive and three negative tested review cases, using the production tool names shown by the dashboard scan.
- Provide an accessible video walkthrough for those review cases.
- Confirm that the privacy, terms, support, and product URLs in `plugin.json` are still current.
- Complete the policy attestations and resolve all metadata and MCP scan findings before submitting.

Do not upload the archive until the demo account and review materials are ready. Package metadata changes require a version bump in `plugin.json` and a newly generated ZIP.
