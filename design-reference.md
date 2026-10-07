# Experience Gallery — reference lock

The user approved `image-edit-target-d0ba055bd6bfeb2b.png` (1717 × 916), with a desktop architectural gallery and two Arabic mobile room states. This implementation uses that exact image as the generation/edit reference. The existing React/Vite repository, four languages, professional content, contact URLs and original photography remain the content sources.

| Surface           | Reference decision                                                                  | Implementation                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Main exhibition   | Four connected sandstone rooms; teal walls; illuminated gold paths; water and trees | Generated overview art, native entrance links aligned to the art                 |
| Room view         | Eye-level architecture on the two mobile screens                                    | Cohesive individual experience, projects, volunteering and education art         |
| Header            | White surface, compact navigation, bilingual identity, theme, language, contact     | Responsive semantic navigation with a mobile menu                                |
| Room content      | Dark teal headings, light information panels, solid teal actions                    | Editable localized HTML, preserving the repository's factual content             |
| Mobile navigation | Four persistent room icons with a gold active marker                                | Safe-area-aware navigation dock, 44px+ targets, explicit overview return         |
| Motion            | Enter a room, explore, change rooms without losing orientation                      | Short interruptible camera/fade transitions; no mandatory gesture or motion      |
| Typography        | Contemporary sans-serif; bold Arabic headings                                       | Locally hosted Inter and IBM Plex Sans Arabic                                    |
| Accessibility     | Clear labels, direct section access                                                 | Keyboard links, focus management, native dialogs/details, reduced-motion support |

## Asset catalog

- Overview: 1536 × 1024 source artwork; full gallery; upper corners reserved for native introduction.
- Experience: room-facing Veyt architecture; responsive hero image.
- Projects: room-facing Syrian Renewables architecture; responsive hero image.
- Volunteering: Norway Now and the community sculpture; responsive hero image.
- Education: NTNU / University of Oslo study plaques; responsive hero image.

Architectural signs are part of the generated images. Header text, introductory text, navigation buttons, content, labels and actions are native UI. The source screenshot itself is never used as the application background.

## Decision ledger

- Use the approved gallery as the dominant visual direction; do not introduce a new design concept.
- Provide direct links and browser history alongside the spatial experience, because every visitor must be able to find information quickly on a phone.
- Preserve all four content languages and the existing photography/video/digital skills through additional clearly named destinations.
- Keep the overview's physical room arrangement fixed in RTL; localize the controls and reading order without mirroring the architecture.
- Use optimized responsive raster art and CSS transforms rather than adding a WebGL runtime to a content portfolio.
- Keep production deployment separate from this review branch. Validate real browser states before the pull request handoff.
