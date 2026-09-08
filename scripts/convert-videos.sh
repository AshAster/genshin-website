#!/usr/bin/env bash
# Transcode public/videos/*.mp4 to web-weight VP9 WebM alongside the originals.
#
# The sources are 1080p60 game capture, ~290 MB in total. They are silent,
# decorative backgrounds sitting behind text, so this drops audio, halves the
# frame rate to 30, caps height at 720 and — importantly — encodes in VP9
# *constrained quality* mode.
#
# The bitrate ceiling is what does the work here: with `-crf N -b:v 0` alone,
# this footage (dense particle effects, constant motion) still lands around
# 5-6 Mbps even at crf 34, because nothing bounds it. Pairing the crf with an
# explicit `-b:v` turns it into a quality target with a hard cap.
#
# Clips over a minute get a lower ceiling; at 2 minutes even 1200k is a large
# download for a looping background.
#
# Usage:  bash scripts/convert-videos.sh
#         FFMPEG=/path/to/ffmpeg.exe bash scripts/convert-videos.sh
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
FFPROBE="${FFPROBE:-${FFMPEG%ffmpeg*}ffprobe${FFMPEG##*ffmpeg}}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/videos"

MAX_HEIGHT=720
FPS=30
CRF=40
BITRATE_SHORT=1200   # kbit/s for clips up to a minute
BITRATE_LONG=800     # kbit/s beyond that

for src in "$DIR"/*.mp4; do
  out="${src%.mp4}.webm"
  name="$(basename "$src")"

  if [ -f "$out" ] && [ "$out" -nt "$src" ]; then
    echo "skip   $name (webm already newer than source)"
    continue
  fi

  duration=$("$FFPROBE" -v error -show_entries format=duration -of csv=p=0 "$src" 2>/dev/null || echo 0)
  if [ "${duration%%.*}" -gt 60 ] 2>/dev/null; then
    br=$BITRATE_LONG
  else
    br=$BITRATE_SHORT
  fi

  echo "encode $name (${duration%%.*}s, ${br}k ceiling)"
  "$FFMPEG" -y -loglevel error -stats -i "$src" \
    -an \
    -c:v libvpx-vp9 \
    -crf "$CRF" -b:v "${br}k" -maxrate "$((br * 2))k" -bufsize "$((br * 4))k" \
    -r "$FPS" \
    -vf "scale=-2:'min(${MAX_HEIGHT},ih)'" \
    -pix_fmt yuv420p \
    -row-mt 1 -deadline good -cpu-used 2 \
    "$out"
done

echo
echo "Done:"
ls -l "$DIR" | awk 'NR>1 {printf "  %-18s %7.1f MB\n", $9, $5/1048576}'
