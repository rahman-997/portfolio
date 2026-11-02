#!/usr/bin/env bash
set -euo pipefail
APP_ID=dev.basma.portfolio.preview
APK="${1:?Usage: bash qa/physical-android-smoke.sh /path/to/app-debug.apk}"
test -s "$APK" || { echo 'APK not found or empty'; exit 2; }
command -v adb >/dev/null || { echo 'Android Platform Tools (adb) are required'; exit 2; }
mapfile -t serials < <(adb devices | awk 'NR > 1 && $2 == "device" {print $1}')
[ "${#serials[@]}" -eq 1 ] || { echo 'Connect exactly one authorized physical Android device'; exit 2; }
serial="${serials[0]}"
[[ "$serial" != emulator-* ]] || { echo 'Rejected: Android emulator'; exit 2; }
qemu="$(adb -s "$serial" shell getprop ro.kernel.qemu | tr -d '\r')"
[ "$qemu" != 1 ] || { echo 'Rejected: Android emulator'; exit 2; }
hardware="$(adb -s "$serial" shell getprop ro.hardware | tr -d '\r')"
case "$hardware" in ranchu|goldfish) echo 'Rejected: Android emulator hardware'; exit 2;; esac
adb -s "$serial" install -r "$APK"
adb -s "$serial" shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null
sleep 3
adb -s "$serial" shell pidof "$APP_ID" | grep -q '[0-9]' || { echo 'App closed unexpectedly'; exit 1; }
mkdir -p qa/physical-results
adb -s "$serial" exec-out screencap -p > qa/physical-results/android.png
python3 - <<'PY'
from pathlib import Path
x=Path('qa/physical-results/android.png').read_bytes()
assert x.startswith(b'\x89PNG\r\n\x1a\n'), 'Invalid screenshot'
PY
model="$(adb -s "$serial" shell getprop ro.product.model | tr -d '\r')"
api="$(adb -s "$serial" shell getprop ro.build.version.sdk | tr -d '\r')"
printf 'PHYSICAL Android launcher verified on %s, API %s.\n' "$model" "$api"
printf 'Manual RTL, accessibility and offline QA still required.\n'
