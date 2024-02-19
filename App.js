import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-biometrics';


import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabnavictor from './route/tab';
import Stacknav from './route/stack';
import MainNavigator from './route/mainNavigator';
import { useContext } from 'react';
import {  UserProvider } from './src/compoments/usercontext';

const App = () => {
      return (
            <View style={{ flex: 1 }}>
                  <UserProvider>
                        <MainNavigator />
                  </UserProvider>
            </View>
      )
}

export default App;
