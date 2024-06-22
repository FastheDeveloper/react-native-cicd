import React, {Fragment, useEffect, useState} from 'react';
import {CoreRoutesParams} from './types';

import {CoreRoutes} from './routes';
import {RootState} from 'store/reduxStore';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {persistStorage, STORAGE_KEYS} from '@core/services/storage';
import {saveNews} from '@store/reducers/newSlice/newsDispatchAction';
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
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Noservice from '@screens/externals/NoService/Noservice';
import {
  getToken,
  requestUserPermission,
  notificationListner,
} from '@utils/firebaseUtils';
import {Alert} from 'react-native';
const Stack = createNativeStackNavigator<CoreRoutesParams>();

const options = {
  headerShown: false,
};

export const MainNavigator = () => {
  const {userData, id, userOnboarded} = useSelector(
    (state: RootState) => state.user,
  );

  const [isOffline, setIsOffline] = useState(false);
  const [onBoarderChecked, setOnBoarderChecked] = useState(false);
  const [aggregatorChecked, setAggregatorChecked] = useState(false);
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
    }
    setOnBoarderChecked(true);
  };

  useEffect(() => {
    getOnboarder();

    //run above then hide spashscreen here
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (onBoarderChecked) {
        console.log('All checked');
        SplashScreen.hide();
      }
    }, 3000);
  }, [onBoarderChecked, aggregatorChecked]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  });
  const checkStoredToken = async () => {
    const storedToken = await persistStorage.getString('deviceToken');
    console.log('gettin storedToke', storedToken);
    if (storedToken) {
    } else {
      console.log('getting token');
      const storeThis = await getToken();
      await persistStorage.set('deviceToken', storeThis as string);
    }
  };

  useEffect(() => {
    requestUserPermission();
    notificationListner();

    checkStoredToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('FP News', remoteMessage.notification?.body, [{text: 'OK'}], {
        cancelable: true,
      });
    });

    return unsubscribe;
  }, []);

  const renderApp = () => {
    const list = [
      {
        cond: isOffline,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.NO_SERVICE} component={Noservice} />
          </Fragment>
        ),
      },
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
