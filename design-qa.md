# Experience Gallery — implementation QA

final result: passed

No actionable P0, P1 or P2 finding remains in the reviewed states. This is acceptance of the approved art direction and the responsive web implementation; it is not a claim of pixel identity to an image-generated mockup or physical-device certification.

## Comparison target and normalization

- Source visual truth: `qa/reference/approved-gallery.png`, the exact user-selected image, **1717 × 916 px**. SHA-256: `7c05a36756745b363426c15c93528e8df98c94a8a902851f59d9d6aec4e77aac`.
- Browser implementation: the existing React/Vite repository served through the Work Mode preview. Actual browser captures, not rendered mockups, are retained in `qa/`.
- Desktop state: Gallery, English, light theme. Browser CSS viewport **1363 × 936**, content width **1348** after the desktop scrollbar, DPR **1**. Main frame: x24/y22, width1300. Capture: `qa/desktop-overview-final.jpg`.
- Mobile states: Experience and Projects, Arabic, light theme, CSS iframe viewport **390 × 844**, content width **375** after the browser's left scrollbar, DPR **1**. Captures: `qa/mobile-experience-final.jpg`, `qa/mobile-projects-final.jpg`. Frame x16/y46; content crop x31/y46, 375 × 844.
- The screenshot transport downsampled some 1363 × 936 captures to **1348 × 926**. Technical comparison copies restore 1363 × 936 before cropping by the observed CSS coordinates. The 320px education capture is already 1363 × 936. No product artwork is reconstructed or edited by the comparison script.
- The source's unframed phone content crops are **272 × 737**, with a taller aspect ratio than the actual browser viewport. Source desktop content is **1074 × 784**. Comparisons use proportional containment, not stretching or a fabricated device frame. Real browser scrollbars and surrounding review canvas are excluded from content comparisons. Exact line breaks and below-fold content cannot be identical across those aspect ratios.
- The reference has English architectural wall signs. These remain part of the artwork. All usable content, links, buttons and labels are native localized HTML; the spatial room arrangement is retained in RTL.

## Combined visual evidence

The source and the revised implementation were opened **together in the same image** for each comparison:

- Full desktop composition: `qa/comparison-desktop.jpg`.
- Full mobile Experience and Projects states: `qa/comparison-mobile.jpg`.
- Focused native header controls, Experience card/action and active room dock: `qa/comparison-details.jpg`.
- Additional actual states: `qa/desktop-overview-ar.jpg`, `qa/mobile-overview-final.jpg`, `qa/mobile-320-education.jpg`, `qa/mobile-430-volunteering.jpg`, `qa/tablet-768-dark-fr.jpg`, `qa/tablet-1024-dark-fr.jpg`.
- User-facing actual-browser montage: `qa/implementation-preview.jpg`.
- Technical cropping/normalization: `qa/prepare-evidence.py` (optional Pillow helper, outside the application build).

## Findings and comparison history

| Priority / finding                             | Earlier evidence and impact                                                                                                   | Fix                                                                                                                                                                                                     | Revised evidence / disposition                                                                                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 — tablet horizontal overflow                | Initial French dark Gallery at 768px measured scroll width812 vs client753; the fourth directory entry exceeded the viewport. | Shrinking grid tracks, safe word wrapping and a two-column directory at tablet widths.                                                                                                                  | `qa/tablet-768-dark-fr.jpg`; scroll/client widths both753. Closed.                                                                                                                              |
| P2 — tablet introduction covered Education     | The narrow overlay placed introduction text over the left room at 768px and 1024px.                                           | At 761–1280px, the native introduction sits above the full, uncropped artwork.                                                                                                                          | `qa/tablet-768-dark-fr.jpg`, `qa/tablet-1024-dark-fr.jpg`; no horizontal overflow. Closed.                                                                                                      |
| P2 — desktop introductory copy lost contrast   | Early text crossed vegetation; an extra Story link extended into that region.                                                 | Subtle pale backing behind body copy; remove the duplicate over-art Story link, retaining navigation destinations.                                                                                      | First `qa/desktop-overview.jpg`; revised `qa/desktop-overview-final.jpg` and combined desktop comparison. Closed.                                                                               |
| P1 — menu navigation lost heading focus        | Closing the destination menu restored its old opener after the route had focused the new heading.                             | Dialog cleanup preserves an already focused destination outside the closing dialog.                                                                                                                     | Native browser menu → Education and integration test: active element `page-title`, dialog closed. Closed.                                                                                       |
| P2 — mobile primary action sat behind dock     | Early Experience content inserted extra details before the main action.                                                       | Shorter responsive hero; focus details after the main action; no redundant experience card metadata.                                                                                                    | Revised Experience at390×844: action top704.09/bottom750.09, dock top771. Main action is visible and independently usable. Closed.                                                              |
| P2 — room copy was compressed                  | Combined first comparison showed 13px mobile body / 12px role subtitle looking smaller than the source.                       | Mobile introductory/body copy14px, subtitle13px, line height1.7; retain30px room headings.                                                                                                              | `qa/iterations/comparison-mobile-before.jpg` versus `qa/comparison-mobile.jpg` and focused card comparison. Primary action remains above dock. Closed.                                          |
| P2 — project cards lacked the source hierarchy | First implementation gave both projects identical full action cards and redundant category labels.                            | Syrian Renewables keeps the primary button; Granular Certificates is a compact, fully linked secondary card; remove mobile category labels.                                                             | `qa/iterations/mobile-projects-before.jpg` versus `qa/mobile-projects-final.jpg`; secondary title now appears above the dock. Full description remains available by ordinary scrolling. Closed. |
| P2 — desktop display type was undersized       | Combined first desktop comparison showed a diminished introductory heading.                                                   | Increase display scale to43px at the reviewed desktop width; widen the copy area. A follow-up capture revealed Education overlap, fixed by moving the intro slightly upward and widening the paragraph. | `qa/iterations/comparison-desktop-before.jpg` versus `qa/comparison-desktop.jpg`; all four room signs/entrances remain clear. Closed.                                                           |

