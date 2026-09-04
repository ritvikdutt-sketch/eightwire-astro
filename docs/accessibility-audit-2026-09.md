# Eightwire — WCAG 2.1 Level AA audit

**Site:** https://ritvikdutt-sketch.github.io/eightwire-astro/
**Standard:** [WCAG 2.1](https://www.w3.org/TR/WCAG21/), target **Level AA** (Level A and AA are must-fix; AAA reported for information)
**Audited:** 4 September 2026 · **Re-tested after fixes:** 4 September 2026
**Scope:** all 91 public pages — 9 marketing pages, the knowledge-base index, 79 knowledge-base articles — plus the 4 retired-route redirect pages.

## Result

| | Before | After |
|---|---|---|
| Confirmed Level A failures | 6 | **0** |
| Confirmed Level AA failures | 9 | **0** |
| axe-core A/AA violations (91 pages) | 14 nodes | **0** |
| AAA gaps (reported, not required) | 3 | 1 |

The site now meets WCAG 2.1 Level AA on every audited page. Two of the three AAA items were fixed anyway because they were inexpensive; the remaining one (7:1 enhanced contrast) is documented below as a deliberate exception.

## Method

Two independent passes, because neither alone is sufficient:

1. **Automated.** `npm run audit:a11y` (`scripts/audit-a11y.mjs`) serves the built site and runs [axe-core](https://github.com/dequelabs/axe-core) 4.13 with the `wcag2a`, `wcag2aa`, `wcag21a` and `wcag21aa` rule sets against all 91 pages. Results are written to `reports/a11y/axe-<date>.json` and `.md`. This catches machine-checkable failures only — roughly a third of the criteria.
2. **Manual, evidence-based.** Five review passes driven by scripted browser inspection: colour contrast (every visible text node alpha-blended onto its real painted backdrop, plus UI-component boundaries), structure and semantics (heading outlines, landmarks, names/roles/values, alt text, page titles, language), keyboard and focus (full tab walks including the Radix menus, mobile drawer, FAQ disclosures, knowledge-base search and the connector sphere), motion and adaptation (inventory of every indefinite animation, 320 px reflow, 200 % zoom, WCAG text-spacing overrides), and consistency (navigation, identification, redirects).

Every candidate finding was then **independently re-measured by a second reviewer** before being accepted, and rejected if the evidence did not reproduce or the criterion did not actually apply. Of 50 candidates, **18 were confirmed and 32 were dismissed** — the dismissals are summarised at the end so the reasoning is not lost.

## Findings and remediation

All fixed. Severity is user impact, not criterion level.

| # | Criterion | Level | Where it was | What was wrong | What changed |
|---|---|---|---|---|---|
| 1 | 1.1.1 Non-text Content (+1.4.5 Images of Text) | A / AA | 304 screenshots across 71 knowledge-base articles | Every image carried the identical alt text "Screenshot" — the only alt string in the entire collection. Worse, ~13 images were pure tables of text and were the article's whole content: `functions.md` had 8 headings, 8 images and no prose, so a non-visual reader received nothing. | Alt text is now generated per image. Where a description was written from the image itself, it names the screen and the control the step points at. Elsewhere it is derived from the nearest heading and step number. The 13 images of tables were **transcribed into real Markdown tables and the images removed**, so the content is now selectable, searchable and reflowable. A build guard blocks the placeholder from returning. |
| 2 | 2.1.1 Keyboard · 4.1.2 Name, Role, Value | A | Connector sphere (`/connectors/`) | All 34 tiles were `tabindex="-1"` inside a `role="application"` container with no key handlers, so the sphere, the detail card and its "Talk to us about…" link could not be reached without a mouse. The role also told assistive technology to forward every keystroke to a widget that handled none. | `role="application"` removed. The sphere is now a single tab stop with a roving tabindex: arrow keys move between connectors (turning the sphere to face each one), Enter opens a connector, focus moves into the detail card and returns to the tile on Escape or close. The card is a labelled live region. |
| 3 | 2.2.2 Pause, Stop, Hide | A | Home hero (25 looping animations), sector marquee, connector sphere idle rotation, contact wire, pulse dots | Motion started automatically, ran indefinitely beside other content, and there was no way to stop it. A reduced-motion browser setting is a preference, not the on-page mechanism this criterion requires. | A site-wide **Pause motion** control in the footer and the mobile menu. It stops every animation on the site, remembers the choice between pages and visits, and reports its state to assistive technology. The browser's reduced-motion preference still wins by default. |
| 4 | 1.4.3 Contrast (Minimum) | AA | Footer headings and bottom row, statistics and marquee labels, hero caption, sphere hint, footer "PDF" badge, knowledge-base topic counts | The muted text on dark surfaces measured 3.0–3.6:1 at 10.5–13 px, against the 4.5:1 required. The topic count was 2.2:1. | The muted step on dark surfaces was lifted to 5.75:1; the topic count now uses the body colour (11.8:1). |
| 5 | 1.4.3 Contrast (Minimum) | AA | Mono section labels on cream and tinted sections, six pages | The label colour passed on pure cream (4.56:1) but every real placement sits on a slightly darker or gradient-tinted surface, where it fell to 4.12–4.49:1. | The muted ink token was darkened once, in the design tokens, to clear 4.5:1 on every surface it is actually used on. |
| 6 | 1.4.11 Non-text Contrast | AA | Outline buttons on dark surfaces, sphere filter chips, contact subject chips | These controls have no fill, so their 1 px border is the only thing identifying them as controls — and it measured 1.7–2.2:1 against the background, below the 3:1 required. | Borders raised to 3.4–3.6:1, with a stronger hover state retained. |
| 7 | 1.4.4 Resize Text · 1.4.12 Text Spacing | AA | Connector catalogue tiles | At 200 % zoom, 33 of 68 connector names and categories were clipped with an ellipsis and the full text was available nowhere else. Applying the required text-spacing overrides clipped more. | Labels now wrap instead of truncating. At 200 % zoom and with text-spacing applied, **0 labels clip** and there is no horizontal scrolling. |
| 8 | 3.1.1 Language of Page | A | The four retired-route redirect pages | Auto-generated redirect stubs had no `<html>` element at all, so no language was set for the fallback text. | Replaced with real pages that declare `lang="en"`, keep the instant redirect and the fallback link, and stay out of the sitemap. |
| 9 | 2.4.9 Link Purpose (Link Only) | AAA | About page | Six links all named "LinkedIn" pointed at six different profiles. | Resolved — the team section was removed from the About page at the business's request. |
| 10 | 2.3.3 Animation from Interactions | AAA | Shared button, card and arrow styles | Hover and press animations still played for visitors who had asked for reduced motion. | The shared style recipes now suppress those transforms under reduced motion. |
| 11 | 1.4.6 Contrast (Enhanced) | AAA | Muted text throughout | Passes AA but not the 7:1 AAA threshold. | **Not changed.** Meeting 7:1 would flatten the distinction between body text and secondary labels across the whole design. Documented as a deliberate exception; AA is met everywhere. |

Also improved while in the area, though none was a normative failure: the skip link now moves focus (not just reading position) to the main region; keyboard users can close a navigation dropdown with Enter or Space, not only Escape; the knowledge-base topic count is announced as "N articles"; wide tables in articles are keyboard-scrollable with an accessible name.

## Criteria verified as passing

Checked and confirmed, not merely unflagged:

**Perceivable** — 1.1.1 (after fix), 1.3.1 Info and Relationships (heading outline on all 91 pages: one `h1`, no skipped levels), 1.3.2 Meaningful Sequence, 1.3.4 Orientation, 1.3.5 Identify Input Purpose, 1.4.1 Use of Color, 1.4.3 (after fix), 1.4.4 (after fix), 1.4.5, 1.4.10 Reflow (no horizontal scrolling at 320 px on any page), 1.4.11 (after fix), 1.4.12 (after fix), 1.4.13 Content on Hover or Focus (menus are dismissible, hoverable and persistent).

**Operable** — 2.1.1 (after fix), 2.1.2 No Keyboard Trap (focus always returns from menus and the drawer), 2.1.4 Character Key Shortcuts (none), 2.2.1 Timing Adjustable (redirects are instant), 2.2.2 (after fix), 2.3.1 Three Flashes (slowest animation cycle is 0.36 Hz, far below the 3 Hz threshold), 2.4.1 Bypass Blocks, 2.4.2 Page Titled (all unique and descriptive), 2.4.3 Focus Order, 2.4.4 Link Purpose (In Context), 2.4.5 Multiple Ways, 2.4.6 Headings and Labels, 2.4.7 Focus Visible (every focusable element paints a visible indicator), 2.5.1–2.5.4.

**Understandable** — 3.1.1, 3.1.2 Language of Parts, 3.2.1 On Focus, 3.2.2 On Input, 3.2.3 Consistent Navigation (identical order on all pages), 3.2.4 Consistent Identification, 3.3.1 Error Identification, 3.3.2 Labels or Instructions.

**Robust** — 4.1.2 (after fix), 4.1.3 Status Messages (search results are announced).

## Candidates examined and dismissed

32 further candidates were raised and rejected after re-measurement. The most substantive:

- **Search field and topic chips said to fail 1.4.11.** Their borders are low-contrast, but each control has a fill that distinguishes it from the page, so the border is not the sole identifier the criterion protects.
- **Dimmed sphere tiles said to fail 1.4.3.** Filtered-out tiles fade to 8 % opacity, but they are decorative duplicates of the catalogue below and are not the accessible content.
- **Footer headings said to fail 1.3.1** for using `h4` without an `h3`. Heading level within a labelled navigation landmark does not break the document outline.
- **Contact subject presets said to fail 3.2.1/3.2.2** because focus changes the prefilled subject. No context change occurs: the destination is the same address and the change is announced.
- **Navigation "you are here" said to fail 2.4.8 and 4.1.2.** `aria-current` is present and correct on the relevant links.
- **Whitepaper "PDF" markers said to fail 2.4.4/1.3.5** for being decorative. The link text and a screen-reader-only note already convey the file type and new-tab behaviour.
- Several further items were valid design or information-architecture suggestions but not failures of any normative criterion at Level A or AA.

## Re-testing

```bash
npm run build        # also regenerates the Markdown twins and runs the content guard
npm run audit:a11y   # axe-core over all 91 pages; exits non-zero on any A/AA violation
```

The last run (`reports/a11y/axe-2026-09-04.md`) reports **0 failing rules across 91 pages**. Manual re-verification confirmed: 0 contrast failures across 10 representative pages; the connector sphere fully keyboard-operable; the motion control pausing all animation and persisting across pages; 0 clipped labels at 200 % zoom and with text-spacing applied; the skip link moving focus; all four redirect pages declaring a language.

## Open items for the business

1. **Whitepaper PDFs are out of scope and unchanged.** The security and technical whitepapers were left exactly as they are, by instruction. PDFs carry their own WCAG obligations (tagged structure, reading order, document language) that have not been assessed. Worth a separate review before they are cited in a procurement response.
2. **Knowledge-base alt text is partially machine-written.** 137 images across 39 articles have descriptions written from the images themselves. The remaining ~150 use text derived from the nearest heading and step — accurate but generic. Worth a human pass, prioritising articles where the screenshot carries information the prose does not.
3. **Transcribed tables should be spot-checked.** 13 images of tables were transcribed into Markdown. They were verified against the source images, but two spot-checks against the live product would be prudent before relying on them.
4. **AAA enhanced contrast is not met** and is not planned. Say so explicitly if a procurement question asks for AAA.
