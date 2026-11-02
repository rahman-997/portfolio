# Basma native debug verification
This is a separate branch for Android debug-signed APK/AAB and unsigned iOS simulator builds. Nothing here updates the main branch, app store listings or production domains.
The HTML is the already-public RTL portfolio preview. Android package `dev.basma.portfolio.preview` is **test-only**, not an approved store ID. Signing is via Android debug keystore only.
An emulator run is **not physical-device testing**. No Apple developer signing certificate or Android store release key is present. Do not distribute generated packages as store releases.
