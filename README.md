# Prism Tubes

Relaxing color sorting with React, Vite, JavaScript, and Phaser 3.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Current milestone

First playable slice: 30 solution-verified levels with three to six colors; mouse/touch tap and drag input; keyboard input; unlimited undo; restart; one free assistance tube; local saving; symbol mode; crystal collection preview; adaptive board; pause on tab hiding.

This is an early development build, not a finished CrazyGames submission. The full 150-level campaign, Daily Prism, mystery orbs, cosmetics, richer animations, robust save recovery, and platform verification remain planned. Elapsed time, synthesized sound, win rewards, and saved coins are implemented. Browser/device playtesting has not yet been completed.

Controls: tap a source and destination or drag between tubes. Focus the board to use arrows and Enter/Space; Z undoes and Escape pauses. Orb symbols can be enabled below the board.

## Architecture

`src/rules.js`: pure rules and authored level data. `src/rules.test.js`: legal solution replays and invalid-move checks. `src/board.js`: Phaser board. `src/main.jsx`: React interface and game state. `src/style.css`: responsive presentation. `docs/design.md`: approved product baseline.

## Assets and licensing

Current board and interface use generated geometric graphics and system fonts. No third-party art or audio is included. Dependency licenses are supplied with installed packages. Preserve a full asset inventory as assets are introduced.
