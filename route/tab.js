import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from "../src/Screens/home";
import loaction from "../src/Screens/loaction";
import share from "../src/Screens/share";
import nofiction from "../src/Screens/nofiction";
import profile from "../src/Screens/profile";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons"
import Chat from "../src/Screens/chat";
import { Button } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';

const Tabnavictor = () => {
  const Tab = createBottomTabNavigator();

return(
  
  <NavigationContainer>
    
  <Tab.Navigator >
      <Tab.Screen {...tabsParams.profile}/>
      <Tab.Screen {...tabsParams.name}/>
      <Tab.Screen {...tabsParams.share}/>
      <Tab.Screen {...tabsParams.loaction}/>
      <Tab.Screen {...tabsParams.home}/>
    


    </Tab.Navigator>
    </NavigationContainer>
);


  
 
  
  
const navigation=useNavigation();
  const tabsParams = {
   
    
    profile: {
      name: "profile",
      component: profile,
      options: {
        tabBarLabel: 'profile',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="profile" size={size} />
        ),
      }
    },
    name:{
    name:"nofiction",
    component: nofiction,
    options:{
      tabBarLabel: 'nofiction',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="bell" size={size} />
      ),
    
      }
    },
    share:{
      name:"share" ,
      component:share,
        options:{
          tabBarLabel: 'share',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="share" size={size} />
          ),
          }
    },
    loaction:{name:"loaction" ,
    component:loaction,
    options:{
      tabBarLabel: 'loaction',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-location-sharp" size={size} />
      ),
    }
    },
    
  
    home:{
      name:"home",
      component:home,
      
      options:{
       
        headerRight:() => (
          <Button
          
            onPress={() =>navigation.navigate('Chat')}
            icon={{name:'chat',
            type: 'Entypo'}}
            color="white"
          />
        ),
      tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} />
          
        ),
      }
    },
    ////
    //chat:{
    //  name: "Chat",
      //component:Chat,
      //options: {
       // tabBarLabel: 'Chat',
        //tabBarIcon: ({ color, size }) => (
          //<AntDesign name="Chat" size={size} />
       // ),
    //  }
   // }
}
}






export default Tabnavictor;