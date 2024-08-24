import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../src/Screens/chat";
import Tabnavictor from "./tab";
import { StyleSheet, Button } from "react-native";
import ChatScreen from "../src/Screens/ChatScreen";
import SignupScreen from "../src/Screens/Signup";
import SignIn from "../src/Screens/SignIn";
import UpdateProfileImage from "../src/Screens/UpdateProfileImage";
import Page1 from "../src/Screens/Page1";
import Page2 from "../src/Screens/Page2";
import Page3 from "../src/Screens/Page3";



const Stacknav = () => {
  const Stack = createNativeStackNavigator();


  return (

    <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false,}} >


       <Stack.Screen name="UpdateProfileImage" component={UpdateProfileImage} />
       <Stack.Screen name="Page1" component={Page1} />
       <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="Page3" component={Page3} />
       <Stack.Screen name='SignIn' component={SignIn}/> 
       <Stack.Screen name='SignupScreen' component={SignupScreen} />  
     </Stack.Navigator>



  );
}


export default Stacknav;
