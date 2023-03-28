import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import home from "../src/Screens/home";
import loaction from "../src/Screens/loaction";
import share from "../src/Screens/share";
import nofiction from "../src/Screens/nofiction";
import profile from "../src/Screens/profile";
import Chat from "../src/Screens/chat";
import Tabnavictor from "./tab";


const Stacknav = () =>{
  const Stack =createNativeStackNavigator();

  
    return(
      <NavigationContainer>
        
        <Stack.Navigator>
      <Stack.Screen name=" Chat" component={ Chat}/>
     
      
      

        </Stack.Navigator>
      </NavigationContainer>

     );
    }
  

       export default Stacknav;