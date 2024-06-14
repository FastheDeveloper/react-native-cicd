import React from 'react';

import {SafeAreaView, Text, View} from 'react-native';
import codePush from 'react-native-code-push';

function App(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'pink', alignItems: 'center'}}>
      <Text>Something new</Text>
    </SafeAreaView>
  );
}

export default codePush(App);
