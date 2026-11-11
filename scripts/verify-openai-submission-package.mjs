#!/usr/bin/env node

import { access, readFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packageRoot = join(root, "openai-plugin");
const manifest = JSON.parse(await readFile(join(packageRoot, "plugin.json"), "utf8"));
const mcp = JSON.parse(await readFile(join(packageRoot, "mcp.json"), "utf8"));
const fail = (message) => { throw new Error(message); };
const required = (value, label) => { if (!value) fail(`Missing ${label}`); };

required(manifest.name, "plugin name");
required(manifest.version, "plugin version");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name)) fail("Plugin name must be lowercase kebab-case");
const openai = manifest.extensions?.["com.openai"];
const ui = openai?.interface;
for (const field of ["displayName", "shortDescription", "longDescription", "developerName", "websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL", "composerIcon", "logo"]) required(ui?.[field], `interface.${field}`);
for (const url of [ui.websiteURL, ui.supportURL, ui.privacyPolicyURL, ui.termsOfServiceURL]) {
  if (!URL.canParse(url) || new URL(url).protocol !== "https:") fail(`Expected HTTPS listing URL, got ${url}`);
}
for (const path of [ui.composerIcon, ui.composerIconDark, ui.logo, ui.logoDark, openai?.onboardingSkill]) {
  required(path, "referenced asset or onboarding skill");
  await access(join(path.startsWith("./assets/") ? root : packageRoot, path.replace(/^\.\//, "")));
}
const server = mcp.mcpServers?.mindmux;
required(server, "mcpServers.mindmux");
if (server.type !== "streamable-http" || server.url !== "https://mcp.mindmux.ai/mcp") fail("MindMux MCP must use the production Streamable HTTP endpoint");
const auth = server.extensions?.["com.openai"]?.auth;
if (auth?.type !== "oauth" || auth.client?.mode !== "dcr") fail("MindMux MCP must declare OAuth Dynamic Client Registration");
for (const path of ["assets/icon.png", "assets/icon-dark.png", "assets/logo.png", "assets/logo-dark.png"]) {
  const image = join(root, path);
  if ((await stat(image)).size === 0) fail(`Empty asset: ${path}`);
}

const archive = join(root, "dist", `${manifest.name}-${manifest.version}.zip`);
await access(archive);
const contents = execFileSync("unzip", ["-Z1", archive], { encoding: "utf8" }).trim().split("\n");
for (const expected of ["plugin.json", "mcp.json", "assets/icon.png", "assets/logo.png", "skills/get-started/SKILL.md"]) {
  if (!contents.includes(expected)) fail(`Archive is missing ${expected}`);
}
if (contents.some((path) => path.includes(".env") || path.includes("node_modules") || path.startsWith(".git/"))) fail("Archive contains forbidden generated, secret, or Git content");
console.log(`Verified ${archive.replace(`${root}/`, "")}`);
