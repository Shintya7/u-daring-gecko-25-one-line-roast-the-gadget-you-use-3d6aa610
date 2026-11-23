// One-Line Roast: The Gadget You Use Every Day — make.fun bounty
// One original roast of my smartwatch, a single line under 200 characters.
// Writes the roast to /output/entry.txt (no trailing newline).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST =
  "My smartwatch cheers when I stand up, then silently counts down the seconds until I sit back down.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT || "/output/entry.txt";

// The turn: the watch's stand-up praise is a setup — the moment I sit
// down again it is already timing me, so the coach becomes the hall
// monitor. One concrete behaviour, one reversal, no wasted words.
function validateRoast(roast: string): void {
  if (roast.length < 1 || roast.length > 200) {
    throw new Error(`Roast must be 1-200 characters, got ${roast.length}.`);
  }

  if (roast.includes("\n")) {
    throw new Error("Roast must be a single line.");
  }

  // Control characters (tabs, carriage returns, ANSI escapes, ...) would
  // break the single-line plain-text contract even without a newline.
  if (/[\u0000-\u001f\u007f]/.test(roast)) {
    throw new Error("Roast must not contain control characters.");
  }

  if (roast.trim().length === 0) {
    throw new Error("Roast must not be only whitespace.");
  }
}

validateRoast(ROAST);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ROAST, "utf8");

console.log(`Wrote ${ROAST.length} characters to ${OUTPUT_PATH}`);
