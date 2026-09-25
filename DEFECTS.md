# Defects

Bugs found during the test run against `https://demoqa.com`.

**Severity** — how badly the bug breaks the software (technical).  
**Priority** — how urgently it should be fixed (business, accounts for demoqa not being under our control).

---

## Summary table

- [ISSUE-001](#issue-001) — Practice Form: modal renders empty rows for unfilled optional fields — Sev: High, Pri: Medium — screenshots, video
- [ISSUE-002](#issue-002) — Text Box: whitespace-only Full Name accepted, renders blank in output — Sev: Medium, Pri: Low — screenshot, video
- [ISSUE-003](#issue-003) — Select Menu: multi-select input unreachable via expected selector — Sev: Medium, Pri: High — screenshot, video
- [ISSUE-004](#issue-004) — A11y: site banner image missing alt text (`image-alt`) — Sev: High, Pri: Medium — automated scan
- [ISSUE-005](#issue-005) — A11y: form controls lack programmatic labels (`label`) — Sev: High, Pri: Medium — automated scan
- [ISSUE-006](#issue-006) — A11y: site header anchor link has no accessible name (`link-name`) — Sev: Medium, Pri: Low — automated scan
- [ISSUE-007](#issue-007) — A11y: Web Tables search button and nav toggle unnamed (`button-name`) — Sev: High, Pri: Medium — automated scan
- [ISSUE-008](#issue-008) — A11y: select elements lack accessible labels (`select-name`) — Sev: High, Pri: Medium — automated scan
- [ISSUE-009](#issue-009) — A11y: confirmation modal and table cells fail contrast ratio (`color-contrast`) — Sev: Medium, Pri: Low — automated scan

---

## ISSUE-001

**Practice Form: confirmation modal renders empty rows for unfilled optional fields**

- **Area** — Forms / Practice Form
- **URL** — https://demoqa.com/automation-practice-form
- **Tests broken** — 6 / 8 · **Status** — Open
- **Severity: High** — breaks the core contract of the confirmation modal; 6 of 8 form tests fail
- **Priority: Medium** — broad breakage across the primary submission flow; demoqa not under our control

**Evidence**

- `evidence/screenshots/practice-form/` (6 screenshots)
- `evidence/videos/practice-form.mp4`

---

## ISSUE-002

**Text Box: whitespace-only Full Name accepted, renders blank in output panel**

- **Area** — Elements / Text Box
- **URL** — https://demoqa.com/text-box
- **Tests broken** — 1 / 5 · **Status** — Open
- **Severity: Medium** — missing input validation; does not crash or block core functionality
- **Priority: Low** — isolated failure, low-stakes page, not actionable on our side

**Evidence**

- `evidence/screenshots/text-box/01-whitespace-name-renders-empty-failed.png`
- `evidence/videos/text-box.mp4`

---

## ISSUE-003

**Select Menu: multi-select dropdown input unreachable via expected selector**

- **Area** — Widgets / Select Menu
- **URL** — https://demoqa.com/select-menu
- **Tests broken** — 1 / 5 · **Status** — Open
- **Severity: Medium** — widget renders but cannot be interacted with programmatically
- **Priority: High** — selector fix is entirely within our control; zero coverage until resolved

**Evidence**

- `evidence/screenshots/select-menu/01-multi-select-input-not-found-failed.png`
- `evidence/videos/select-menu.mp4`

---

## ISSUE-004

**A11y: site banner image missing alt text (`image-alt`, WCAG 2.0 A — 1.1.1)**

- **Area** — Accessibility / Site-wide · **axe impact** — critical
- **Tests broken** — 8 / 8 · **Status** — Open
- **Severity: High** — WCAG Level A; screen readers announce the image by filename on every page
- **Priority: Medium** — trivial fix (one `alt` attribute) but demoqa is not under our control

---

## ISSUE-005

**A11y: form controls lack programmatic labels (`label`, WCAG 2.0 A — 1.3.1, 4.1.2)**

- **Area** — Accessibility / Forms · **axe impact** — critical
- **URL** — `/text-box`, `/automation-practice-form`, `/select-menu`
- **Tests broken** — 4 / 8 · **Status** — Open
- **Severity: High** — WCAG Level A; inputs are functionally unusable for screen reader users
- **Priority: Medium** — recurring pattern across three pages; low-effort fix for demoqa owner

---

## ISSUE-006

**A11y: site header anchor link has no accessible name (`link-name`, WCAG 2.0 A — 4.1.2, 2.4.4)**

- **Area** — Accessibility / Site-wide · **axe impact** — serious
- **Tests broken** — 8 / 8 · **Status** — Open
- **Severity: Medium** — WCAG Level A; link is in header chrome, not in a primary interaction flow
- **Priority: Low** — not actionable from our side; no test coverage depends on site navigation

---

## ISSUE-007

**A11y: Web Tables search button and mobile nav toggle unnamed (`button-name`, WCAG 2.0 A — 4.1.2)**

- **Area** — Accessibility / Web Tables · **axe impact** — critical
- **URL** — https://demoqa.com/webtables
- **Tests broken** — 2 / 8 · **Status** — Open
- **Severity: High** — WCAG Level A; search button is the primary interaction control on the page
- **Priority: Medium** — key control for screen reader users; not actionable from our side

---

## ISSUE-008

**A11y: select elements lack accessible labels (`select-name`, WCAG 2.0 A — 4.1.2, 1.3.1)**

- **Area** — Accessibility / Web Tables, Select Menu · **axe impact** — critical
- **URL** — https://demoqa.com/webtables, https://demoqa.com/select-menu
- **Tests broken** — 3 / 8 · **Status** — Open
- **Severity: High** — WCAG Level A; screen reader users cannot determine what they are selecting
- **Priority: Medium** — pattern across two pages; trivial fix (`<label>`) not actionable from our side

---

## ISSUE-009

**A11y: confirmation modal and table cells fail minimum contrast ratio (`color-contrast`, WCAG 2.0 AA — 1.4.3)**

- **Area** — Accessibility / Practice Form, Web Tables · **axe impact** — serious
- **URL** — https://demoqa.com/automation-practice-form
- **Tests broken** — 1 / 8 · **Status** — Open
- **Severity: Medium** — WCAG Level AA; text is still visible but degraded for low-vision users
- **Priority: Low** — contained to one post-submission state; CSS-only fix requires demoqa owner
