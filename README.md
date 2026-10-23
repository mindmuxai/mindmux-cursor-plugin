# MindMux Cloud Brain for Cursor

Connect Cursor to [MindMux Cloud Brain](https://mindmux.ai) through the Model Context Protocol (MCP). MindMux gives your agents access to the Cloud Brains, Workspaces, and project context available to your MindMux account.

## Requirements

- Cursor with plugin and remote MCP support.
- A MindMux account with access to Cloud Brain MCP.

## Install

Install **MindMux Cloud Brain** from the Cursor Marketplace. Cursor adds the remote MCP server and opens the MindMux OAuth authorization flow when you connect it.

Sign in to MindMux and select **Authorize**. No API key or local server is required.

## What it can do

After authorization, Cursor can use MindMux MCP to:

- List the Workspaces and Cloud Brains you can access.
- Read and update Cloud Brain pages and root pages.
- Create a Project and its attached Cloud Brain in a Workspace you explicitly select.

MindMux never infers a Cloud Brain from a repository or folder name. When a Brain is needed, Cursor asks you to select one.

## Configuration

The plugin connects to the following remote Streamable HTTP MCP server:

```text
https://mcp.mindmux.ai/mcp
```

For manual setup and details about authorization, see the [MindMux MCP setup guide](https://mindmux.ai/docs/getting-started/connect-cloud-brain-mcp).

## Disconnecting

Use Cursor's MCP connection controls to remove the server or clear its authentication. You can authorize it again later when needed.

## Privacy and support

MindMux Cloud Brain is a hosted service. Review the [MindMux Privacy Policy](https://mindmux.ai/privacy) and [Terms of Service](https://mindmux.ai/terms) before connecting your account.

For product information and support, visit [mindmux.ai](https://mindmux.ai).

## Development

To test the plugin locally, copy this repository into `~/.cursor/plugins/local/mindmux`, restart Cursor (or run **Developer: Reload Window**), then open **Customize** and confirm the MindMux MCP server is available.
