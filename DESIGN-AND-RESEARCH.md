# Dong Ho — design and research record

## The experience

The homepage is a gateway with four destinations: **History**, **Art & Symbols**, **Create**, and **My Gallery**. Visitors can enter through context, visual exploration, or hands-on creation. The progression is discover → understand → make → reflect, while navigation permits any order.

The user-selected [Angelo reference](https://angelo.so/) informed the airy composition, material depth, translucent navigation, and floating spheres. Its [One Page Love overview](https://onepagelove.com/angelo) documents those characteristics. The implementation uses original illustrations and locally rendered CSS/SVG layers rather than reference-site assets or code.

The current homepage headline is “A living tradition. Your way in.” The welcome invites visitors to discover Dong Ho's stories, symbols, and craft, then create their own response. The repeated marketing-card section and painting-preview bubbles have been replaced by real feature links.

## Audience and language

The supplied personas remain a university student with little heritage knowledge and an international visitor interested in craft. The final language preference is English-only for the interface, artwork titles, narration, history, instructions, and drawing guide. The studio name uses the romanized Dong Ho spelling.

| User need | Response |
|---|---|
| Understand what the site offers quickly | Four permanent feature labels, short descriptions, and a concise introduction |
| Explore at a comfortable pace | Numbered artwork details, six open stories, desktop bookmarks, and a compact phone chapter chooser |
| Find a drawing idea without choosing a template | Six self-selected moods leading to 18 contemporary examples; paper always stays blank |
| Learn by doing | A blank drawing canvas with optional guidance, plus a separate printing lesson |
| Understand an unfamiliar craft | Material explanations, documented history, qualified interpretations, and visible source records |
| Recover from mistakes | Undo/redo, reversible clearing, registration feedback, and printing error prevention |
| Keep a personal result | Titles, optional authorship, draft saving, PNG output, and an editable local exhibition |
| Use different input/access methods | Real links, keyboard drawing, button alternatives to dragging, transcripts, enlarged text, and reduced motion |

These are design responses to the supplied personas, not findings from completed interviews. No invented usability outcomes, participant quotes, or satisfaction scores are presented.

## Information architecture

| Bubble | Page | Main activities |
|---|---|---|
| History | Existing history destination | Six open illustrated stories; one Read / Listen / Sources bar; source notes in a modal panel |
| Art & Symbols | Existing exploration destination | Three study paintings, numbered details, zoom/reset, comparison, narration |
| Create | Existing workshop destination | Blank free drawing; optional mood picker with 18 five-step lessons or an independent idea; selectable printing lesson |
| My Gallery | Existing exhibition destination | Latest selected artwork, PNG download, editing or another print, process reflection and quiz |

The homepage remains a fifth page. Every feature has an explicit Back-to-studio link. Bubble descriptions appear on hover/focus on desktop and are visible in the stacked phone layout. Keyboard and native link behavior remain available.

## Visual identity and motion

The scene uses quiet ivory and dark, readable text. Coral, lavender, jade, and gold are concentrated in the spheres, with softer related colors in the functional guide and illustrations. The homepage uses clean local sans-serif type; chapter titles and reflective prompts use restrained serif styling. No remote font is required.

Sphere depth comes from layered gradients, curved highlights, translucent rims, material illustrations, inset shading, and soft projected shadows. The desktop arrangement is asymmetric, the tablet arrangement has two levels, and the phone arrangement becomes a vertical sequence. The spheres remain legible navigation objects rather than unlabeled decorative buttons.

Pointer movement is restrained. Floating motion has an immediately accessible pause control near the introduction. Reduced-motion preferences stop ambient movement, expose descriptions, and navigate without expansion. A normal bubble selection starts a short color expansion and navigates after approximately 340 ms. Ordinary, modified, middle, and context-menu link actions use the same state handoff without forcing the expansion.

Transient overlays and delayed navigation are cleared on page lifecycle events. Browser Back restores a usable scene and the selected feature's focus. This behavior is covered by simulated lifecycle checks; visual browser history testing remains outstanding.

## Historical content and evidence

All six chapters have an introduction of 70–90 words and a deeper story of 160–220 words. The implemented chapters contain 77–81 introduction words and 188–200 deeper-story words. Both are displayed openly: the presentation revision preserves every historical paragraph and citation. Each has an illustration caption, evidence label, reflection, full narration text, and publisher/date source records.

History uses a quiet storybook composition with numbered bookmarks, readable paper surfaces, and a compact phone chapter chooser. One Read / Listen / Sources bar replaces separate disclosure rows. Listening reveals playback controls; the visible story serves as its transcript. A native modal dialog contains chapter references, source dates, and reconstruction distinctions, with an explicit close button and focus restoration. Generic footer narration and research disclosures are suppressed on this page.

| Chapter | Historical or cultural focus | Main references |
|---|---|---|
| A village becomes a printing tradition | Community practice, gradual development, uncertainty around a precise founding date | Tu Thi Loan research; Vietnam Government News |
| Pictures for a new year | Household and festival settings, familiar subjects, variable symbolic interpretations | Vietnam Pictorial; reported VOV interviews |
| Paper, shells, plants, and carved wood | Paper coating, material preparation, blocks, and successive impressions | ICHCAP 2015 field survey; Vietnam Pictorial; government craft account |
| A craft through changing times | War disruption, revival/cooperative production, market changes, and continuity of knowledge | Tu Thi Loan research; Nhan Dan preservation reporting |
| Families carrying the blocks forward | Named artisan families and the April 2024 private gallery event | VNA gallery report; Nhan Dan reports |
| Recognition—and the work ahead | 2012 inventory, 2025 urgent-safeguarding inscription, separate certificate ceremony and continuing responsibility | UNESCO decision; government report; Bac Ninh provincial portal |

The exact founding year is not supplied as a fact. Chapter one explains the distinction between the broader history of woodblock printing and the development of the village's recognizable tradition. Older practitioner counts are not repeated as a present-day census or conflated across households and lineages.

Observation and interpretation are kept distinct in the artwork descriptions. For example, visible animals and their arrangement can be described directly; prosperity, family well-being, or social criticism are presented as common readings rather than proven events depicted in the picture.

The 2025 UNESCO designation is the **List of Intangible Cultural Heritage in Need of Urgent Safeguarding**. The website distinguishes it from a World Heritage Site designation and from the later certificate ceremony. It presents recognition as a reason for continued attention to practice, not proof that safeguarding challenges have ended.

### Reference register

Research checked 5 November 2026. The implemented chapter/source data links these records directly from the relevant content.

- [Tu Thi Loan — Dong Ho Folk Painting and Protection of Handicraft in the Context of Modernization](https://chss.nuk.edu.tw/var/file/41/1041/img/981/886004955.pdf): institutional research hosted by a university; historical development and changing production context.
- [Vietnam Pictorial — Dong Ho paintings reveal Vietnamese unique folk culture](https://vietnam.vnanet.vn/english/print/dong-ho-paintings-reveal-vietnamese-unique-folk-culture-213147.html), 17 October 2019: material practice, household context, and reported artisan work.
- [VOV — Dong Ho folk paintings, national cultural heritage](https://vovworld.vn/culture/dong-ho-folk-paintings-national-cultural-heritage-1120332.vov5): reported interviews and varying symbolic readings.
- [ICHCAP — Vietnam field survey](https://archive.unesco-ichcap.org/eng/ek/sub1/pdf_file/south_east_asia/2015Vietnam/Field%20Survey%20Report_Vietnam_full.pdf), 2015: Dong Ho material/process entry. ICHCAP is a UNESCO Category 2 Centre; this report is separate from the Committee's inscription decision.
- [VNA — First private gallery inaugurated in Bac Ninh](https://vnanet.vn/en/anh/vna-photos-1027/first-private-gallery-of-dong-ho-folk-paintings-inaugurated-in-bac-ninh-7329892.html), 19 April 2024: a dated gallery event associated with Nguyen Dang Che.
- [Nhan Dan — Dong Ho needs preservation and promotion](https://en.nhandan.vn/vietnamese-traditional-folk-painting-genre-dong-ho-needs-preservation-and-promotion-post135690.html), 18 May 2024: family preservation and exhibition reporting.
- [Nhan Dan — Reviving the Dong Ho folk painting craft](https://en.nhandan.vn/reviving-the-dong-ho-folk-painting-craft-post84961.html): historical preservation reporting, not a current practitioner census.
- [UNESCO decision 20.COM 7.A.1](https://ich.unesco.org/en/decisions/20.COM/7.A.1), 2025: the inscription, inventory dates, transmission, risks, and safeguarding framework.
- [Vietnam Government News — Dong Ho inscription](https://baochinhphu.vn/nghe-lam-tranh-dan-gian-dong-ho-tro-thanh-di-san-thu-17-cua-viet-nam-duoc-unesco-ghi-danh-1022512091722362.htm), 9 December 2025: dated inscription and craft account.
- [Bac Ninh provincial portal — receiving the certificate](https://www.bacninh.gov.vn/web/english/news/-/details/1090513/bac-ninh-province-receives-unesco-certificate-and-opens-coming-back-to-heritage-region-of-bac-ninh-2026-festival-97999444): ceremony held 27 March 2026, separate from the 2025 inscription.

### Illustrations and simulation

The village scene, block arrangements, framed studies, and example paintings are original vector teaching illustrations. Captions identify them as reconstructions. No new scans, source photographs, or official emblems were downloaded or reproduced in this revision.

The printing lesson uses digital color masks, not verified historical block sets for the featured studies. It demonstrates a published general order and a final black-line pass, with a disclosed green-toned substitute for the blue reference stage. It does not recreate material chemistry, drying, pressure, or physical registration. Print-specific historical fidelity requires reviewed reference blocks and artisan consultation.

Visitor drawings are personal contemporary creations inspired by the tradition. The optional guide is scripted instructional content, not a live artisan, art-analysis service, or claim to certify traditional authenticity.

### Drawing inspiration by mood

Six moods each lead to three original examples, for 18 locally bundled SVG references and 90 subject-specific instructions. The collection ranges from birds, fish, gardens, and a pig to a rainy window, moonlit scenes, a banyan tree, and abstract shapes. These are contemporary studies; their subjects and emotional associations are not claimed as documented historical Dong Ho symbolism.

The visitor chooses a mood as an inspiration filter. It neither infers their emotion nor restricts the drawing. The progressive picker offers six moods, three ideas, then one visible reference with the current stage emphasized. An independent My own idea path stays available. Choosing or changing inspiration updates guide preferences only, preserving marks, paper, title, exhibited work, and undo/redo. Existing bird/garden preferences migrate to Garden Bird/Blooming Garden; own ideas stay independent.

## Interaction principles

| Behavior | User value and HCI rationale |
|---|---|
| Four labeled bubbles | Recognition rather than recall; clear affordance before interacting |
| Direct destinations and return links | User control and freedom; predictable navigation |
| Numbered chapters with visible current state | Visibility of system status and manageable cognitive load |
| Open introduction and deeper story | Reading flows without repetitive disclosure controls |
| Read / Listen / Sources | One predictable place for alternate reading access and evidence |
| Mood → three ideas → five steps | Progressive inspiration without filling or tracing the visitor's canvas |
| Separate evidence, interpretations, and reconstruction notes | Supports informed understanding of cultural content |
| Narration plus full written equivalents | Alternate access without making sound a requirement |
| Matched artwork hotspots and text controls | Discovery plus keyboard access to the same explanations |
| Blank canvas plus optional guide | Independent creativity with assistance when requested |
| Reversible drawing and printing actions | Safe exploration and recovery from errors |
| Printing validation and alignment alternative | Error prevention without making motor precision a gate |
| PNG and local exhibition | Closure, personal ownership, and continued reflection |

## Navigation and compatibility

The prototype remains buildless HTML/CSS/JavaScript and opens from `HomePage.html`. Existing page filenames and drawing records are retained. One navigation helper builds relative destinations with small studio metadata and separate drawing/draft fragments. It serves ordinary links and animated feature links, preserving printing, drawing, gallery selection, and chapter position across separate local files.

The latest original and latest print remain distinct records. Incoming metadata determines the selected gallery kind so an older drawing cannot override a newly completed print. The handoff validates drawings through the existing stroke schema. Malformed records fall back to stored or blank state rather than becoming markup.

Fragments do not make server requests, but can be long and can contain artwork and optional authorship. Detailed drawings can reach browser URL or storage limits. A PNG is the portable output. No account, server persistence, new hosting, or external runtime dependency is added.

## Validation and next evaluation

The implementation has 55 passing dependency-free checks, covering content lengths/sources, English-only states, printing and drawing behavior, all 18 examples and 90 specific instructions, legacy guide preferences, reading controls, source-panel focus restoration, contrast, shared handoff, native link variants, expansion fallback, and simulated Back cleanup. All 18 reference SVGs parse as XML. `QA.md` separates automated checks from browser acceptance work.

No browser surface was available in this session. Real layout/reflow, touch feel, accessibility-tree behavior, speech output, and exported pixels still require browser review. No WCAG certification, exact visual match, artisan endorsement, or completed user-study result is claimed.

For formative university testing, ask participants from the supplied personas to identify the four features, find a sourced historical milestone, distinguish a fact from an interpretation, complete an original drawing, recover a mistake, exhibit it, and return through the homepage without losing work. Include keyboard-only and enlarged-text use. Record completion, confusion, help requests, and whether reconstruction labels are understood. Prioritize navigation, source comprehension, and creation access before adding more features.

# Homepage refinement — 6 November 2026

This revision preserves the four-sphere composition, headline, and existing routes. Homepage-only CSS increases text sizes and contrast, introduces warm paper and pigment-inspired colors, softens gloss, and uses grid placement with in-flow captions. Descriptions are visible without hovering. Small decorative pearls are suppressed; the four navigation spheres remain.

The Art & Symbols sphere now shows a cropped detail of Daderot's CC0 museum photograph of **Mouse Wedding**. The complete photograph accompanies the final printing-story passage. It is not recolored. The other sphere objects and the animated study remain contemporary teaching illustrations; the locally drawn paper-fiber texture is suggestive, not archival. Full attribution and source records are in `assets/ARTWORK-CREDITS.md`.

Four passages explain paper preparation, an initial red impression, successive color blocks, and final black contours. The illustration separates every pigment fill from black contours, independently of the existing workshop studies. Desktop scrolling selects stages without stealing focus or intercepting scrolling; manual stage selection moves focus to the corresponding passage. Mobile, short viewports, reduced motion, Pause motion, and unavailable IntersectionObserver use static illustrations. Motion preferences react live, and listeners/observers are disposed before Aa rerenders.

The interface remains English, with dó used as a material name. The earlier blanket statements that all imagery is reconstructed or that descriptions require hovering are superseded by this revision. No framework, storage migration, new route, or hosting change was introduced. Automated coverage now totals 68 checks; no browser surface was available for visual acceptance.

The sections below retain the earlier design and research record.

