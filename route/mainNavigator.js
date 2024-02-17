import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigtor from "./tab";
import Stacknav from "./stack";
import Darwernav from "./drawer";
import SignupScreen from "../src/Screens/Signup";
import SignIn from "../src/Screens/SignIn";



const Stack = createNativeStackNavigator();
   
const MainNavigator = (props,route) => {
    
    
// stack is the initial route 
    return (
        
        <NavigationContainer>  
            <Stack.Navigator initialRouteName='stack' screenOptions={{
                headerShown: false,

            }}>
            
                  {/* <Stack.Screen name='SignupScreen' component={SignupScreen}/>  */}
                  {/* <Stack.Screen name='SignInScreen' component={SignIn}/>  */}
                <Stack.Screen name='tab' component={TabNavigtor} />
                <Stack.Screen name='stack' component={Stacknav} />
                <Stack.Screen name='drawer' component={Darwernav} />

            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default MainNavigator;