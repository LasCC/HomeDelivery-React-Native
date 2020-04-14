import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ThemeContext} from './ThemeContext';

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const MoonIcon = (props) => <Icon {...props} name="moon-outline" />;

const Navbar = ({navigation}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const themeContext = React.useContext(ThemeContext);

  const renderOverflowMenuAction = (props) => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="A propos" />
        <MenuItem
          accessoryLeft={MoonIcon}
          title="Dark mode"
          onPress={themeContext.toggleTheme}
        />
        <MenuItem
          accessoryLeft={SettingsIcon}
          title="Paramètres"
          onPress={() => navigation.navigate('Settings')}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={{uri: 'https://i.imgur.com/f3F04uB.png'}}
      />
      <Text {...props}>Ludovic COULON</Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 20,
  },
});

export default Navbar;
