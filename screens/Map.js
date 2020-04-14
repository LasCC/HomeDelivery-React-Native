import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  Layout,
  Button,
  Card,
  Icon,
  ListItem,
  List,
} from '@ui-kitten/components';
import {Popup, showLocation} from 'react-native-map-link';
import Navbar from '../components/Navbar';
import cityData from '../data/map';

const ArrowUp = (props) => (
  <Icon {...props} name="diagonal-arrow-right-up-outline" />
);

const data = new Array(3).fill({
  title: 'Liste de course n°',
  description: "Description de l'article",
});

export const MapJS = () => {
  const [isVisible, setisVisible] = useState(false);
  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );
  return (
    <Layout style={styles.containerApp} level="1">
      <Navbar />
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Layout style={styles.container}>
              <Text category="h4">Itineraires de vos annonces</Text>
              <Divider style={styles.divider} />
              {cityData.map((city, i) => {
                return (
                  <Card style={styles.card} key={i}>
                    <Text category="h5">{city.title}</Text>
                    <Divider style={styles.divider} />
                    <List
                      data={data}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                      style={{marginBottom: 15}}
                    />
                    <Popup
                      isVisible={isVisible}
                      onCancelPressed={() => setisVisible(false)}
                      onAppPressed={() => setisVisible(false)}
                      onBackButtonPressed={() => setisVisible(false)}
                      options={city}
                    />
                    <Button
                      appearance="outline"
                      accessoryRight={ArrowUp}
                      onPress={() => setisVisible(true)}>
                      Lancer l'itineraire
                    </Button>
                    <Button
                      appearance="ghost"
                      status="basic"
                      onPress={() => showLocation(city)}>
                      Utiliser l'application par defaut
                    </Button>
                  </Card>
                );
              })}
            </Layout>
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
