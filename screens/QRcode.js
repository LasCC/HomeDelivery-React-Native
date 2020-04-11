import React, {useRef, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  Input,
  Datepicker,
  Button,
  Modal,
  Card,
  Icon,
  Autocomplete,
  AutocompleteItem,
} from '@ui-kitten/components';
import {MomentDateService} from '@ui-kitten/moment';
import {captureRef} from 'react-native-view-shot';
import QRCode from 'react-native-qrcode-svg';
import Navbar from '../components/Navbar';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const DownloadIcon = (props) => <Icon {...props} name="download-outline" />;
const imageIcon = (props) => <Icon {...props} name="image-outline" />;
const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const useCapture = () => {
  const captureViewRef = useRef();

  function onCapture() {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      (uri) => alert(uri),
      (error) => alert('Oops, snapshot failed', error),
    );
  }

  return {
    captureViewRef,
    onCapture,
  };
};

const motifs = [
  {title: 'Travail'},
  {title: 'Courses'},
  {title: 'Sante'},
  {title: 'Famille'},
  {title: 'Sport'},
  {title: 'Judiciaire'},
  {title: 'Missions'},
];

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

export default (props) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [naissance, setNaissance] = useState(moment().format('DD/MM/YYYY'));
  const [ville_naissance, setVille_naissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [sortie, setSortie] = React.useState();
  const [sortieHeure, setSortieHeure] = useState(moment().format('LT'));

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(motifs);

  const onSelect = (index) => {
    setValue(motifs[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(motifs.filter((item) => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  const [visible, setVisible] = React.useState(false);
  const dateService = new MomentDateService();

  const {captureViewRef, onCapture} = useCapture();

  const qrcodevalue = `Cree le ${moment().format(
    'DD/MM/YYYY',
  )} a ${moment().format(
    'LT',
  )}; Nom: ${nom}; Prenom: ${prenom}; Naissance: ${naissance} a ${ville_naissance}; Adresse: ${adresse}; Sortie: ${sortie.format(
    'DD/MM/YYYY',
  )} a ${sortieHeure}; Motifs: ${value}`;

  return (
    <View style={styles.containerApp} ref={captureViewRef}>
      <Navbar />
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              <Text category="h3">Générateur d'attestation</Text>
              <Divider style={styles.divider} />
              <Text style={{marginBottom: 15}}>
                Veuillez remplir le formulaire pour pouvoir génerer votre QRCode
              </Text>
              <Input
                style={styles.inputs}
                placeholder="COULON"
                defaultValue={nom}
                autoCorrect={false}
                onChangeText={(nom) => setNom(nom)}
                caption="Nom de famille"
              />
              <Input
                style={styles.inputs}
                placeholder="Ludovic"
                value={prenom}
                autoCorrect={false}
                onChangeText={(prenom) => setPrenom(prenom)}
                caption="Prénom"
              />
              <Input
                style={styles.inputs}
                placeholder="11//04/2020"
                autoCorrect={false}
                value={naissance}
                onChangeText={(naissance) => setNaissance(naissance)}
                caption="Date de naissance"
              />
              <Input
                style={styles.inputs}
                placeholder="Paris 11e"
                caption="Ville de naissance"
                autoCorrect={false}
                autoCompleteType="street-address"
                value={ville_naissance}
                onChangeText={(ville_naissance) =>
                  setVille_naissance(ville_naissance)
                }
              />
              <Input
                style={styles.inputs}
                placeholder="12 rue des fleures"
                caption="Adresse de votre domicile"
                autoCorrect={false}
                autoCompleteType="street-address"
                value={adresse}
                onChangeText={(adresse) => setAdresse(adresse)}
              />

              <Datepicker
                dateService={dateService}
                style={styles.inputs}
                placeholder="Date de sortie"
                autoCorrect={false}
                caption="Veuillez sélectionner la date de sortie"
                accessoryRight={CalendarIcon}
                date={sortie}
                onSelect={(sortie) => setSortie(sortie)}
              />

              <Input
                style={styles.inputs}
                placeholder=""
                caption="Heure de sortie"
                keyboardType={'numeric'}
                autoCorrect={false}
                value={sortieHeure}
                onChangeText={(sortieHeure) => setSortieHeure(sortieHeure)}
              />
              <Autocomplete
                style={styles.inputs}
                autoCorrect={false}
                placeholder="Courses, Sport, Famille..."
                caption="Saisissez un motif de sortie"
                value={value}
                onSelect={onSelect}
                onChangeText={onChangeText}>
                {data.map(renderOption)}
              </Autocomplete>
              <Button
                onPress={() => setVisible(true)}
                style={{marginTop: 15}}
                accessoryRight={DownloadIcon}>
                Générer votre attestation
              </Button>
              <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                  <Text>
                    Avant de télécharger l'attestation veuillez à bien vérifier
                    les informations que vous avez renseigné.
                  </Text>
                  <Divider style={styles.divider} />
                  <View style={styles.qrcode}>
                    <QRCode value={qrcodevalue} size={250} />
                  </View>
                  <Button
                    onPress={onCapture}
                    style={{marginTop: 15}}
                    accessoryRight={imageIcon}>
                    Prendre une capture d'écran
                  </Button>
                </Card>
              </Modal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  containerApp: {
    paddingTop: 55,
    paddingBottom: 180,
    backgroundColor: 'white',
  },
  container: {
    height: '100%',
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 15,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputs: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrcode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
