#!/bin/sh
# Renders scripts/og/og.html to public/og-image.png with headless Chrome (macOS path).
cd "$(dirname "$0")/../.." || exit 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=4000 --screenshot="$PWD/public/og-image.png" "file://$PWD/scripts/og/og.html"
