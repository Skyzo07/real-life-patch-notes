// Real-Life Patch Notes: The Comedy Changelog
// Writes one single-line patch note to /output/entry.txt.
// Deterministic: no network, no clock, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Internal winner (candidates.md): the doorway effect — the most
// universally recognised body bug in the set, with the fix itself
// carrying the second joke ("cached for at least one doorway").
// 131 chars, single line, well inside the 1-160 gate.
// CrowLLM panel (panel-results.json): effectively tied — C11 146.5 vs
// C2 145.5 across 2 parsed judges (grok near-flat, minimax ranks C2
// first); the panel does not overrule the internal ranking, so C2 stands.
const ENTRY =
  "v2.1.0: fixed a bug where walking into a room deleted the reason you went there; the reason is now cached for at least one doorway.";

// Gate guard: fail loudly instead of writing an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-160 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
