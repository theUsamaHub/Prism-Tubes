# Prism Tubes game design

Status: Approved by the user on 7 November 2026. Implementation underway.

## Experience and audience

A relaxing, original sorting puzzle for casual desktop and mobile players. Move glossy glowing orbs between glass tubes, complete color sets, and grow a Prism Garden. No timer, lives, energy, mandatory ads, or game-over screen. Quality and fair challenge take priority over a fixed release date.

The initial release includes 150 campaign levels, Daily Prism, a crystal collection, local saving, cosmetic unlocks, and accessible input. Endless mode, accounts, leaderboards, backend services, purchases, and extensive achievements are outside the initial scope.

## Rules and core loop

- Each tube holds four orbs. Each color occurs exactly four times.
- A move transfers one exposed top orb into an empty tube or onto an orb of the same color, provided there is space. Moving to the same tube is a cancellation.
- A puzzle is solved when every nonempty tube is full and monochrome. Empty tubes are allowed. Completed tubes remain movable so the rules stay consistent.
- Select a source, choose a legal destination, receive immediate feedback, and repeat until sorted. See stars, coins, and a crystal reveal, then continue or visit the garden.
- Invalid moves do not count. Restart resets the board and move count. Undo is unlimited and free, restoring the previous board and move count.
- One free extra tube is available per puzzle attempt, persists across reloads, and cannot be stacked by restarting. Restart retains that extra tube if already used. Replays start a fresh attempt, again capped at one extra tube.
- Help never reduces the number of colors or automatically solves the board. No progression is blocked by star ratings.

## Fair progression

The ranges below are authoring targets, subject to solving and playtesting. Color count alone does not determine difficulty.

| Levels | Colors | Starting tubes | Intended experience |
| --- | --- | --- | --- |
| 1–10 | 3 | 5 | Clear visual tutorial; short, forgiving arrangements; early success |
| 11–30 | 3–5 | colors + 2 | Introduce reserving space and planning a few moves ahead |
| 31–60 | 5–7 | colors + 2 | More mixed stacks; occasional easier recovery levels |
| 61–90 | 7–9 | colors + 2 or 3 | Longer plans; introduce mystery orbs gradually after level 75 |
| 91–120 | 9–10 | colors + 3 | More complex arrangements with room to recover |
| 121–150 | 10–12 | colors + 3 | Advanced puzzles; limited mystery orbs; varied challenge |

The campaign starts with at most 15 tubes; the assistance tube keeps the total at or below 16. Introduce only one new concept at a time. Insert easier levels between challenge peaks. Do not increase difficulty based on a player's failures or purchases.

Mystery orbs hide both color and accessibility symbol until exposed at the top. Once revealed, their identity remains known for that attempt, including after Undo; restarting restores the original reveal state. Mystery masks do not change the underlying rules. Tutorial messaging explains the reveal rule. Avoid heavily concealed arrangements that demand repeated blind guesses.

Every shipped level must have a replayable legal solution from its original board without the extra tube. Generate candidates offline with reverse operations whose corresponding forward moves are legal, retain the solution witness, and independently replay it. Reject invalid counts, already solved starts, duplicates, and failed witnesses. Freeze the 150 accepted layouts as versioned data rather than generating new campaign boards on each load.

Assess difficulty using solution length, branching, empty-space pressure, and human playtesting. Reverse-shuffle length is not a difficulty score. Use a bounded solver to improve solution paths and identify dead ends where feasible; never describe a bounded search timeout as proof of impossibility.

## Stuck assistance

If no meaningful legal move exists, offer Undo, Restart, and Add Tube if unused. Do not repeatedly interrupt the player. A board with legal moves can still be unsolvable: show a definitive stuck message only when proven, otherwise use neutral wording such as “Need more room?” Help remains accessible at all times. No dead-end detection may block the main thread.

## Stars, coins, and collection

Proposed tuning defaults: three stars within a validated reference solution length R, two within ceil(1.5 × R), and one for any other completion. R is a known achievable solution, not a claim of optimality. Undo restores the displayed move count; the free extra tube carries no star penalty. Keep best stars on replay.

Award 30 coins for first campaign completion and 10 for each newly earned star, including first-completion stars. Replays award only newly improved stars. Completing a campaign level adds its uniquely indexed crystal once. Group crystals into garden beds of 10; use lightweight visual variations so the collection grows without requiring 150 large image assets.

Start with three optional tube finishes and three optional backgrounds, including the defaults. Proposed additional cosmetic prices: 150 and 300 coins per category. Cosmetics never alter rules or readability. No competitive score or mandatory grinding.

## Daily Prism

Use a UTC date key and a versioned deterministic selection from a validated daily puzzle bank. The same game version yields the same puzzle for everyone on the same UTC day. Display the date and UTC rollover clearly. Do not use unverified runtime generation to supply the daily puzzle.

Daily puzzles use moderate difficulty and no mystery orbs initially. Give 30 coins and one daily garden accent once per date; replays are allowed without duplicate rewards. A first completion on the next consecutive UTC date increments the streak; a missed date resets it to one upon the next completion. Repeating the same date never increments it. Freeze an in-progress puzzle across midnight; its completion counts for its original date and cannot roll streak history backward.

Local date-based behavior depends on the device clock and local storage. No global leaderboard, cloud sync, or clock-cheating prevention is promised. Persist daily generator/bank version with active attempts.

## Controls and accessibility

