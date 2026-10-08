# Говорещи Ръце (Talking Hands)

A Bulgarian vocabulary and sentence-building app for children, which also works
as a communicator (AAC) for non-verbal children. Words are shown as pictograms;
tapping them builds sentences and reads them aloud with text-to-speech. Built
with React Native 0.61 (Android and iOS).

## Features

- **Conversation** – build sentences by picking a verb and a noun from
  pictogram buttons; the app speaks the finished sentence and animates the
  result. This is also the communicator mode: a non-verbal child can compose
  and speak a sentence in a few taps.
- **Lessons** – a set of prepared lessons (Урок 1–5) with organized word lists.
- **Tutor** – browse words with their pictograms and pronunciations.
- **Settings** – pick TTS voice and language, speech rate and pitch, toggle
  "say word on press", reset settings.
- Bilingual UI (Bulgarian / English) via `react-native-i18n`.

## Tech stack

| Area | Choice |
| --- | --- |
| App | React Native 0.61.2, React 16.9, Redux 4, React Navigation 4 |
| Speech | `react-native-tts` |
| Icons / assets | `react-native-vector-icons`, bundled pictograms |
| Data pipeline | Python scripts in `data_generator/` (pulls words from a Google Sheet) |
| Android | Gradle 5.5, Android Gradle Plugin 3.4.2, SDK 28, build-tools 28.0.3 |
| Releases | Fastlane (`android/fastlane/`) |

## Getting started

The project is a legacy React Native build and needs an equally legacy
toolchain: **Node 12**, **JDK 8** (required by AGP 3.4.2) and **Android SDK 28**.
All of this is pinned in `mise.toml`, so [mise](https://mise.jdx.dev) is the
only thing you need installed system-wide.

> Every command below is prefixed with `mise exec --` so it runs with the
> pinned Node/JDK/Android SDK. If you prefer, run `mise activate bash` once per
> shell and drop the prefix.

### 1. Install the toolchain

```bash
mise trust
mise install
```

This installs Node 12.22.12, Temurin JDK 8 and the Android command-line tools.

### 2. Install Android SDK packages

`platform-tools`, platform 28 and build-tools 28.0.3 are what the app compiles
against. Note the SDK's command-line tools require JDK 17+, so they are invoked
with a separate JDK:

```bash
mise exec java@temurin-17 -- sdkmanager --install \
  "platform-tools" "platforms;android-28" "build-tools;28.0.3"
```

Optional, for running on an emulator:

```bash
mise exec java@temurin-17 -- sdkmanager --install \
  emulator "platforms;android-35" "system-images;android-35;google_apis;x86_64"
mise exec java@temurin-17 -- avdmanager create avd \
  -n myEmu -k "system-images;android-35;google_apis;x86_64" --device pixel_8
```

(Use an `x86_64` image on x86_64 hosts – it gets KVM acceleration. `arm64-v8a`
images only make sense on ARM machines.)

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

`--no-packager` is recommended because the CLI's "launch Metro in a new
terminal window" step is unreliable on some terminals (see Troubleshooting).
Just building an APK without a device:

```bash
cd android && mise exec -- ./gradlew :app:assembleDebug
```

The APK lands in `android/app/build/outputs/apk/debug/app-debug.apk`.

### iOS

The iOS project is in `ios/` and requires macOS with Xcode and CocoaPods
(`cd ios && pod install && npx react-native run-ios`). It has not been verified
in this environment.

## Troubleshooting

- **`run-android` opens a terminal that says "Requested executable not found"
  and hangs.** The CLI tries to launch Metro via `<terminal> -e "sh script"`,
  which terminals such as Ghostty don't accept. Start Metro yourself (step 5)
  and pass `--no-packager`.
- **App shows "Unable to load script. Make sure you're either running a Metro
  server..."** Metro isn't running, or the device cannot reach it. Debug builds
  allow cleartext HTTP via `android/app/src/debug/AndroidManifest.xml`, and
  `run-android` sets up `adb reverse tcp:8081 tcp:8081` automatically. Check
  `curl http://localhost:8081/status`.
- **Metro crashes with `TypeError: cb.apply is not a function`.** Old
  `graceful-fs` vs modern Node; the fixed version is pinned in
  `package.json` (`graceful-fs@4.2.11`).
- **Style changes don't apply / the app looks stale.** Make sure Metro is
  running – when the dev server is unreachable the app falls back to a cached
  bundle. Force a reload: `adb shell am force-stop com.talkinghands &&
  adb shell am start -n com.talkinghands/.MainActivity`.
- **`sdkmanager`/`avdmanager` refuse to run ("requires JDK 17 or later").**
  They were invoked without a JDK override. Use
  `mise exec java@temurin-17 -- <command>` (the app itself still builds with
  JDK 8).
- **"Package path is not valid" when creating an AVD.** The requested system
  image isn't installed – install it first (step 2) and make sure the CPU
  architecture matches your host.

## Project structure

```
App.js, index.js        entry points (redux provider + navigation)
ui/                     screens (conversation, tutor, lessons, menu, settings)
ui/components/          reusable pictogram buttons and panels
navigators/             react-navigation stack
reducers/               redux store, actions and reducers
tts/                    text-to-speech wrapper around react-native-tts
data/                   words, lessons and pictograms (data/wimg/)
data_generator/         Python scripts that generate data/ from a Google Sheet
i18n/                   translations (bg, en)
styles/                 shared styles
android/, ios/          native projects
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
gitignored).

## Tests

```bash
mise exec -- npm test
```

## Release

Android releases are handled by Fastlane (`android/fastlane/Fastfile`) and are
signed with the keystores in `android/keystores/` (passwords are wired through
`android/gradle.properties`).

Release builds strip two permissions that React Native adds by default:
`SYSTEM_ALERT_WINDOW` and `READ_PHONE_STATE`. This is done with `tools:node="remove"`
in `android/app/src/release/AndroidManifest.xml` – see
[this StackOverflow answer](https://stackoverflow.com/questions/37179472/how-do-you-remove-the-required-system-alert-window-permission-for-release-versio#37181101)
for background.
