import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './screens/Homepage';
import QRcode from './screens/QRcode';

const Stack = createStackNavigator();

// dark mode background color'#222B45';

export default () => (
  <>
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            cardStyle: {backgroundColor: 'white'},
          }}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="QRcode" component={QRcode} />
        </Stack.Navigator>
      </ApplicationProvider>
    </NavigationContainer>
  </>
);

const styles = StyleSheet.create({
  containerApp: {
    marginTop: 55,
  },
});
