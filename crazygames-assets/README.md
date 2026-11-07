# Prism Tubes artwork

Created with the built-in image-generation tool for the implemented sorting game, using its ivory/sage background, teal glass tubes, and orange/turquoise/gold marbles. Four compositions were generated separately. Exported with proportional scaling and minimal center cropping; no stretching.

| File | Pixels | Format |
| --- | --- | --- |
| cover-landscape-1920x1080.png | 1920 × 1080 | PNG |
| cover-portrait-800x1200.png | 800 × 1200 | PNG |
| cover-square-800x800.png | 800 × 800 | PNG |
| game-icon-1024x1024.png | 1024 × 1024 | PNG |

Dimensions and PNG encodings verified from exported files. Generated artwork visually reviewed in the conversation: spelling correct, consistent palette, visible tubes/marbles, no third-party logos or watermarks. These are promotional illustrations, not gameplay screenshots. Landscape/square images include a small move-direction arrow; confirm acceptance in the submission portal because the public cover guidance prohibits icons. Final platform approval is not guaranteed.

Official requirements reviewed 7 November 2026: https://docs.crazygames.com/requirements/game-covers/
Three covers at the above sizes are required. The 1024 icon is a reusable extra, not a confirmed mandatory separate submission asset. The public page does not specify accepted cover file extensions. Preview videos are also required and have not been produced. No separate logo or loading-screen PNG is included; the game uses a lightweight HTML splash.

Runtime copies: public/assets/branding/game-icon-192.png and favicon-64.png. Full-resolution covers are outside public/ and are not bundled with the game.

Splash: visible in initial HTML, removed on first Phaser postrender, no minimum delay. window.prismBootMetrics exposes readyMs and initializationMs for real browser measurements. Sub-second startup is a target, not verified or guaranteed. A reload fallback appears after ten seconds if startup has not finished.
