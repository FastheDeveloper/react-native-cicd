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
import {updateUserData, updateUserId} from '@store/reducers/userSlice';
import {STORAGE_KEYS, persistStorage} from '@core/services/storage';
import {UserType} from '@lib/types/apiTypes';

GoogleSignin.configure({
  webClientId:
    '973032847065-jtu768pmput08udd3d0o0cb5t3k912b3.apps.googleusercontent.com',
});

export const GoogleScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<UserType | null>();

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const currentUser = auth().currentUser;

    if (currentUser) {
      const {displayName, email, photoURL, uid} = currentUser;
      setUser({displayName, email, photoURL, uid});
    } else {
      setUser(null);
    }
    if (idToken) {
      updateUserId(idToken);
      await persistStorage.set(STORAGE_KEYS.SAVED_USER_ID, idToken);
    }

    return auth().signInWithCredential(googleCredential);
  }
  function onAuthStateChanged(user: any) {
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const updateUser = async () => {
    updateUserData(user as UserType);
    await persistStorage
      .setItem(STORAGE_KEYS.SAVED_USER, user as UserType)
      .then(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    updateUser();
  }, [user]);

  if (initializing) return <ActivityIndicator />;

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
                <Text style={{color: '#0F6DDC', marginBottom: '5%'}}>
                  click the button below.
                </Text>
              </View>
            </View>
            <Primary
              title="Continue with Google"
              onPress={() => {
                onGoogleButtonPress().then(async () => {});
              }}
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
