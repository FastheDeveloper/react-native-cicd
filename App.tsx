import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import codePush from 'react-native-code-push';

import ReduxProvider from '@core/services/reduxProvider';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from '@navigation/CoreNavigator';
import {navigationRef} from '@utils/navigationUtils';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ReduxProvider>
        <NavigationContainer ref={navigationRef}>
          <MainNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaView>
  );
}

export default codePush(App);
