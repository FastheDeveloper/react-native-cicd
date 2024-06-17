import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GoogleButton, Primary, Tetiary} from '@lib/compnents/Button';
import {navigate} from '@utils/navigationUtils';
import {CoreRoutes} from '@navigation/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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

export const GoogleScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>();

  //   Handle user state changes
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Fragment>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name="newspaper" size={30} color={'#0F6DDC'} />
            <Text style={styles.headerText}>NewStory</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.titleText}></Text>
          </View>

          <View style={styles.buttonGroup}>
            <GoogleButton
              title="Continue with Google"
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
              //   disabled={disabled}
            />
          </View>
        </View>
      </Fragment>
    </TouchableWithoutFeedback>
  );
};

export default GoogleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#0F6DDC',
    fontSize: 22,
    marginLeft: '2%',
  },
  titleText: {
    color: '#0F6DDC',
    fontSize: 26,
    marginLeft: '2%',
    fontWeight: 'bold',
    marginTop: '10%',
  },

  buttonGroup: {
    marginHorizontal: '5%',
    marginVertical: '15%',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
});
