import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {STORAGE_KEYS, persistStorage} from '@core/services/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {resetUserStoreData} from '@store/reducers/userSlice';
import {RootState} from '@store/reducers';
import {useSelector} from 'react-redux';

export const HomeScreen = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      resetUserStoreData();
      await persistStorage.remove(STORAGE_KEYS.SAVED_USER);
      await persistStorage.remove(STORAGE_KEYS.SAVED_USER_ID);
    } catch (e) {
      console.log(e);
    }
  };
  const {userData} = useSelector((state: RootState) => state.user);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text onPress={signOut}>{userData?.displayName}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
