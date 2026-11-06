# Verification record — storybook and mood inspiration revision

## Observed environment

The UI automation inventory returned `apps: []` and `browsers: []`. No browser preview, screenshot, rendered-layout sign-off, or real touch test was available. No browser was installed and no alternative browser-control path was used.

## Passed checks

All application JavaScript passes Node syntax checks. The four dependency-free test scripts report **55 passing checks**:

- **14 general/history checks:** local entry files and asset references; English-only rendering across old language preferences; all printing stages; all six chapters and artwork details; chapter introduction/deeper-story word counts; structured source records; artwork data consistency; printing alignment/order/recovery/completion; quiz content; blocked-storage fallback; text/control contrast; and print metadata handoff.
- **13 drawing/guide checks:** blank freehand default; pointer coordinate mapping; pressure/eraser commands; undo/redo/clear recovery; keyboard drawing; paper/color changes; exhibition snapshots; cross-file editing with blocked storage; print-versus-drawing precedence; PNG composition commands; invalid-data rejection; all 18 examples plus independent guidance across five steps; and mood/guide navigation/tool setup without altering the artwork.
- **12 gateway/navigation checks:** four real feature links; expansion and single navigation; Ctrl/Cmd-click semantics; middle-click/context-menu state preparation; reduced-motion and missing-animation fallback; a later switch from free drawing to printing; browser Back cleanup/focus restoration; explicit return links; draft/original/print/chapter state through all five local pages without storage; exhibit precedence; six-chapter navigation/narration; and malformed-fragment recovery.
- **16 storybook/inspiration checks:** all six full stories appear once with evidence and dated sources; no History disclosure rows or generic footer narration; source-dialog opening/closing, modeled Escape/backdrop behavior and return focus; full-story playback/pause/resume/stop; missing voices and stale/error callbacks; changing chapters after paused speech; Follow the words and reduced motion; desktop bookmark keyboard events and phone chapter chooser; six moods with the exact 18 subjects and 90 distinct instructions; bundled SVG/data agreement and five highlighted stages; bird/garden/own migration; all mood and subject selections; unchanged drawing/title/paper/exhibition/undo/redo; independent ideas and cancel/hide/restore focus; guide narration; English-only rendered states; local module order and responsive reference rules; and new text/control color contrast.

All **18 generated SVG references** also parse as XML documents. Functional text/control color pairs checked by the new suite meet at least 4.5:1 contrast against their specified backgrounds; this is not a rendered-page accessibility audit.

Chapter reading lengths, using whitespace-delimited words:

| Chapter | Introduction | Deeper story |
|---|---:|---:|
| Village | 81 | 188 |
| New year | 79 | 190 |
| Materials | 79 | 192 |
| Changing times | 78 | 200 |
| Families | 80 | 189 |
| Safeguarding | 77 | 197 |

The test harnesses run application functions and synthetic events in Node VMs with minimal DOM and Canvas-command stubs. They do not emulate a layout engine, real accessibility tree, audio playback, or a Canvas rasterizer. Navigation tests model relevant page lifecycle events; they are not a browser history integration test. Dialog tests model native close/cancel events and our focus restoration, not the browser's actual focus trap or Escape handling. Responsive checks inspect rules; they do not prove rendered layout.

## Commands

```powershell
node --check app.js
node --check navigation.js
node --check heritage.js
node --check history-reader.js
node --check modern-home.js
node --check free-draw.js
node --check drawing-guide.js
node --check drawing-inspiration.js
node verify.cjs
node verify-drawing.cjs
node verify-gateway.cjs
node verify-storybook.cjs
```

## Browser acceptance checklist

