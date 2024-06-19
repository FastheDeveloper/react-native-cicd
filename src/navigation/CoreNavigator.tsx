import React, {Fragment, useEffect, useState} from 'react';
import {CoreRoutesParams} from './types';

import {CoreRoutes} from './routes';
import {RootState} from 'store/reduxStore';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {persistStorage, STORAGE_KEYS} from '@core/services/storage';
import {TabNavigator} from './TabNavigatio';
import {
  saveNews,
  setAfrica,
  setGeneralNews,
  setLoadingState,
  setTechNews,
  setWarNews,
} from '@store/reducers/newSlice/newsDispatchAction';
import {Onboarding} from '@screens/externals/onboardingScreens';
import {Login} from '@screens/externals/loginScreen';
import {SignUp} from '@screens/externals/signupScreen';
import GoogleScreen from '@screens/externals/signupScreen/GoogleScreen';
import {
  updateUserData,
  updateUserId,
  updateUserOnboarded,
} from '@store/reducers/userSlice';
import {HomeScreen} from '@screens/internals/homeScreen';
import DetailedNewsScreen from '@screens/internals/detailedNewScreen/DetailedNewsScreen';
import {createApiInstance} from '@hooks/useAPI';
import {apiKey} from '@core/constants/titleData';
import {NewNewsArticle, NewsArticle} from '@lib/types/apiTypes';
import {aggregator} from '@core/services/newsFetcher';

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
  const {userData, id, userOnboarded} = useSelector(
    (state: RootState) => state.user,
  );
  const [onboardedUser, setOnBoardedUser] = useState(false);

  const getOnboarder = async () => {
    const onboardedUser = await persistStorage.getBoolean(
      STORAGE_KEYS.ONBOARDED_USER,
    );
    const savedUser = await persistStorage.getItem(STORAGE_KEYS.SAVED_USER);
    const savedNews = await persistStorage.getItem(STORAGE_KEYS.SAVED_NEWS);
    const savedId = await persistStorage.getString(STORAGE_KEYS.SAVED_USER_ID);

    if (savedNews) {
      saveNews(savedNews);
      console.log(typeof saveNews, 'TASK SAVED IS ');
    }
    if (savedUser) {
      updateUserData(savedUser);
    }
    if (savedId) {
      updateUserId(savedId);
    }
    if (onboardedUser) {
      updateUserOnboarded(true);
      setOnBoardedUser(true);
    }
  };

  useEffect(() => {
    getOnboarder();
    aggregator();
    //run above then hide spashscreen here
  }, []);
  console.log(userData?.uid, ' Usr data in core');
  const renderApp = () => {
    const list = [
      {
        cond: !userOnboarded,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.ONBOARD} component={Onboarding} />
          </Fragment>
        ),
      },
      {
        cond: !id,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.SIGNUP} component={SignUp} />
            <Stack.Screen name={CoreRoutes.LOGIN} component={Login} />
            <Stack.Screen name={CoreRoutes.GOOGLE} component={GoogleScreen} />
          </Fragment>
        ),
      },

      {
        cond: true,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.HOME} component={HomeScreen} />
            <Stack.Screen
              name={CoreRoutes.DETAILED}
              component={DetailedNewsScreen}
            />
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
