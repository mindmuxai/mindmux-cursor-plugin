import z from '@deepseek-ai/schemastery';
import { COPY } from './locales.js';

export const name = 'mindmux';
export const inject = ['mcpManager', 'systemPrompt'];

export const Config = z.object({
  toolLoading: z.union(['eager', 'on-demand']).default('on-demand'),
});

const GUIDANCE = `Tools named mcp__mindmux__* belong to the MindMux plugin (MindMux 插件).
Tools load on demand: use the host's MCP tool loader to discover MindMux tools before assuming the account is disconnected. If the server reports authorization is required, ask the user to connect MindMux on its Plugins page.
Use list_workspaces, list_projects, and list_brains to discover accessible context. Ask the user to select a Workspace and Brain if the target is ambiguous. Never infer a Brain from a local repository or folder name. Respect the server's authorization and plan restrictions.
Before writing, read the target Brain's current instructions and relevant pages. Follow the server's format validation and tool descriptions. Use full-document update for replacing or correcting existing content; append only genuinely additive content. Record meaningful knowledge changes in the timeline, but do not add timeline noise for immediate typo or initial-entry corrections. Only create projects or modify knowledge when the user's task calls for it.`;

// Stable identity lets the host reuse a saved grant after reinstalling. The
// endpoint is deliberately fixed so configuration cannot redirect saved tokens.
export function apply(ctx, config) {
  ctx.mcpManager.register(name, {
    transport: 'streamable-http',
    url: 'https://mcp.mindmux.ai/mcp',
    oauth: {
      credentialKey: 'mcp-client/mindmux',
      scope: 'mindmux:brain:read mindmux:brain:write',
    },
    toolLoading: config.toolLoading,
  });
  ctx.systemPrompt.section({
    name,
    order: ctx.systemPrompt.getSectionOrder('MCP_SERVERS'),
    text: GUIDANCE,
  });
  ctx.inject(['mcpAccounts'], (scope) => {
    scope.effect(() => scope.mcpAccounts.register({
      server: name,
      packageName: '@mindmux/dsh-mindmux',
      copy: COPY,
    }), 'mindmux: Plugins page account');
  });
}
