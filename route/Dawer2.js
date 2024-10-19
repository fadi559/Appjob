import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../src/Screens/ProfileDrawerpage';
import ProfilePage from '../src/Screens/profile';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import TabNavigtor from './tab';
import MainNavigator from './mainNavigator';
import SettingsScreen from '../src/Screens/SettingsScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
  <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        headerLeft: () => <CustomDrawer navigation={navigation} />,  // Add the drawer button in the header
        headerStyle: {
          backgroundColor: '#3A416F',
        },
        headerTintColor: '#fff',
      })}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={({ navigation }) => ({
          headerLeft: () => <CustomDrawer navigation={navigation} />,  
          title: 'profile',
          height: false,
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Drawer.Navigator>
  );
};


export default DrawerNavigator;