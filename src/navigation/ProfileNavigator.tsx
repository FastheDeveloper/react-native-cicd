import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Fragment} from 'react';
import {ProfileRoutesParams} from './types';
import {ProfileRoutes} from './routes';
import {ProfileScreen} from '@screens/internals/profileScreen';

const Stack = createNativeStackNavigator<ProfileRoutesParams>();

const options = {headerShown: false};

export const ProfileNavigator = () => {
  const renderApp = () => (
    <Fragment>
      <Stack.Screen name={ProfileRoutes.PROFILE} component={ProfileScreen} />
    </Fragment>
  );

  return (
    <Stack.Navigator
      screenOptions={options}
      initialRouteName={ProfileRoutes.PROFILE}>
      {renderApp()}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
