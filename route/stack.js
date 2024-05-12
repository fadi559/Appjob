import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../src/Screens/chat";
import Tabnavictor from "./tab";
import { StyleSheet, Button } from "react-native";
import ChatScreen from "../src/Screens/ChatScreen";
import SignupScreen from "../src/Screens/Signup";
import SignIn from "../src/Screens/SignIn";





const Stacknav = () => {
  const Stack = createNativeStackNavigator();


  return (

    <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false,}} >

         {/* <Stack.Screen 
        name="Chat" 
        component={Chat} 
        options={({ route, navigation }) => ({ 
          headerLeft: () => (<Button title="Back" onPress={() => navigation.goBack()} />),
        }
       
      )} /> */}

       <Stack.Screen name='SignIn' component={SignIn}/> 
       <Stack.Screen name='SignupScreen' component={SignupScreen} />    
     </Stack.Navigator>



  );
}


export default Stacknav;
