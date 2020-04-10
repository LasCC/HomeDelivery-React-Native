import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const CameraIcon = (props) => <Icon {...props} name="camera-outline" />;

const MapIcon = (props) => <Icon {...props} name="map-outline" />;

const Settings = (props) => <Icon {...props} name="settings-2-outline" />;

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};

const BottomNavbar = ({navigation}) => {
  const bottomState = useBottomNavigationState();

  return (
    <BottomNavigation style={styles.bottomNavigation} {...bottomState}>
      <BottomNavigationTab
        icon={HomeIcon}
        onPress={() => navigation.navigate('Homepage')}
      />
      <BottomNavigationTab
        icon={CameraIcon}
        onPress={() => this.props.navigation.navigate('QRcode')}
      />
      <BottomNavigationTab icon={MapIcon} />
      <BottomNavigationTab icon={Settings} />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default BottomNavbar;
