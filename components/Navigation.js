import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QRCode from '../screens/QRcode';
import {Homepage} from '../screens/Homepage';
import {Settings} from '../screens/Settings';
import {MapJS} from '../screens/Map';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const CameraIcon = (props) => <Icon {...props} name="camera-outline" />;

const MapIcon = (props) => <Icon {...props} name="map-outline" />;

const SettingsIcons = (props) => <Icon {...props} name="settings-2-outline" />;

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={CameraIcon} />
    <BottomNavigationTab icon={MapIcon} />
    <BottomNavigationTab icon={SettingsIcons} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    headerMode="none"
    initialRouteName="Homepage">
    <Screen name="Homepage" component={Homepage} />
    <Screen name="QRCode" component={QRCode} />
    <Screen name="Map" component={MapJS} />
    <Screen name="Settings" component={Settings} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
