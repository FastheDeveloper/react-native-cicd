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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ReduxProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={onReadyNav}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current?.getCurrentRoute()?.name;
            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <MainNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaView>
  );
}

export default codePush(App);
