Build, test, and lint

- Development (fast, runs source with TSX):
  - bun run dev  # uses tsx src/index.tsx
  - npm run dev or pnpm dev works if you prefer node/pnpm

- Build and run:
  - bun run build
  - bun run start  # runs node dist/index.js
  - npm run build / npm start or pnpm equivalents also work

- Tests (Vitest):
  - bun run test
  - Run a single test file: bun run test -- src/path/to/file.test.ts
  - Run by test name: bun run test -- -t "pattern"
  - npm/pnpm users: npm test -- <path> or npm test -- -t "pattern"

- Lint: no lint script configured in package.json. TypeScript strict checks are enabled via tsconfig.json.

High-level architecture

- CLI entry: src/index.tsx and src/cli/index.tsx — Ink-based TUI (react + ink) exposing commands via commander.
- Core uploader: src/lib/core (beambox-uploader.ts) — orchestrates image processing, packet building, and transport.
- BLE transport: src/lib/ble (ble-client.ts) — wraps @stoprocent/noble for platform BLE operations.
- Protocol: src/lib/protocol — builders (headers/payloads), parsers, packet & response types, constants.
- Processing: src/lib/processing — image processing (sharp), frame extraction and media detection used before upload.
- UI/hooks/components: src/hooks and src/components — ink components and hooks for progress/status in the TUI.
- Tests: src/__tests__ and *.test.ts alongside implementation files (Vitest).

Key repository conventions and notes

- ESM package ("type": "module") and TypeScript (noEmit: true). Build uses tsup to output ESM to dist/ and produce d.ts files.
- Dev runner is tsx (fast TypeScript execution). CI uses Bun (see .github/workflows/tests.yml) — Bun is recommended but npm/pnpm work for scripts too.
- Native dependencies (sharp, noble, usb, bluetooth HCI bindings) require platform support and may need platform-specific setup or prebuilt binaries.
- Tests use Vitest; run single tests by file path or with -t to match names.
- CLI binary is configured in package.json bin -> dist/index.js; packaging assumes successful build with tsup.
- Follow repository module separation: protocol <-> processing <-> transport. Keep protocol builders/parsers deterministic (pure functions) to ease testing.

AI assistant / other assistant configs checked

- No CLAUDE.md, .cursorrules, AGENTS.md, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, .clinerules or similar assistant config files found in repo root.

If anything should be expanded (example commands for Windows specifics, native dependency notes, or adding a lint script), say which area to expand.
