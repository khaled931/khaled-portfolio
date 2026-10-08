# A house for the portfolio

## Locked direction

The user's October 7 screenshot and October 8 realism clarification are the source of truth. Replace the exposed four-room overview, oversized entrance arrows and map toolbar with a complete house. Begin outside the front door and let ordinary scrolling carry the visitor through education, professional experience, projects and community work. Materials, vegetation and lighting should read as natural architectural visualization, with smooth transitions and restrained navigation.

Preserve sandstone, dark teal, oak/brass details, surrounding water, olive trees and the four existing content languages. Preserve existing factual content and direct links. The house is a portfolio metaphor, not a representation of the owner's real home.

Live Refero research was unavailable because the connected account returned `NO_SUBSCRIPTION`. Research instead used the supplied screenshot, the repository's existing approved architectural reference, and Refero's motion and craft guides. This access limitation does not change the user's requested direction.

## Decisions

| Decision                                                             | Source / role                                                    | Reason                                                                        |
| -------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Full facade with a central arched double door                        | User's house / front-door request; existing sandstone vocabulary | Establish a place to enter rather than an aerial diagram                      |
| One connected house with actual openings and furnished rooms         | User's request to walk inside                                    | The camera moves through geometry rather than tilting a photograph            |
| Native scrolling controls the route                                  | User's downward-movement suggestion; motion continuity guidance  | Works with a wheel, keyboard and normal phone swipes                          |
| Education → experience → projects → community                        | User's life / study / work narrative; repository content         | A coherent sequence with an exit terrace                                      |
| A compact chapter rail and direct section directory                  | Craft guide: semantic controls and resilient navigation          | Visitors can move quickly and access every page without the animation         |
| No giant arrows, zoom toolbar or mobile dock on the home route       | Explicit user criticism                                          | Leave architecture visible and avoid a map interface                          |
| Physically consistent architecture in Arabic                         | Existing reference lock; user's multilingual portfolio           | Localize reading direction and labels without mirroring the house             |
| Generated entrance illustration only for loading and static fallback | Bitmap media role; generated source recorded in `assets.json`    | Reduced motion, data saving and unavailable WebGL still have an inviting home |
| Lazy runtime and demand rendering                                    | Craft guide: mobile performance                                  | Stop rendering once movement settles or the scene leaves view                 |
| Photographic plaster and oak PBR surfaces at consistent physical scale | October 8 realism request; Poly Haven source captures | Replace flat surfaces and stretched texture patterns |
| Captured daylight sky, environment reflections, local pendant lights | October 8 natural appearance request | Give stone, timber, brass and water distinct material responses |
| Jointed arch stones, beveled furniture and thin curved olive leaves | October 8 accurate architectural detail request | Remove the sharp primitive / chunky foliage appearance |
| Shortest-arc view rotation while following the physical route | User's smooth 3D transition priority | Avoid abrupt camera spins when facing opposite rooms |

The generated static illustration is not a screenshot of the WebGL model. WebGL uses a locally constructed architectural model; the illustration is a cohesive fallback with the same facade vocabulary. Existing room artwork remains on the native detail pages.

## Visual validation status

Browser visual validation is **blocked**. The available cloud browser could not reach the local server and rejected the local-file URL under its protocol policy. No alternate browser or URL workaround was used after that rejection. The GitHub branch push was also rejected by automatic review, so no remote preview could be produced in this turn.

The independent HTML review artifact contains the code, fonts and images and can be opened locally by the owner. Desktop and phone visual inspection, actual WebGL rendering, the door transition and all four room compositions must be checked on the authorized preview before a production release.

On October 8, automatic review again rejected the public branch push because it considered the latest authorization ambiguous. A local HTTP preview also remained inaccessible to the cloud browser (`ERR_CONNECTION_REFUSED`). Publication has not been retried through another mechanism. Local CPU scene tests exercise geometry construction, real ray intersections along the camera path, both desktop/mobile density choices and resource disposal, but do not certify GPU output or real-device frame rate.
