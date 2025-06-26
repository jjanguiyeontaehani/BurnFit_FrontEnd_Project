# BurnFit Frontend Project
> This is my first React Native App Project, so ill figure more learning about it.
> and ill never use ChatBot, Copilot, most of Error cases, not googling it
> 리액트 네이티브로 개발하는 첫 프로젝트입니다. 따라서 리액트 네이티브가 어떤 개발 도구인지 배우는 것에 더욱 초점을 둘 것입니다.
> AI 도구를 사용하지 말라는 내용이 따로 없었으나, 처음 배우고, 사용하는 것이니만큼, 이를 사용하지 않는 것이 평가에도, 배우는 데에도 좋을 것이라 생각합니다.
> 추가로, 에러 발생 시 최대한 검색해보지 않을 것입니다.

## 요구 사항 분석
- 세 레벨으로 분류된 기능 개발 사항이 나뉘어져 있으며, 일반적으로 User 가 사용할 수 있는 가장 기본적인 기능의 구현이 예제로 나와 있음
- 기능을 구현할 시 어떤 객체?, 혹은 플러그인을 사용할지 지정해 두었음
- 과제의 구현은 본인이 가능한 수준까지 구현해달라는 내용이 있었으며, 프론트엔드쪽 개발 경험이 전무한 나에게 가장 해당되는 사항임
- 개인이 가진 기술과 코드 작성 스타일을 위조로 볼 것이라 하였음. 
    - 코드 작성 스타일은 회사에 맞출 수 있기도 하고, 간단한 기능 개발 프로젝트이므로, 사실상 Git 을 이용한, 형상관리, 커밋 스타일, 문제 접근 방식 등을 위주로 볼 것일 가능성이 높음
    - 검토 담당자의 시간을 아끼려면 조금 못생겨도 개발 과정 중 생각과 세부 내용을 어느 정도는 정리하는 것이 좋아 보임 (깃헙에서 update 기록을 자세히 남기는 것도 가능할텐데.. 써본 적이 없어서 README 로 대체..)

## 프로젝트 개발 과정
1. 기본 환경 구성
    * 처음 설치 시 블로그에서 JDK 11 을 깔길래 따라했다가, 에러 코드 보고 17로 업데이트
    * 처음 구성 시 기본 디렉토리가 내가 생각한 것 안에 폴더로 또 생성되어 수정, 에러 코드 보고 test_page 관련 변수?를 main으로 수정
2. 

**Enjoy!**

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
