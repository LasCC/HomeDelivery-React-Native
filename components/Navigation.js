import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QRCode from '../screens/QRcode';
import {Homepage} from '../screens/Homepage';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const CameraIcon = (props) => <Icon {...props} name="camera-outline" />;

const MapIcon = (props) => <Icon {...props} name="map-outline" />;

const Settings = (props) => <Icon {...props} name="settings-2-outline" />;

const {Navigator, Screen} = createBottomTabNavigator();

const UsersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={CameraIcon} />
    <BottomNavigationTab icon={MapIcon} />
    <BottomNavigationTab icon={Settings} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    headerMode="none"
    initialRouteName="Homepage">
    <Screen name="Homepage" component={Homepage} />
    <Screen name="QRCode" component={QRCode} />
    <Screen name="Orders" component={OrdersScreen} />
    <Screen name="UsersScreen" component={UsersScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
