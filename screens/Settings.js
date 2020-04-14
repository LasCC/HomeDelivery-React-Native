import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  DrawerGroup,
  Divider,
  Icon,
  Drawer,
  Layout,
  DrawerItem,
  Text,
} from '@ui-kitten/components';
import Navbar from '../components/Navbar';

export const Settings = ({navigation}) => {
  return (
    <Layout style={styles.containerApp} level="1">
      <Navbar />
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <ImageBackground
              style={styles.header}
              source={{uri: 'https://source.unsplash.com/random'}}
            />

            <Text>Settings de l'app</Text>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerApp: {
    paddingTop: 55,
    paddingBottom: 180,
  },
  container: {
    height: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 15,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    marginTop: 10,
  },
  spinner: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
