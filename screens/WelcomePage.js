import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Text, Divider, Card, Spinner} from '@ui-kitten/components';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import axios from 'axios';

const getResponse = async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/comments',
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default (props) => {
  const [data, setdata] = useState(null);
  const [isReady, setisready] = useState(false);
  useEffect(() => {
    getResponse()
      .then((data) => setdata(data))
      .then(() => setisready(true));
  }, []);
  if (isReady && data) {
    return (
      <>
        <Navbar />
        <React.Fragment>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={styles.container}>
                <Text category="h3">Annonces récentes</Text>
                <Divider style={styles.divider} />
                {data.map((command, index) => {
                  return (
                    <Card style={styles.card} key={index} status="primary">
                      <Text>{command.email}</Text>
                      <Divider style={styles.divider} />
                      <Text>{command.body}</Text>
                    </Card>
                  );
                })}
              </View>
            </ScrollView>
          </SafeAreaView>
        </React.Fragment>
        <BottomNavbar />
      </>
    );
  }
  return (
    <View style={styles.spinner}>
      <Spinner />
      <Text style={{marginLeft: 15}}>Chargement en cours ..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '83%',
    width: '100%',
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
});
