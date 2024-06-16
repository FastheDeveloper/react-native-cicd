import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Pressable, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@store/reducers';
import {MainRoutes} from './routes';

import {HomeIcon, BookIcon, ProfileIcon} from '@lib/icons/tabIcons';
import ProfileNavigator from './ProfileNavigator';

import {MainRoutesParams} from './types';
import {BookMarks} from '@screens/internals/bookmarkScreen';
import {HomeScreen} from '@screens/internals/homeScreen';

const Tab = createBottomTabNavigator<MainRoutesParams>();

const TabComponents = [
  {
    name: MainRoutes.DASHBOARD,
    Icon: HomeIcon,
    screen: HomeScreen,
  },
  {
    name: MainRoutes.BOOKMARKS,
    Icon: BookIcon,
    screen: BookMarks,
  },
  {
    name: MainRoutes.PROFILENAVIGATOR,
    Icon: ProfileIcon,
    screen: ProfileNavigator,
  },
];

const MainNavigatorUI = () => {
  const [showOptions, setShowOptions] = useState(false);

  const tabNavigatorScreenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
  };

  return (
    <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
      {TabComponents.map(({name, screen, Icon}) => {
        return (
          <Tab.Screen
            key={name}
            name={name}
            component={screen}
            options={params => ({
              tabBarIcon: ({focused}) => {
                const isContact = showOptions && !focused;
                return (
                  <Icon
                    color={
                      focused && !showOptions
                        ? 'red'
                        : isContact
                        ? 'red'
                        : 'red'
                    }
                  />
                );
              },
              tabBarStyle: {
                ...isTabStyleVisible(params),
                backgroundColor: 'transparent',
                paddingVertical: 20,
                borderTopWidth: 0,
                paddingBottom: 20,
                height: 80,
                elevation: 0,
              },
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const isTabStyleVisible = ({
  route,
}: {
  route: Partial<Route<string>>;
}): ViewStyle | undefined => {
  let tabBarVisible: ViewStyle | undefined;
  const name = getFocusedRouteNameFromRoute(route);
  const screensWithoutBottomPanel: string[] = [
    //TODO: ADD ROUTES WITHOUT BOTTOMBART
  ];
  if (name && screensWithoutBottomPanel.includes(name)) {
    tabBarVisible = {display: 'none'};
  }

  return tabBarVisible;
};

export const TabNavigator = () => {
  const {id} = useSelector((state: RootState) => state.user);

  return <>{MainNavigatorUI()}</>;
};
