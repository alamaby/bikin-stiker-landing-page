#!/usr/bin/env node
/**
 * inject-placeholders.mjs
 * Prebuild script: fills .well-known templates (*.in) with real env values.
 * Aborts build if any <PLACEHOLDER> remains unsubstituted.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(process.cwd());

function substitute(srcPath, dstPath, substitutions) {
  const content = readFileSync(srcPath, "utf-8");
  let next = content;

  for (const [placeholder, value] of Object.entries(substitutions)) {
    if (next.includes(placeholder) && !value) {
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
const aasaSrc = resolve(ROOT, "public/.well-known/apple-app-site-association.in");
const aasaDst = resolve(ROOT, "public/.well-known/apple-app-site-association");
substitute(aasaSrc, aasaDst, {
  "<APPLE_TEAM_ID>": process.env.APPLE_TEAM_ID ?? "",
  "<BUNDLE_ID>": process.env.APPLE_BUNDLE_ID ?? "com.alamaby.bikin_stiker",
});

const assetlinksSrc = resolve(ROOT, "public/.well-known/assetlinks.json.in");
const assetlinksDst = resolve(ROOT, "public/.well-known/assetlinks.json");
substitute(assetlinksSrc, assetlinksDst, {
  "<ANDROID_SHA256_FINGERPRINT>": process.env.ANDROID_SHA256_FINGERPRINT ?? "",
});

console.log("[inject-placeholders] All placeholders resolved.");
