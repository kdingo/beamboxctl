import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

/**
 * Resolves the package version by walking up from this module's location
 * until a package.json is found. A fixed relative path (e.g. "../../package.json")
 * breaks once tsup bundles everything into a single dist/index.js, since the
 * resolved depth from the source layout no longer matches the built output.
 */
function findPackageVersion(): string {
  let dir = dirname(fileURLToPath(import.meta.url));

  while (true) {
    const candidate = join(dir, "package.json");
    try {
      return (require(candidate) as { version: string }).version;
    } catch {
      const parent = dirname(dir);
      if (parent === dir) {
        throw new Error("Could not locate package.json");
      }
      dir = parent;
    }
  }
}

export const version = findPackageVersion();
