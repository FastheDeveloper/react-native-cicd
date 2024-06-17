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
import {Primary} from '@lib/compnents/Button';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {BigGoogle} from '@lib/icons/googleIcon/GoogleSvg';
import {updateUserData} from '@store/reducers/userSlice';
import {STORAGE_KEYS, persistStorage} from '@core/services/storage';
import {UserType} from '@lib/types/apiTypes';

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
  const [user, setUser] = useState<UserType | null>();

  function onAuthStateChanged(user: any) {
    if (user) {
      const {displayName, email, photoURL, uid} = user;
      setUser({displayName, email, photoURL, uid});
    } else {
      setUser(null);
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const updateUser = async () => {
    console.log('runnisg update user');
    updateUserData(user as UserType);
    await persistStorage.setItem(STORAGE_KEYS.SAVED_USER, user as UserType);
  };

  useEffect(() => {
    updateUser();
  }, [user]);

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

          <View style={styles.buttonGroup}>
            <View style={{alignItems: 'center'}}>
              <BigGoogle />
              <View style={{alignItems: 'center', marginVertical: '7%'}}>
                <Text style={{color: '#0F6DDC'}}>
                  To complete your registration
                </Text>
                <Text style={{color: '#0F6DDC'}}>
                  and gain full access to all features,
                </Text>
                <Text style={{color: '#0F6DDC'}}>click the button below.</Text>
              </View>
            </View>
            <Primary
              title="Continue with Google"
              onPress={() => {
                onGoogleButtonPress().then(async () => {});
              }}
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
    // marginVertical: '15%',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});
