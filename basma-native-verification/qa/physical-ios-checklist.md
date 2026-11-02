# Physical iPhone test gate (not performed)
Requires a Mac running Xcode, an Apple developer team, approved bundle identifier, signing certificate, provisioning profile and a trusted physical iPhone.
Do not commit or share signing keys, private certificates, UDIDs or Apple account passwords.
1. Generate the Capacitor iOS project with npm install, npx cap add ios, and npx cap sync ios.
2. Choose the approved team and bundle identifier in Xcode Signing & Capabilities.
3. Connect an authorized iPhone, trust it in Xcode Devices and Simulators, and build to that physical device.
4. Verify Arabic RTL, accessibility/VoiceOver, navigation, offline mode, modal dismissal, external links, landscape and background recovery.
5. Save redacted screenshots and a signed test report with device model and OS version.
6. Only export an IPA using Apple's approved distribution signing process after a successful physical build.
An iOS simulator build is not a signed IPA, and neither has been verified here.
