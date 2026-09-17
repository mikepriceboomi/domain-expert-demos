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

In `99b-thankyou.html` the kicker and lede are deliberately `visibility:hidden`
rather than removed. They hold their space so the product rail lands on the
same row as `99-close.html` and the two cross-dissolve without drift. Do not
delete them.
