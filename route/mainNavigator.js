import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigtor from "./tab";
import Stacknav from "./stack";
import Darwernav from "./drawer";
import SignInScreen from "../src/Screens/SignInScreen";
const MainNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator   screenOptions={{
                headerShown: false
            }
            }>
                  <Stack.Screen name="SignInScreen " component={SignInScreen}/> 
                <Stack.Screen name='tab' component={TabNavigtor} />
                <Stack.Screen name='stack' component={Stacknav} />
                <Stack.Screen name='drawer' component={Darwernav} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;