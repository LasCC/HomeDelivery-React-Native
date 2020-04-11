import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  Input,
  Calendar,
  Button,
  Modal,
  Card,
  Icon,
} from '@ui-kitten/components';
import {MomentDateService} from '@ui-kitten/moment';
import Navbar from '../components/Navbar';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const DownloadIcon = (props) => <Icon {...props} name="download-outline" />;

export default (props) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [naissance, setNaissance] = useState(moment().format('DD/MM/YYYY'));
  const [ville_naissance, setVille_naissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [sortie, setSortie] = React.useState(moment().format('DD/MM/YYYY'));
  const [sortieHeure, setSortieHeure] = useState(moment().format('LT'));
  const [motifs, setMofifs] = useState('');

  const [visible, setVisible] = React.useState(false);
  const dateService = new MomentDateService();

  const qrcodevalue = `Cree le ${moment().format(
    'DD/MM/YYYY',
  )} a ${moment().format(
    'LT',
  )}; Nom: ${nom}; Prenom: ${prenom}; Naissance: ${naissance} a ${ville_naissance}; Adresse: ${adresse}; Sortie: ${sortie} a ${sortieHeure}; Motifs: ${motifs}`;

  return (
    <View style={styles.containerApp}>
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
                onChangeText={(nom) => setNom(nom)}
                caption="Nom de famille"
              />
              <Input
                style={styles.inputs}
                placeholder="Ludovic"
                value={prenom}
                onChangeText={(prenom) => setPrenom(prenom)}
                caption="Prénom"
              />
              <Input
                style={styles.inputs}
                placeholder="11//04/2020"
                value={naissance}
                onChangeText={(naissance) => setNaissance(naissance)}
                caption="Date de naissance"
              />
              <Input
                style={styles.inputs}
                placeholder="Paris 11e"
                caption="Ville de naissance"
                value={ville_naissance}
                onChangeText={(ville_naissance) =>
                  setVille_naissance(ville_naissance)
                }
              />
              <Input
                style={styles.inputs}
                placeholder="12 rue des fleures"
                caption="Adresse de votre domicile"
                value={adresse}
                onChangeText={(adresse) => setAdresse(adresse)}
              />
              <Text>Veuillez sélectionner la date de sortie</Text>
              <Calendar
                dateService={dateService}
                style={styles.inputs}
                placeholder="Date de sortie"
                value={sortie}
                onSelect={(sortie) => setSortie(sortie.format('DD/MM/YYYY'))}
              />
              <Input
                style={styles.inputs}
                placeholder=""
                caption="Heure de sortie"
                keyboardType={'numeric'}
                value={sortieHeure}
                onChangeText={(sortieHeure) => setSortieHeure(sortieHeure)}
              />
              <Input
                style={styles.inputs}
                placeholder="Motif de sortie"
                caption="Sélectionnez un motif de sortie"
                value={motifs}
                onChangeText={(motifs) => setMofifs(motifs)}
              />
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
                  <Text style={{marginBottom: 15}}>
                    Avant de télécharger l'attestation veuillez à bien vérifier
                    les informations que vous avez renseigné.
                  </Text>
                  <Button onPress={() => setVisible(false)}>DISMISS</Button>
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
});