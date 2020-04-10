import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import WelcomePage from './screens/WelcomePage';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        <WelcomePage />
      </View>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
  },
});
