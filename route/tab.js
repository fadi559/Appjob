import React from "react";
import { NavigationContainer, TabRouter, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from "../src/Screens/home";
import loaction from "../src/Screens/loaction";
import share from "../src/Screens/share";
import Profile from "../src/Screens/profile";
import Nofiction from "../src/Screens/nofiction";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, color } from "@rneui/base";
import Icon from "react-native-ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Searchbox from "../src/Screens/Searchbox";
import { TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const TabNavigtor = (props, Route) => {
  const Tab = createBottomTabNavigator();

  const navigation = useNavigation();



  return (

    <SafeAreaProvider >
    <Tab.Navigator  initialRouteName="home" screenOptions={{title:''}} >

     
      <Tab.Screen {...tabsParams.profile }  />
      {/* <Tab.Screen {...tabsParams.Nofiction} /> */}
      <Tab.Screen {...tabsParams.share} />
      <Tab.Screen {...tabsParams.loaction} />
      <Tab.Screen {...tabsParams.home} />
    

    </Tab.Navigator>
    </SafeAreaProvider>
  )

}



const tabsParams ={

  profile: {
    name: "Profile",
    component: Profile,
    options: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="profile" size={size} />
      ),
    }
  },
  //  Nofiction: {
  //   name: "Nofiction",
  //   component: Nofiction,
  //   options: {
  //     tabBarLabel: 'nofiction',
  //     tabBarIcon: ({ color, size }) => (
  //       <MaterialCommunityIcons name="bell" size={size} />
  //     ),
  //   }
  // },
  share: {
    name: "share",
    component: share,
    options: {
      tabBarLabel: 'share',
      tabBarIcon: ({ color, size }) => (
        <Icon name="share" size={size} />
      ),
    }
  },
  loaction: {
    
    name: "loaction",
    component: loaction,
    options: {
      tabBarLabel: 'loaction',
      tabBarIcon: ({ color, size }) => (
       
        
        <MaterialIcons name="location-on" size={size} color="black"/>
      ),
    }
  },

  home: {
    name: "home",
    component: home,
    options: ({ navigation}) => ({
      
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('stack', { screen: 'Chat' })}
          icon={{
            name: 'chat',
            type: 'Entypo'
          }}
          color="white"
          title={'btat'}
        />
      
      ),
      headerLeft: () => (
        <Searchbox/>
      ),
      
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" size={size} />
      ),

      
      
      
     
    })
    
    
  },

};

export default TabNavigtor;