- Mouse/touch: drag a top orb or tap a source then a destination. Use a movement threshold to distinguish taps from drags. Dropping outside the board cancels safely.
- Keyboard: arrows navigate tubes, Enter/Space selects or places, Escape cancels or opens pause, Z undoes. Avoid capturing keys in unrelated UI controls.
- Colorblind mode adds twelve distinct high-contrast symbols. Mirror symbols in selection feedback and tutorials. Color alone never indicates valid/invalid targets.
- Provide visible focus, readable contrast, large touch targets, reduced-motion support, and separate music/SFX settings. Do not depend on vibration support; convey tactile feedback with sound and animation.
- Portrait-first adaptive layouts: grow to multiple tube rows as needed, keep labels and controls readable, and support desktop landscape without stretching gameplay art.

## Screens and state

Screens: home/continue, level selection, gameplay HUD, pause/settings, results, Prism Garden, cosmetic selection, and Daily Prism entry/results. First-level tutorial teaches one action at a time inside the board.

States: boot, menu, playing, selected, animating, paused, won, results. Serialize board mutations, prevent double moves during transitions, and expose an immediate visual response to input. Commit rewards once per completion using persistent completion identifiers. Hide/pause gameplay and audio on tab loss; require a deliberate resume when appropriate. Resize or pointer cancellation must not strand an orb between tubes.

## Visuals and audio

Soft neon glassmorphism over deep indigo/purple gradients, vibrant orbs, and warm gold rewards. Original glass-tube rendering, glossy highlights, consistent rounded controls, and restrained bloom-like effects. Avoid dependency on expensive full-screen shaders.

Effects: orb lift and arc-drop with subtle squash/stretch; brief completion particles and chain glow; combo shimmer for consecutive tube completions; win confetti and crystal reveal. Combo effects are cosmetic and impose no timing requirement. Reduce particle counts and motion on constrained devices or reduced-motion settings.

Use synthesized Web Audio or documented original/CC0 assets: calm ambient music, bounded pitch variation on placements, and tube-completion chimes. Initialize audio after user interaction, persist separate toggles, and stop/pause correctly on backgrounding. Record licenses and sources for every imported asset.

## Technical architecture and saving

React + Vite + JavaScript ES6+ for application structure and interface; Phaser 3 for board rendering, animations, and input. npm dependency management. No TypeScript, server, database, or unnecessary libraries.

Suggested structure: src/components, src/screens, src/game/scenes, src/game/systems, src/game/objects, src/game/config, src/services, src/styles, and public/assets. A pure puzzle-rules module is shared by gameplay, generation validation, and solver checks. React owns menus and persistent UI; Phaser owns the real-time board. Use an explicit event bridge with cleanup, one Phaser instance per mounted game, and no per-frame React state updates.

Versioned LocalStorage saves contain campaign unlocks/best stars, coin ledger, owned/equipped cosmetics, garden rewards, settings, daily history/streak, and active campaign/daily attempts including undo history, reveal state, and extra-tube usage. Validate loaded data, migrate known versions, recover safely from malformed saves, and warn unobtrusively if storage is unavailable. Retain default playability when saving fails. Local saves do not guarantee cross-device continuity.

Use local bundled assets and no gameplay backend requests. Development should work without internet after dependencies are installed. Platform integration is isolated behind an adapter with a local fallback.

## Performance and platform preparation

Target smooth 60 FPS on capable devices, a small initial load, capped pixel density, reused graphics/textures, bounded particles, and minimal allocations. Measure production build size, load time, frame times, and memory before reporting results. Exact current platform budgets and SDK obligations remain unverified until checked against official CrazyGames documentation.

First target: CrazyGames Basic Launch. No ads in this build. Keep future optional rewarded placements separate from the free assistance already promised; do not remove that free assistance for monetization. Recheck official launch, save, SDK, packaging, content, thumbnail, and submission requirements before implementing platform features and again before release. Acceptance and monetization are not guaranteed.

## Milestones and acceptance gates

1. Design approval: agree on this baseline and any changes.
2. Core playable slice: responsive board, both pointer modes, keyboard, valid moves, Undo, Restart, extra tube, and five gentle levels. Review feel and readability before scaling content.
3. Campaign pipeline: deterministic candidate generation, witness validation, deduplication, difficulty review, and 150 frozen levels. Verify every shipped solution and star reference.
4. Progression: stars, coins, garden, cosmetics, safe saving, and Daily Prism with date-boundary checks.
5. Polish: final visual identity, audio, tutorial, mystery orbs, accessibility, and responsive layouts.
6. QA and optimization: targeted rule/state tests, all-level solution replay, production build checks, browser playtesting, and performance measurements.
7. Submission preparation: current official requirements review, platform preview, build package, metadata, covers, instructions, asset/license inventory, and QA report.

Required QA covers legal/illegal moves, wins, Undo after completion effects, assistance/restart/reload limits, duplicate rewards, corrupt/unavailable storage, daily midnight and streak boundaries, mystery reveal behavior, pointer cancellation, resize, backgrounding, audio activation, reduced motion, symbols, keyboard focus, touch and mouse, and low-end performance. Inspect a 360px-wide layout plus tablet and desktop. Verify production assets under a subpath/iframe and test available browsers; explicitly list devices/browsers not actually tested. Never equate automated solution checks with human difficulty validation.

Final deliverables: source, install/dev/build instructions, playable production build, controls, architecture notes, licensing inventory, verified QA results and remaining manual checks, and a CrazyGames submission checklist. Release only after blocking issues are resolved.

