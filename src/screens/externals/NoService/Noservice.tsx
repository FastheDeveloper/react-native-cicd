import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import EmptyRes from '@lib/icons/noResultIcon/emptyRes';

const Noservice = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <EmptyRes width={'80%'} height={'40%'} />
      <Text>No Internet connection detected</Text>
    </View>
  );
};

export default Noservice;
