// import 'react-native-gesture-handler';
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import UserProfile from "../src/Screens/UserProfile";
import JobProfile from "../src/Screens/JobProfile";
import { Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Images } from "../src/Images/images";
import Icon from "react-native-ionicons";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Home from "../src/Screens/home";
import ProfilePage from "../src/Screens/profile";

const Drawer = createDrawerNavigator();
const Darwernav = () => {

     return (

          <Drawer.Navigator>
               {/* <Drawer.Screen name="ChatScreen" component={ChatScreen} 
               options={({ route, navigation, }) => (
                    {
                         headerLeft: () => (<Button title="Back"
                          onPress={() => navigation.goBack()} />),
                    }
               )} /> */}
             
  
             
             <Drawer.Screen name='UserProfile' component={UserProfile} 
             options={({ route, navigation, }) => ( {
               headerStyle:{
                    backgroundColor:"#3A416F"
               },
               swipeEdgeWidth:0,
               title:"",
               drawerType:'front',
               headerLeft:()=>( <Button style={styles.Button} 
                    
                    icon={{
                    name:'arrow-back',
                    type:'FontAwesome',
                    color:'white',
                    size:30,
               }}
               onPress={()=>navigation.goBack()}/>),
             })}  /> 




             <Drawer.Screen name='JobProfile' component={JobProfile} 
             options={({ route, navigation, }) => ( {
               headerStyle:{
                    backgroundColor:"#3A416F"
               },
               swipeEdgeWidth:0,
               title:"",
               drawerType:'front',
               headerLeft:()=>( <Button style={styles.Button} 
                    
                    icon={{name:'arrow-back',
                    type:'FontAwesome',
                    style:{backgroundColor:"#3A416F"},
                    size:30,
               }}
               onPress={()=> navigation.navigate('tab', {screen: 'Home' })}
               
               />),
               

             })}  /> 
       
      {/* <Drawer.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      /> */}

          </Drawer.Navigator>
     );

}

const styles = StyleSheet.create({
     Button:{
        backgroundColor:"#3A416F"     
     },
})

export default Darwernav;


