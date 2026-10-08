# Говорещи Ръце (Talking Hands)

A Bulgarian vocabulary and sentence-building app for children, which also works
as a communicator (AAC) for non-verbal children. Words are shown as pictograms;
tapping them builds sentences and reads them aloud with text-to-speech. Built
with React Native (Android and iOS).

## Features

- **Conversation** – build sentences by picking a verb and a noun from
  pictogram buttons; the app speaks the finished sentence and animates the
  result. This is also the communicator mode: a non-verbal child can compose
  and speak a sentence in a few taps.
- **Lessons** – a set of prepared lessons (Урок 1–5) with organized word lists.
- **Tutor** – browse words with their pictograms and pronunciations.
- **Settings** – pick TTS voice and language, speech rate and pitch, toggle
  "say word on press", reset settings.
- Bilingual UI (Bulgarian / English) via `i18n-js`.

## Tech stack

| Area | Choice |
| --- | --- |
| App | React Native 0.87 (New Architecture), React 19, TypeScript |
| State | Redux 5 + React Redux 9 |
| Navigation | React Navigation 7 (`@react-navigation/native-stack`) |
| Speech | `react-native-tts` |
| Storage | `@react-native-async-storage/async-storage` |
| UI widgets | `react-native-vector-icons`, `@react-native-community/slider`, `@react-native-community/checkbox`, `@react-native-picker/picker` |
| Data pipeline | Python scripts in `data_generator/` (pulls words from a Google Sheet) |
| Android | Gradle 9, compileSdk 37, targetSdk 36, minSdk 24, JDK 17 |
| Releases | Fastlane (`android/fastlane/`) |

### Patched dependencies

Two libraries don't build cleanly against Gradle 9 / AGP 9 as published. The
fixes live in `patches/` and are applied automatically by `patch-package` on
`npm install`:

- `react-native-tts` – drops a legacy `jcenter()` buildscript block and adds the
  required library `namespace`.
- `@react-native-community/checkbox` – enables the `buildConfig` feature flag and
  removes a broken `codegenConfig` entry so the view runs through the New
  Architecture interop layer.

## Getting started

The toolchain is pinned in `mise.toml`: **Node 24**, **Temurin JDK 17** and the
**Android command-line tools**. Install [mise](https://mise.jdx.dev) first.

> Every command below is prefixed with `mise exec --` so it runs with the
> pinned toolchain. Alternatively run `mise activate bash` once per shell and
> drop the prefix.

### 1. Install the toolchain

```bash
mise trust
mise install
```

### 2. Install Android SDK packages

```bash
mise exec -- sdkmanager --install \
  "platform-tools" "platforms;android-37.0" "build-tools;37.0.0"
```

Optional, for running on an emulator:

```bash
mise exec -- sdkmanager --install \
  emulator "platforms;android-36" "system-images;android-36;google_apis;x86_64"
mise exec -- avdmanager create avd \
  -n myEmu -k "system-images;android-36;google_apis;x86_64" --device pixel_8
```

(Use an `x86_64` image on x86_64 hosts – it gets KVM acceleration.)

### 3. Generate the debug signing key

`*.keystore` is gitignored, so a fresh checkout has no debug keystore and the
build will fail at signing. Generate one:

```bash
mise exec -- bash -c 'keytool -genkeypair -v -keystore android/app/debug.keystore \
  -storepass android -alias androiddebugkey -keypass android \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Android Debug,O=Android,C=US"'
```

### 4. Install JS dependencies

```bash
mise exec -- npm install
```

This also runs `patch-package` to apply the library patches described above.

### 5. Run the app

With an emulator or device connected (`mise exec -- adb devices`):

```bash
# terminal 1 – Metro bundler
mise exec -- npm start
```

```bash
# terminal 2 – build, install and launch
mise exec -- npx react-native run-android --no-packager
```

`--no-packager` is recommended because the CLI's "launch Metro in a new terminal
window" step is unreliable on some terminals (see Troubleshooting). Just
building an APK without a device:

```bash
cd android && mise exec -- ./gradlew :app:assembleDebug
```

The APK lands in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Development commands

```bash
mise exec -- npm test        # Jest
mise exec -- npm run tsc     # TypeScript type-check
mise exec -- npm run lint    # ESLint
```

## Troubleshooting

- **`run-android` opens a terminal that says "Requested executable not found"
  and hangs.** The CLI tries to launch Metro via `<terminal> -e "sh script"`,
  which terminals such as Ghostty don't accept. Start Metro yourself (step 5)
  and pass `--no-packager`.
- **App shows "Unable to load script. Make sure you're either running a Metro
  server..."** Metro isn't running, or the device cannot reach it. Debug builds
  allow cleartext HTTP (via the `usesCleartextTraffic` manifest placeholder) and
  `run-android` sets up `adb reverse tcp:8081 tcp:8081` automatically. Check
  `curl http://localhost:8081/status`.
- **Style changes don't apply / the app looks stale.** Make sure Metro is
  running – when the dev server is unreachable the app falls back to a cached
  bundle. Force a reload: `adb shell am force-stop com.talkinghands && adb shell
  am start -n com.talkinghands/.MainActivity`.
- **"Package path is not valid" when creating an AVD.** The requested system
  image isn't installed – install it first (step 2) and make sure the CPU
  architecture matches your host.
- **Gradle can't find a keystore / signing fails.** Regenerate the debug keystore
  (step 3).

## Project structure

```
App.tsx                 entry component (redux provider + navigation)
index.js                AppRegistry entry point
ui/                     screens (conversation, tutor, lessons, menu, settings)
ui/components/          reusable pictogram buttons and panels
navigators/             react-navigation stack
reducers/               redux store, actions, reducers and types
tts/                    text-to-speech wrapper around react-native-tts
types.ts                shared app types
util/                   AsyncStorage-backed settings persistence
data/                   words, lessons and pictograms (data/wimg/)
data_generator/         Python scripts that generate data/ from a Google Sheet
i18n/                   translations (bg, en)
styles/                 shared styles
android/, ios/          native projects
patches/                patch-package patches for two libraries
__tests__/              Jest tests
mise.toml               pinned toolchain
```

## Data generation

Word lists and pictograms are generated from a Google Sheet by the Python
scripts in `data_generator/`:

```bash
pip install -r requirements.txt
cd data_generator && ./run_generator.sh
```

This rewrites files under `data/`, `images/` and `wordimg/` (`wordimg/` is
gitignored). The generated data modules are plain `.js` and are consumed from
TypeScript with `allowJs`.

## iOS

The iOS project was regenerated for React Native 0.87 (Hermes enabled). It has
**not been verified** – iOS builds require macOS with Xcode and CocoaPods:

```bash
cd ios && bundle exec pod install && mise exec -- npx react-native run-ios
```

Known TODO for iOS: register the `MaterialIcons` font (`UIAppFonts` in
`Info.plist` plus the `.ttf` in the Xcode project), mirroring
`android/app/src/main/assets/fonts/MaterialIcons.ttf` on Android.

## Release

Android releases are handled by Fastlane (`android/fastlane/Fastfile`) and are
signed with the keystores in `android/keystores/` (passwords are wired through
`android/gradle.properties`). Before publishing, review the merged manifest for
permissions (`SYSTEM_ALERT_WINDOW`, `READ_PHONE_STATE`) – debug builds
automatically receive the dev-menu permission, release builds should not.

## Author

Svetlozar Argirov <zarrro@gmail.com> [Broken By Design](https://broken-by-design.art)
