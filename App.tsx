import React, {useCallback, useEffect} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import codePush from 'react-native-code-push';

import ReduxProvider from '@core/services/reduxProvider';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from '@navigation/CoreNavigator';
import {isReadyRef, navigationRef} from '@utils/navigationUtils';
import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';
import analytics from '@react-native-firebase/analytics';
function App(): React.JSX.Element {
  const routeNameRef = React.useRef<string | undefined>();

  const onReadyNav = useCallback(() => {
    // @ts-ignore
    isReadyRef.current = true;
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  useEffect(() => {
    crashlytics().log('App mounted.');

    return () => {
      crashlytics().log('App unmouted.');
    };
  }, []);

  // Screen tracking for performance monitoring
  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener(
      'state',
      async () => {
        const routeName = navigationRef.current?.getCurrentRoute()?.name;
        if (routeName) {
          const trace = await perf().startTrace(`navigation_${routeName}`);

          // trace.start();
          console.log(`Navigation to ${routeName} started`);

          return () => {
            trace.stop();
            console.log(`Navigation to ${routeName} ended`);
          };
        }
      },
    );

    return unsubscribe;
  }, []);

  // Screen tracking for performance monitoring
  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      if (currentRoute?.name) {
        analytics().logScreenView({
          screen_name: currentRoute.name,
          screen_class: currentRoute.name,
        });
        console.log(`Screen changed to: ${currentRoute.name}`);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
