import 'react-native-reanimated';
import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-biometrics';
import SplashScreen from 'react-native-splash-screen'
import React ,{Component}from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabnavictor from './route/tab';
import Stacknav from './route/stack';
import MainNavigator from './route/mainNavigator';
import { useContext } from 'react';
import {  UserProvider } from './src/compoments/usercontext';
import { LoadingProvider } from './src/compoments/LoadingContext';
import { useEffect } from 'react';



 const App = () => {
      useEffect(() => {
            // Perform any async tasks, and then hide the splash screen
            const performAsyncTasks = async () => {
                
                SplashScreen.hide(); 
            };
    
            performAsyncTasks();
        }, []); 

      return (
            <View style={{ flex: 1 }}>
                  <UserProvider>
                  <LoadingProvider>
                        <MainNavigator />
                        </LoadingProvider>
                  </UserProvider>
            </View>
      )
 }
      
export default App;

