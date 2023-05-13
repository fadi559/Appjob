import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabnavictor from './route/tab';
import Stacknav from './route/stack';
import MainNavigator from './route/mainNavigator';


const App = () => {
      return (
            <View style={{ flex: 1 }}>
                 <MainNavigator/>
            </View>

      )

}

export default App;
