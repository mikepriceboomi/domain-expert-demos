# Data Management 101 — demo frames

Eight authored 1280x720 frames used as divider and bookend steps in the
Data Management 101 clickable demo.

| File | Role |
|---|---|
| `00-title.html` | Title |
| `01-problem.html` | Chapter 01 — The problem |
| `02-one-record.html` | Chapter 02 — One record, everywhere |
| `03-clean.html` | Chapter 03 — When the data isn't clean |
| `04-definition.html` | Chapter 04 — One agreed definition |
| `05-warehouse.html` | Chapter 05 — Into the warehouse |
| `99-close.html` | Close |
| `99b-thankyou.html` | Thank you |

Each frame is a fixed 1280x720 artboard that scales to fit its window, so it
renders identically opened directly, embedded in an iframe, or screenshotted
for a Navattic step.

Shared artwork lives in `assets/` and is referenced relatively, so the folder
must stay together. Typeface is Poppins, from Google Fonts.

## `99b-thankyou.html` — two separate traps

**1. The hidden kicker and lede are load-bearing.** They are deliberately
`visibility:hidden` rather than removed, so they hold their space and the
product rail lands on the same pixel row as `99-close.html` — that is what
lets the two cross-dissolve without drift. `h1{min-height:106px}` does the
same job for the headline, which is one line here and two in `99-close.html`.
Do not delete them.

**2. This frame is `99-close.html` with the `#foot` credit block removed, and
that removal has been got wrong once already.** On 2026-09-17 the published
frame shipped with an orphaned `<em>Field Engineering</em>` and a stray
`</div>` left behind at the top of the body. The extra closing tag terminated
`#frame` — the scaled artboard — before `#stage`, so the headline, lede and
entire product rail rendered outside it, unscaled. Fixed in commit following
`799baec`.

Cheapest possible guard, and it catches exactly this class of fault:

```sh
for f in *.html; do
  printf "%-22s open=%-3s close=%s\n" "$f" \
    "$(grep -o '<div' "$f" | wc -l)" "$(grep -o '</div>' "$f" | wc -l)"
done
```

Every frame must balance. `00-title.html` and `99-close.html` carry 21 divs;
the other six carry 20.

## Publishing

Published at `dm-101-clickable/` in `mikepriceboomi/domain-expert-demos`,
served by GitHub Pages from `main` at root:

```
https://mikepriceboomi.github.io/domain-expert-demos/dm-101-clickable/<frame>.html
```

- **`.nojekyll` must exist at the repo root**, not just here. Without it Pages
  runs Jekyll and serves `README.md` as the directory index.
- **Folder names are all-lowercase** — Pages is case-sensitive, macOS is not, so
  a wrong-case folder serves locally and 404s live.
- **Not `dm-101/`.** That is the working-source folder and it is gitignored: it
  holds screenshots of a live Boomi demo tenant, a colleague's contact details
  and headshot, and the narration transcript. This repo is public. Note the
  filename collision — `00-title.html` is a ~674KB source there and a ~6.6KB
  frame here. Never copy one over the other.
- Before publishing, confirm `grep -c 'base64,' *.html` returns 0 for every
  frame. A frame that still inlines its artwork is ~660KB instead of ~5KB.
- A Pages build can report `status:"building"` with `error:null` when it has
  actually failed. Normal build time on this repo is 25–55s; if it exceeds that
  by several multiples, force a rebuild with
  `gh api -X POST repos/mikepriceboomi/domain-expert-demos/pages/builds`.
  Confirm a deploy by HTTP status per URL, never by the build status alone.

## Related documents

- `dm-101/SOURCE-INDEX.md` — screen-by-screen index of the **source recording**
  (narration, timings, what was on screen). A record of the video, not a build
  instruction for these frames.
- `CAPTURE_BUILD_GUIDE.md` in the Boomi companion workspace covers **Data
  Management 102**, a different deck on a different tenant. It does not apply
  to these frames.
