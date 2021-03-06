import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  Card,
  Spinner,
  Avatar,
  Layout,
} from '@ui-kitten/components';
import Navbar from '../components/Navbar';
import axios from 'axios';

const getResponse = async () => {
  try {
    const response = await axios.get('https://reqres.in/api/users');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const Homepage = ({navigation}) => {
  const [data, setdata] = useState(null);
  const [isReady, setisready] = useState(false);
  useEffect(() => {
    getResponse()
      .then((data) => setdata(data))
      .then(() => setisready(true));
  }, []);
  if (isReady && data) {
    return (
      <Layout style={styles.containerApp} level="1">
        <Navbar />
        <React.Fragment>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <Layout style={styles.container}>
                <Text category="h3">Annonces en ligne</Text>
                <Divider style={styles.divider} />
                {data.data.map((callapi, i) => {
                  return (
                    <Card style={styles.card} key={i} status="primary">
                      <Layout
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar source={{uri: callapi.avatar}} />
                        <Text style={{marginLeft: 15}}>
                          {callapi.first_name} {callapi.last_name}
                        </Text>
                      </Layout>
                      <Divider style={styles.divider} />
                      <Text>{callapi.email}</Text>
                    </Card>
                  );
                })}
              </Layout>
            </ScrollView>
          </SafeAreaView>
        </React.Fragment>
      </Layout>
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
});