- Open `HomePage.html` through `file://` with networking off. Check all images, scripts, and feature destinations.
- Inspect the homepage at 1440, 1024, 768, and 390 px. Confirm asymmetric desktop spheres, stacked phone spheres, readable labels, and no horizontal page overflow.
- Select each bubble with mouse, touch, and Enter. Inspect expansion, destination, Back-to-studio links, and browser Back. Confirm no stuck overlay, duplicate navigation, or blocked link after return.
- Try Ctrl/Cmd-click, middle-click, and context-menu opening in a new tab. Confirm feature routing and state when browser policies permit.
- Pause/resume motion and enable reduced motion. Confirm all information and destinations remain available, with immediate navigation in reduced-motion mode.
- Review History at desktop, tablet, and phone widths. Confirm numbered bookmarks on desktop, one compact chooser on phones, readable open stories, restrained paper shadows, and no overflow at 200% text zoom.
- Navigate all six chapters with Tab, arrows, Home/End, next/previous, and the in-story chapter link. Use the phone chapter chooser; verify close/Escape, chapter selection, and resulting focus. Confirm active bookmarks stay visible.
- Confirm introduction and deeper story are open and no plain disclosure rows remain on History. Check one Read / Listen / Sources bar; Listen reveals controls and Read hides them. Play/pause/resume/stop, finish a chapter, change a chapter while paused, and try a browser without speech support. Follow the words must return focus to the visible story without duplicate transcript text.
- Open Sources from the chapter bar and footer. Check modal focus containment, source dates, reconstruction notes, scrolling, close button, backdrop, Escape, and focus return. No duplicate page-level narration or research disclosure should appear.
- Check factual dates and their linked sources: uncertain origin; 2012 inventory; April 2024 gallery; 2025 inscription; separate 2026 certificate ceremony. Verify image reconstructions are understood as such.
- Explore all artwork details, zoom/reset, comparison, and printing links.
- Draw with mouse, stylus, and finger. Test pressure, erasing, custom colors, size, paper tones, undo/redo, reversible clear, and drafts.
- With existing marks, title, and paper selected, try every mood and its three subjects. Verify fresh guide steps, all 18 distinct previews, useful five-step instructions, highlighted reference stages, and the small Change inspiration control. References must remain visible on phones.
- Select My own idea, cancel a change, hide/restore the guide, use brush suggestions and read-aloud/stop, and reach the title from step five. Test keyboard focus throughout. Confirm selections do not insert or trace artwork, alter the title/paper, reset undo/redo, or block export. Test old bird/garden/own saved preferences.
- Draw with only the keyboard. Check focus visibility, pen up/down, arrows/Shift, Escape, and undo/redo shortcuts.
- Download a real PNG and inspect composition, proportions, title, paper tone, and authorship. Exhibit the drawing and return to edit it.
- Carry an unfinished draft and an exhibited artwork through History, Art & Symbols, Create, My Gallery, and the homepage. Repeat with local storage blocked. Verify the two records remain distinct.
- Switch to printing, complete a study, and confirm the gallery shows the newly selected print rather than an older original drawing.
- Try 200% zoom, enlarged text, and a screen reader. Confirm landmark order, descriptive bubble names, source links, progress, status messages, and the English document language.

## Remaining limits

- Reference artwork and historical scenes remain original study reconstructions. Print-specific authenticity requires licensed imagery and artisan review.
- Printing masks do not model real ink, drying, pressure, or translucency.
- Long artwork fragments can reach browser URL limits; local storage availability also varies. Downloaded PNGs are the portable output.
- English narration depends on installed browser voices; transcripts are written equivalents, not timed recorded-media subtitles.
- Only the latest original and latest print are retained, with the selected kind shown in the gallery. No multi-artwork collection or server persistence is implied.
- Real browser appearance, touch feel, assistive technology behavior, and exported pixel output remain unverified in this environment.

# Homepage refinement — 6 November 2026

The homepage now retains its four floating destinations with permanent descriptions, larger type, warm paper, restrained sphere highlights, and a locally bundled CC0 museum photograph. A four-stage educational print story follows the navigation. Shared feature-page styles and workshop art data remain unchanged.

Automated total: **68 checks** across `verify.cjs` (14), `verify-drawing.cjs` (13), `verify-gateway.cjs` (13), `verify-storybook.cjs` (16), and `verify-home.cjs` (12). The new checks cover stage selection, manual focus placement, static fallbacks, observer cleanup, pointer-frame cancellation, live motion preferences, paused navigation, generated entry points, local assets, and palette contrast. The existing tests now load the story module so homepage fragment validation includes its real content.

The reference photograph is 1280 × 870 (472,112 bytes); the initial sphere image is 330 × 224 (41,527 bytes). The complete reference is lazy-loaded with reserved dimensions. No runtime network dependency was added. Provenance and transformation notes are in `assets/ARTWORK-CREDITS.md`.

**Not visually signed off:** no browser or native app surface was available. Before release, review both `HomePage.html` and `index.html` at 320, 390, 768, 1024, and 1440 CSS pixels; Aa and 200% zoom; keyboard and touch navigation; visible focus; dynamic reduced-motion changes; paused motion; mobile menu; browser Back; offline loading; blocked storage; and narration. Check caption collisions, horizontal overflow, sticky-story behavior, texture restraint, actual rendered contrast, and the museum image's crop/full-view distinction. Existing screen-reader, speech, drawing pixels, and download checks also remain manual.

The earlier sections below document prior implementation rounds.

