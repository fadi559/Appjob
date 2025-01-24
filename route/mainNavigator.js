import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigtor from "./tab";
import Stacknav from "./stack";
import Darwernav from "./drawer";
import SignupScreen from "../src/Screens/Signup";
import SignIn from "../src/Screens/SignIn";
import StackPro from "./StackProfile";
import CustomLoadingSpinner from "../src/compoments/Loading";
import Search from "../src/Screens/Search";
import ProfileDrawer from "./Dawer2";
import DrawerNavigator from "./Dawer2";
import CustomDrawer from "../src/Screens/ProfileDrawerpage";
import SearchScreen22 from "../src/Screens/NewSearchBar";
import { RollInLeft, SlideInLeft, SlideInRight, SlideOutDown, SlideOutRight } from "react-native-reanimated";
import ResaultPage from "../src/Screens/ResaultPage";


const Stack = createNativeStackNavigator();
   
const MainNavigator = (props,route) => {
    
    
// stack is the initial route 
    return (
        
        <NavigationContainer>  
             {/* <CustomLoadingSpinner /> */}
            <Stack.Navigator initialRouteName='stack' screenOptions={{
                headerShown: false,
               

            }}>
                <Stack.Screen name='StackProfile' component={StackPro} options={({presentation:"containedModal"})}/>
                <Stack.Screen name='tab' component={TabNavigtor} />
                <Stack.Screen name='stack' component={Stacknav} />
                <Stack.Screen name='drawer' component={Darwernav} />
                <Stack.Screen name='Search' component={Search} />
                <Stack.Screen name='ResaultPage' component={ResaultPage} />
                <Stack.Screen
          name="SearchScreen22"
          component={SearchScreen22}
         
          options={{
            animation:'slide_from_left',
            animationDuration:140,   ///the one how make the pag movies faster =
            
           
          }}
          
          />

            </Stack.Navigator>
            
        </NavigationContainer>
        
    )
}


export default MainNavigator;