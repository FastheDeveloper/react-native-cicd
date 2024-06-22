FP News - React Native Application
FP News is a React Native application that provides news listings from the Free news API on RapidAPI. It allows users to browse news articles, view details of specific articles, and sign up or log in using their Google Accounts. This repository contains the source code and setup instructions for the FP News application.

Table of Contents
Introduction
Features
Technologies Used
Getting Started
Prerequisites
Installation
Configuration
Firebase Setup
CodePush Setup
Usage
Testing
Deployment
Contributing
License
Introduction
FP News is a mobile application built using React Native and designed to display news articles fetched from the Free news API on RapidAPI. It incorporates various Firebase services for analytics, crash reporting, performance monitoring, and remote configuration. The application also utilizes Redux Toolkit for state management, React Navigation for navigation between screens, and integrates with CodePush for over-the-air updates.

Features
News Listing: Displays a list of news articles with titles, images, topics, and publication dates.
News Details: Provides detailed information about a selected news article including summary, author, etc.
User Authentication: Allows users to sign up and log in using their Google Accounts.
Middleware Logging: Logs user activities and screen changes using Firebase events.
Error Handling: Handles exceptions and errors gracefully throughout the application.
Over-the-Air Updates: Implements CodePush for seamless updates without redeployment.
Technologies Used
React Native
Redux Toolkit
React Navigation
Firebase (Analytics, Crashlytics, Performance, Remote Config)
CodePush
Axios (for API requests)
TypeScript (for type safety)
Jest and React Native Testing Library (for unit tests)
Getting Started
Prerequisites
Before starting, ensure you have the following installed:

Node.js
npm or yarn
React Native CLI
Firebase account and project
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/lendsqr-fp-news.git
cd lendsqr-fp-news
Install dependencies:

bash
Copy code
npm install

# or

yarn install
Configuration
Firebase Setup
Create a Firebase project named lendsqr-fp-news in the Firebase console.
Configure Firebase SDK in your React Native project:
Add Firebase credentials in google-services.json (for Android) or GoogleService-Info.plist (for iOS).
Initialize Firebase in your application as per Firebase documentation.
CodePush Setup
Set up CodePush for over-the-air updates:
Create an account on App Center (https://appcenter.ms).
Create a new React Native app in App Center.
Follow the instructions to integrate CodePush in your React Native application.
Usage
Run the application on a connected device or emulator:

bash
Copy code
npx react-native run-android

# or

npx react-native run-ios
Testing
Unit tests are written using Jest and React Native Testing Library. To run tests:

bash
Copy code
npm test

# or

yarn test
Deployment
To deploy the application using Firebase App Tester:

Build the React Native project for deployment.
Deploy the built APK (for Android) or IPA (for iOS) to Firebase App Distribution.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
