// import 'react-native-gesture-handler';
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import UserProfile from "../src/Screens/UserProfile";

import { Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Images } from "../src/Images/images";
import Icon from "react-native-ionicons";
import EvilIcons from 'react-native-vector-icons/EvilIcons'


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
               headerLeft:()=>(<Button style={styles.Button} 
                    icon={{name:'arrow-back',
                    type:'FontAwesome',
                    style:{color:'white', backgroundColor:"white"},
                    size:25,
               }}
                    
               onPress={()=>navigation.goBack()}/>),
             }

             )}
     /> 
          </Drawer.Navigator>
     );

}

const styles = StyleSheet.create({
     Button:{
        backgroundColor:"white"
       
          
     }
})

export default Darwernav;


