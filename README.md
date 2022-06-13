## stats_bids.js

Steps:
- Visit the reviewer preference page, e.g., `$hotcrp'/reviewprefs
- Select the reviewer
- Open the browser DevTool console
  - Chrome for MacOS: OPT+CMD+J
  - Chrome for Windows/Linux: SHIFT+CTRL+J
- Paste the code of 'stats_bids.js' (or 'stats_bids.min.js')

## remap_bids.js

See steps for `stats_bids.js`.

After running the script, wait at least for `_MAX_WAIT_TIME_` ms (requests are distributed in a `_MAX_WAIT_TIME_` ms time interval to avoid flooding the server). 