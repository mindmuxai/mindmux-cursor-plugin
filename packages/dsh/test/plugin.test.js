import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { Context, Service } from '@deepseek-ai/cordis';
import yaml from 'js-yaml';
import * as plugin from '../index.js';

test('real Cordis lifecycle registers stable OAuth identity and unloads all contributions', async () => {
  const ctx = new Context();
  const servers = new Map();
  const sections = new Map();
  const accounts = new Map();
  class Manager extends Service {
    constructor(scope) { super(scope, 'mcpManager'); }
    register(key, value) {
      assert.equal(servers.has(key), false);
      this.ctx.effect(() => { servers.set(key, value); return () => servers.delete(key); });
    }
  }
  class Prompt extends Service {
    constructor(scope) { super(scope, 'systemPrompt'); }
    getSectionOrder(key) { assert.equal(key, 'MCP_SERVERS'); return 30; }
    section(value) {
      this.ctx.effect(() => { sections.set(value.name, value); return () => sections.delete(value.name); });
    }
  }
  class Accounts extends Service {
    constructor(scope) { super(scope, 'mcpAccounts'); }
    register(value) {
      accounts.set(value.server, value);
      return () => accounts.delete(value.server);
    }
  }
  const manager = await ctx.plugin(Manager);
  const prompt = await ctx.plugin(Prompt);
  const connector = await ctx.plugin(plugin, {});
  assert.deepEqual(servers.get('mindmux'), {
    transport: 'streamable-http', url: 'https://mcp.mindmux.ai/mcp',
    oauth: { credentialKey: 'mcp-client/mindmux', scope: 'mindmux:brain:read mindmux:brain:write' },
    toolLoading: 'on-demand',
  });
  assert.equal(accounts.size, 0, 'headless host does not require the account UI');
  const account = await ctx.plugin(Accounts);
  // Injected plugins settle asynchronously when an optional service appears.
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(accounts.get('mindmux').packageName, '@mindmux/dsh-mindmux');
  assert.match(sections.get('mindmux').text, /load on demand/);
  await connector.update({ toolLoading: 'eager' });
  assert.equal(servers.get('mindmux').toolLoading, 'eager');
  await connector.dispose();
  assert.equal(servers.size + sections.size + accounts.size, 0);
  const reinstalled = await ctx.plugin(plugin, {});
  assert.equal(servers.get('mindmux').oauth.credentialKey, 'mcp-client/mindmux');
  await reinstalled.dispose();
  await account.dispose();
  await prompt.dispose();
  await manager.dispose();
});

test('configuration rejects unknown tool-loading modes', () => {
  assert.throws(() => plugin.Config({ toolLoading: 'all' }));
});

test('installable bundle patch resolves the package name and ships no install scripts', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  const patch = yaml.load(await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8'));
  assert.equal(patch[0].insert[0].name, manifest.name);
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml');
  assert.equal(manifest.dependencies, undefined);
  assert.equal(manifest.scripts.postinstall, undefined);
});
