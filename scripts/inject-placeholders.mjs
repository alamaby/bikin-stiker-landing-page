#!/usr/bin/env node
/**
 * inject-placeholders.mjs
 * Prebuild script: fills .well-known templates (*.in) with real env values.
 * Apple placeholders are optional until an Apple Developer account is
 * provisioned — empty appIDs array keeps the AASA valid for iOS apps that
 * are not yet published.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(process.cwd());

function substitute(srcPath, dstPath, subs) {
  const content = readFileSync(srcPath, "utf-8");
  let next = content;

  for (const [placeholder, { value, required }] of Object.entries(subs)) {
    if (next.includes(placeholder) && !value && required) {
      console.error(
        `[inject-placeholders] ERROR: env var required for ${placeholder} (source: ${srcPath})`
      );
      process.exit(1);
    }
    next = next.replaceAll(placeholder, value ?? "");
  }

  const unfilled = [...next.matchAll(/<[A-Z_]+>/g)].map((m) => m[0]);
  if (unfilled.length > 0) {
    console.error(
      `[inject-placeholders] ERROR: unfilled placeholders in ${srcPath}: ${unfilled.join(", ")}`
    );
    process.exit(1);
  }

  writeFileSync(dstPath, next);
  console.log(`[inject-placeholders] ${dstPath} generated from ${srcPath}.`);
}

// .well-known templates (.in) -> generated output (ignored)
const appleTeamId = process.env.APPLE_TEAM_ID ?? "";
const appleBundleId = process.env.APPLE_BUNDLE_ID ?? "";
const appleAppIds =
  appleTeamId && appleBundleId
    ? JSON.stringify([`${appleTeamId}.${appleBundleId}`])
    : "[]";

const aasaSrc = resolve(ROOT, "public/.well-known/apple-app-site-association.in");
const aasaDst = resolve(ROOT, "public/.well-known/apple-app-site-association");
substitute(aasaSrc, aasaDst, {
  "<APPLE_APPIDS>": { value: appleAppIds, required: false },
});

console.log("[inject-placeholders] All placeholders resolved.");
