import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ReduxProvider from '@core/services/reduxProvider';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from '@navigation/CoreNavigator';

GoogleSignin.configure({
  webClientId:
    '973032847065-jtu768pmput08udd3d0o0cb5t3k912b3.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log(idToken, ' :id tokwn', googleCredential, ' :googleCred');
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function App(): React.JSX.Element {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <ActivityIndicator />;

  console.log(user);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ReduxProvider>
        <NavigationContainer>
          {/* <GoogleSigninButton
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }
          />

          <TouchableOpacity onPress={() => signOut()}>
            <Text>Signout</Text>
          </TouchableOpacity> */}

          <MainNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaView>
  );
}

export default codePush(App);
