import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../src/Screens/chat";
import Tabnavictor from "./tab";
import { StyleSheet, Button } from "react-native";
import ChatScreen from "../src/Screens/ChatScreen";
import Searchbox from "../src/Screens/Searchbox";
import SignInScreen from "../src/Screens/SignInScreen";

import { ScreenStackHeaderBackButtonImage } from "react-native-screens";


const Stacknav = (props, route) => {
  const Stack = createNativeStackNavigator();


  return (

    <Stack.Navigator>
 


      <Stack.Screen 
        name="Chat" 
        component={Chat} 
        options={({ route, navigation }) => ({
          headerLeft: () => (<Button title="Back" onPress={() => navigation.goBack()} />),
        }
      )} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route, navigation }) => (

        {
          headerLeft: () => (<Button title="Back" onPress={() => navigation.goBack()} />),
        }
      )} />

    

    </Stack.Navigator>



  );
}


export default Stacknav;
