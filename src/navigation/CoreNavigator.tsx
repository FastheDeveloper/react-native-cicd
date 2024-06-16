import React, {Fragment, useEffect, useState} from 'react';
import {CoreRoutesParams} from './types';

import {CoreRoutes} from './routes';
import {RootState} from 'store/reduxStore';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {persistStorage, STORAGE_KEYS} from '@core/services/storage';
import {TabNavigator} from './TabNavigatio';
import {saveNews} from '@store/reducers/newSlice/newsDispatchAction';
import {Onboarding} from '@screens/externals/onboardingScreens';
import {Login} from '@screens/externals/loginScreen';
import {SignUp} from '@screens/externals/signupScreen';

const Stack = createNativeStackNavigator<CoreRoutesParams>();

const options = {
  headerShown: false,
};

/**
 * MainNavigator is the root navigator for the app.
 * It determines which screen to show based on app state like theme loaded,
 * user logged in status, KYC status, and passcode status.
 * Renders nested navigators like Drawer and Tab.
 */
export const MainNavigator = () => {
  const {userData} = useSelector((state: RootState) => state.user);
  const [onboardedUser, setOnBoardedUser] = useState(false);

  const getOnboarder = async () => {
    const onboardedUser = await persistStorage.getBoolean(
      STORAGE_KEYS.ONBOARDED_USER,
    );
    const savedNews = await persistStorage.getItem(STORAGE_KEYS.SAVED_NEWS);

    if (savedNews) {
      saveNews(savedNews);

      console.log(typeof saveNews, 'TASK SAVED IS ');
    }
    if (onboardedUser) setOnBoardedUser(true);
  };

  useEffect(() => {
    getOnboarder();
  }, []);

  const renderApp = () => {
    const list = [
      /* The code block you mentioned is a part of the `renderApp` function in the `MainNavigator`
      component. It is responsible for conditionally rendering different screens based on certain
      conditions. */
      //   { handle with splashscreen
      //     cond: !isThemeLoaded,
      //     node: (
      //       <Fragment>
      //         <Stack.Screen name={CoreRoutes.LOADING} component={Loader} />
      //       </Fragment>
      //     ),
      //   },
      {
        cond: !false,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.ONBOARD} component={Onboarding} />
            <Stack.Screen name={CoreRoutes.SIGNUP} component={SignUp} />
            <Stack.Screen name={CoreRoutes.LOGIN} component={Login} />
          </Fragment>
        ),
      },
      {
        cond: !userData?.refreshToken,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.SIGNUP} component={SignUp} />
            <Stack.Screen name={CoreRoutes.LOGIN} component={Login} />
          </Fragment>
        ),
      },

      {
        cond: true,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.HOME} component={TabNavigator} />
          </Fragment>
        ),
      },
    ];

    return list.find(({cond}) => !!cond)?.node;
  };

  return (
    <Stack.Navigator screenOptions={options}>{renderApp()}</Stack.Navigator>
  );
};

export default MainNavigator;
