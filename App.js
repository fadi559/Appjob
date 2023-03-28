import 'react-native-gesture-handler';
      import React from 'react';
      import Icon from 'react-native-vector-icons/FontAwesome';
      import {StyleSheet, Text,View,} from 'react-native';
      import { NavigationContainer } from '@react-navigation/native';
      import{AntDesign}from 'react-native-vector-icons/AntDesign'
      import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
      import Tab from './route/tab';
import Tabnavictor from './route/tab';
import Stacknav from './route/stack';
import Drawer from './route/drawer';
import Darwernav from './route/drawer';
import Chat from './src/Screens/chat';
    
      const App=()=>{
            return(
<View style={{flex:1}}>
      <Tabnavictor/>
      
     

</View>

            )
       
      }

      export default App;
    