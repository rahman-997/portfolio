#!/usr/bin/env bash
set -euo pipefail
APP_ID=dev.basma.portfolio.preview
APK="${1:?pass path to built debug APK}"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

diagnose() {
  if [ "$?" -ne 0 ]; then
    adb logcat -d -t 1200 > android-logcat.txt 2>/dev/null || true
    adb shell uiautomator dump /sdcard/basma-ui.xml >/dev/null 2>&1 || true
    adb exec-out cat /sdcard/basma-ui.xml > android-ui.xml 2>/dev/null || true
    echo 'Android render check failed; diagnostic files retained' >&2
  fi
}
trap diagnose EXIT

test -s "$APK"
adb wait-for-device
for i in $(seq 1 90); do
  [ "$(adb shell getprop sys.boot_completed | tr -d '\r')" = 1 ] && break
  sleep 4
done
[ "$(adb shell getprop sys.boot_completed | tr -d '\r')" = 1 ] || { echo 'Emulator failed to boot'; exit 1; }

adb install -r "$APK"
adb shell input keyevent KEYCODE_WAKEUP || true
adb shell wm dismiss-keyguard || true
adb shell am start -W -n "$APP_ID/.MainActivity"

# Process-alive alone is insufficient: wait for actual, nonblank UI pixels.
for attempt in $(seq 1 15); do
  sleep 8
  adb shell pidof "$APP_ID" | grep -q '[0-9]' || { echo 'App process exited'; exit 1; }
  adb exec-out screencap -p > android-emulator.png
  if python3 "$SCRIPT_DIR/assert-visible-screen.py" android-emulator.png; then
    if adb shell uiautomator dump /sdcard/basma-ui.xml >/dev/null 2>&1 && adb exec-out cat /sdcard/basma-ui.xml > android-ui.xml; then
      if python3 "$SCRIPT_DIR/assert-app-ui.py" android-ui.xml; then
        echo "PASS: Android emulator rendered visible Basma content on attempt $attempt. NOT a physical device."
        exit 0
      fi
    fi
  fi
  echo "Waiting for nonblank WebView (attempt $attempt/15)"
done
echo 'FAIL: WebView remained blank after 120 seconds' >&2
exit 1
