import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
});
