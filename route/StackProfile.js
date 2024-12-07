import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../src/Screens/chat";
import Tabnavictor from "./tab";
import { StyleSheet, Button, Image } from "react-native";
import ChatScreen from "../src/Screens/ChatScreen";
import SignupScreen from "../src/Screens/Signup";
import SignIn from "../src/Screens/SignIn"
import AddSkills from "../src/Screens/AddSkills";
import AddExperience from "../src/Screens/AddExperience";
import SearchScreen22 from "../src/Screens/NewSearchBar";




const StackPro = (props, route) => {
  
  const Stack = createNativeStackNavigator();
  return (

    <Stack.Navigator screenOptions={{
      headerShown:false}}>

       <Stack.Screen name='AddSkills' component={AddSkills}
       options={({route,navigation})=>({
        
        })} /> 
        <Stack.Screen name='AddExperience' component={AddExperience}
       options={({route,navigation})=>({
        
        })} /> 



     </Stack.Navigator>
  );
}
export default StackPro;

const styles = StyleSheet.create({
   skillsStyle:{
    width:40,
    height:40,
    color:'black',
   }
})