The initial comparison result was blocked while the above visual issues were active. Revised same-route/language/theme captures were inspected after the fixes. Previous combined comparisons and matching captures are preserved under `qa/iterations/`.

## Five required fidelity surfaces

| Surface                   | Assessment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fonts and typography      | Inter for Latin and IBM Plex Sans Arabic for Arabic, locally served at400/600/700. The raster mock does not identify an exact font family; these were selected for its geometric Latin and strong Arabic heading character. Desktop display43px, mobile room heading30px, mobile body14px/1.7. Proper nouns remain LTR. Checked native wrapping, complete room titles and controls; no observed clipping at320/390/430/768/1024 or desktop widths. The generated mock's heavier raster body treatment is an accepted font-rendering difference.                                |
| Spacing and layout rhythm | Sandstone image hierarchy, pale native surfaces, 15–16px card radii, 22px phone content insets and fixed72px dock follow the source. Desktop has a persistent dock as an additional direct route shortcut. Tablet introductory content is separated from the art. The real phone aspect ratio and full original repository copy require more scrolling than the fictional reference; this is explicit and preserves readable content.                                                                                                                                          |
| Colors and tokens         | Dark teal `#0b2b34`, pale paper `#f8faf7`, muted copy `#59666a`, sandstone artwork and gold `#e9ab37` carry the reference palette. Primary light-theme actions use white on teal; metadata uses darker gold ink. Dark theme uses pale text on deep teal and gold actions; reviewed French dark states. Active room is communicated by color, gold marker and `aria-current`.                                                                                                                                                                                                   |
| Image quality and assets  | Five cohesive assets were generated from the exact approved image: overview plus four eye-level rooms. Full overview uses contain fit, with native hotspots aligned to normalized artwork positions; room images use responsive crops. Actual phone requests selected480px WebP art, approximately33–43KB each. No broken images were observed. Original photographs/video posters remain. No CSS/SVG illustration substitutes or rasterized native UI are used; icons come from Phosphor. Generated signs are illustrative; authoritative facts are available as native text. |
| Copy and content          | Existing `src/content/index.js`, `src/storyContent.js` and `src/mediaGallery.js` remain unchanged. Veyt, both live project URLs, Norway Now, Radio Mangfold, Syrian Student Organization,2021/2026 degree content, digital skills, original photo/video captions and contact links remain accessible. Gallery UI is localized in English, Arabic, Norwegian and French; French/Norwegian skill labels and Arabic “present” labels are localized. No implementation instructions or design prompt text appear in product copy.                                                  |

## Real-browser interaction checks

- Gallery entrance → room; primary Continue → next room; direct dock links between all four rooms; overview return.
- Browser Back/Forward, direct hash routes and legacy aliases. Menu navigation closes the native dialog and focuses the destination heading.
- Arabic RTL, English, Norwegian `nb` and French; theme/language persistence; light and dark styles.
- Project links retain their original URLs. Energy data details expand natively. No external contact message was submitted.
- Original photograph modal: open, Next, Escape close, restore opener focus. Video remains an external link to the original source.
- Phone320×667: client/scroll widths305/305; room dock links approximately71.25×72px. Phone390×844:375/375, dock88.75×72px. Phone430×844 and430×932:415/415. Tablet768×844:753/753;1024×844:1009/1009. Desktop:1348/1348. No observed horizontal overflow remains. Mobile theme, language, menu and room entry controls have44px or larger targets.
- Console warnings/errors checked for both tabs. `qa/console-check.json` records **zero application entries**. Browser-extension metadata errors were excluded by their `chrome-extension://` origin; they are not application failures.

## Automated validation

- `npm test`: **11 tests passed**. Covers navigation/history, fast route changes, focus, retained project links, four languages, saved preferences/RTL, photo controls/focus, legacy aliases, restricted storage and reduced-motion camera bypass.
- `npm run build`: passed; Vite production bundle is approximately389KB JavaScript /115KB gzip and26KB CSS /6KB gzip. Responsive images and fonts are separate assets. These are build sizes, not measured real-device performance results.
- `git diff --check`: passed.
- Quality workflow uses Node24 with pinned official checkout/setup-node actions, npm ci, tests and production build. Remote CI result is reported separately on the pull request.

## Accepted differences and residual test gaps

- The mock is an image-generated concept, not a fixed CSS specification. Eye-level room artwork, exact generated foliage, native fonts and copy wrapping differ while preserving the approved spatial direction.
- The persistent desktop dock, room index, visited indicators and full localized repository content add practical orientation to the source. On390×844 Projects, the second project's heading is visible; its complete description is reached by ordinary scrolling. No text is truncated to imitate the mock.
- The browser review uses actual responsive CSS viewports inside a development-only iframe. It does **not** emulate iOS/Android hardware, Safari, OS safe areas, touch inertia, keyboard overlays or hardware performance. Physical-device and text-zoom checks remain follow-up release validation. Reduced motion is covered by integration tests, without claiming an OS preference was changed in the browser.
- P3 follow-up: native font rendering and photographic crop balance may be tuned after physical-device feedback. These do not block the reviewed implementation.

## Implementation checklist

- [x] Approved artwork direction and native editable interface.
- [x] Full and focused combined source/implementation comparisons.
- [x] Closed P1/P2 findings with revised captures.
- [x] Four-room navigation, responsive widths, RTL, preferences, dialogs and content continuity.
- [x] Local tests, production build and diff check.
- [x] Review branch prepared for draft pull request handoff; production release follows review.
