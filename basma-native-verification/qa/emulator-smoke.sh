#!/usr/bin/env bash
set -euo pipefail
APP_ID=dev.basma.portfolio.preview
APK="${1:?pass path to built debug APK}"
test -s "$APK"
adb wait-for-device
for i in $(seq 1 90); do
  [ "$(adb shell getprop sys.boot_completed | tr -d '\r')" = 1 ] && break
  sleep 4
done
[ "$(adb shell getprop sys.boot_completed | tr -d '\r')" = 1 ]
adb install -r "$APK"
adb shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1
sleep 5
adb shell pidof "$APP_ID" | grep -q '[0-9]'
adb exec-out screencap -p > android-emulator.png
test -s android-emulator.png
echo "Android emulator launcher test passed. NOT a physical device."
