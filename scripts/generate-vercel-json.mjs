#!/usr/bin/env node
/**
 * generate-vercel-json.mjs
 * Prebuild script: interpolates SUPABASE_PROJECT_REF into vercel.json.
 * Fails fast if SUPABASE_PROJECT_REF is unset — never emit an invalid redirect URL.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(process.cwd());
const src = resolve(ROOT, "vercel.json.in");
const dst = resolve(ROOT, "vercel.json");

if (!existsSync(src)) {
  console.warn("[generate-vercel-json] vercel.json.in not found, skipping.");
  process.exit(0);
}

const ref = process.env.SUPABASE_PROJECT_REF;
if (!ref) {
  console.error(
    "[generate-vercel-json] ERROR: SUPABASE_PROJECT_REF env var is required to generate vercel.json"
  );
  process.exit(1);
}

let content = readFileSync(src, "utf-8");
content = content.replaceAll("__SUPABASE_PROJECT_REF__", ref);

writeFileSync(dst, content);
console.log("[generate-vercel-json] vercel.json generated.");
