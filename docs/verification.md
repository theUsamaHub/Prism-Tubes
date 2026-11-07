# Verification for the first playable slice

- Six Node tests passed: all five introductory solution paths replay legally to a win; invalid moves preserve input.
- Vite production build passed. Generated JavaScript: 1,716.30 kB (413.58 kB gzip). CSS: 3.73 kB. Vite reports a large-chunk warning; Phaser bundle splitting is a future optimization.
- npm installation audit reported zero known vulnerabilities at installation time.
- Browser, pointer, keyboard, mobile, accessibility, save recovery, and visual checks remain unverified.
- This milestone is not ready for CrazyGames submission.

## Game-screen redesign

Replaced the website-style header, introductory copy, and framed card with a full-screen game HUD. Enlarged tube/orb rendering, added an animated first-level hand and target ring, animated legal transfers, and restyled pause/results/garden screens. Tutorial targets are derived from the current board, so Undo/Restart restore the appropriate guidance. Reduced-motion preferences disable looping guide motion.

Six rule tests passed. Production build passed with the existing large-chunk warning. The browser preview tool timed out; rendered desktop/mobile appearance and pointer playtesting remain unverified.

## Requested presentation additions

Added a count-up clock (no countdown or star penalty), persistent elapsed time, thicker layered glass tubes, a win ribbon/confetti with reduced-motion support, and original Web Audio effects with a saved sound toggle. Sound initializes after interaction and stops when paused/hidden. Clock pauses in menus and on completion, and resets on restart/new level.

The six existing puzzle-rule tests pass. Build verification covers compilation only; actual listening, timer lifecycle, and rendered celebration/tube checks still require browser playtesting.

## Completion rewards

Added a dedicated results panel with animated stars, custom coin artwork, crystal reward, collection progress, saved coin total, and Continue action. First wins award 30 coins plus 10 per new star. Replays award only star improvements; old saves migrate their previously earned balance. Completion records and coin balances save together. Tab hiding after completion no longer replaces results with the pause screen.

Ten automated tests pass, including first rewards, replay/reload duplicate prevention, improved-star rewards, old-save migration, and cross-level accumulation. Production build passes with the existing bundle-size warning. Visual results-screen inspection and browser interaction remain unverified. Coins are saved currency; a cosmetic shop is still pending.

## Ball polish, pause menu, and 30-level campaign

Ball textures now use a 512px canvas with linear filtering and no dark outline. The pause menu is a compact panel over the blurred board, with level/move/time statistics, Resume, Restart, sound, and symbol settings. Campaign expanded to 30 frozen layouts, retaining the first five, with three to six colors and distinct symbols. Seeded reverse-shuffle tooling lives in scripts/generate-levels.mjs.

All 36 tests pass, covering each solution witness, exact color counts, unique tube-order-normalized boards, and reward behavior. Automated solvability does not establish perceived difficulty: difficulty pacing, visual quality, later-level mobile layouts, and menu interaction still require browser playtesting. Full 150-level scope remains pending.

## Glass marble and layered audio pass

Replaced enamel textures with cached, procedurally shaded glass-marble textures: spherical lighting, rim reflection, refracted color, curved highlights, and lower-edge light. Added layered glass resonance, soft placement impacts, subtle pitch variation, short convolution ambience, and a fuller win cadence. Audio includes a compressor, voice cap, repeat-rate guard, mute, and pause/visibility silencing.

Production build and 36 existing gameplay/reward tests pass. These checks do not verify perceived realism or sound quality; browser visual inspection and listening remain pending. New artwork and audio are generated locally and introduce no external asset licenses.

## Ball design shop

Coins now purchase persistent cosmetic designs: Cut Gemstones (150) and Swirl Candies (300), alongside the free Glass Marbles. Open the shop using the HUD coin balance. Previews use the same drawing function as gameplay. Purchases immediately equip, deduct once, reject insufficient funds, and preserve ownership across levels and reloads. The shop pauses gameplay/time; color-symbol settings remain optional.

All 39 tests and the production build pass. Browser visual checks and end-to-end purchase interaction remain pending.

## Looping music and display scaling

Added an original 32-second synthesized ambient loop with independent saved music control. Music starts after interaction, continues across levels and menus, and fades out while paused or hidden. Pickup, placement, and completion effects have increased levels. Rendering now uses an explicitly scaled canvas/camera up to 2x device density (Phaser 3.90 does not expose a resolution config), filtered 128px textures downsampled from 512px artwork, and simpler wider candy swirls to reduce aliasing.

Existing 39 gameplay/reward/shop tests pass. Actual listening balance and high-density rendering/input behavior still need browser/device verification.
