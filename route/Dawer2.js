import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfilePage from '../src/Screens/profile';



const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="ProfilePage">
      <Drawer.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }} // Hide header if needed
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen} // Add other options you want in the drawer
        options={{ title: 'Settings' }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
