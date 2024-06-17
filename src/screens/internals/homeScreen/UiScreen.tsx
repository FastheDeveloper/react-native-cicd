import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {persistStorage} from '@core/services/storage';

export const HomeScreen = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text onPress={() => persistStorage.clearAll()}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
