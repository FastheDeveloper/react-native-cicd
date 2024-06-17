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

export const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<UserType | null>();

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const currentUser = auth().currentUser;
    console.log('The currnt user is, ', currentUser);

    const signInResult = await auth().signInWithCredential(googleCredential);
    console.log('SignIn Result: ', signInResult);
    const signedinUser = signInResult.user;

    console.log('SignIn User: ', signedinUser);

    if (signedinUser) {
      const {displayName, email, photoURL, uid} = signedinUser;
      console.log('displayName: ', displayName);

      setUser({displayName, email, photoURL, uid});
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
    await persistStorage.setItem(STORAGE_KEYS.SAVED_USER, user as UserType);
    // .then(() => {
    //   setUser(null);
    // });
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
                  To complete log into the app
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
                onGoogleButtonPress().then(async () => {
                  // const currentUser = auth().currentUser;
                  // console.log(currentUser, ' in the then');
                  // const {displayName, email, photoURL, uid} = currentUser;
                  // setUser({displayName, email, photoURL, uid});
                });
              }}
            />
          </View>
        </View>
      </Fragment>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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
