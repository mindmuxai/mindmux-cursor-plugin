#!/usr/bin/env node

import { cp, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packageRoot = join(root, "openai-plugin");
const manifest = JSON.parse(await readFile(join(packageRoot, "plugin.json"), "utf8"));
const archiveName = `${manifest.name}-${manifest.version}.zip`;
const dist = join(root, "dist");
const stage = await mkdtemp(join(tmpdir(), `${manifest.name}-`));

try {
  for (const path of ["plugin.json", "mcp.json", "skills"]) await cp(join(packageRoot, path), join(stage, path), { recursive: true, force: true });
  await cp(join(root, "assets"), join(stage, "assets"), { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await rm(join(dist, archiveName), { force: true });
  execFileSync("zip", ["-q", "-r", join(dist, archiveName), "."], { cwd: stage, stdio: "inherit" });
  console.log(`Created dist/${archiveName}`);
} finally {
  await rm(stage, { recursive: true, force: true });
}
