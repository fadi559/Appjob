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
import SearchButton from "../src/compoments/SearchButton";
import CustomDrawer from "../src/Screens/ProfileDrawerpage";
import { Image } from "react-native-elements";
import ProfileDrawer from "./Dawer2";
import { createDrawerNavigator } from "@react-navigation/drawer";


const TabNavigtor = (props,route,navigation) => {
  
  
  
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  


  return (

    
    
    <SafeAreaProvider >
    <Tab.Navigator  initialRouteName="home" screenOptions={{title:'',
    headerStyle:{backgroundColor:'#3A416F',borderBottomColor:'black',
    borderBottomWidth:0.8,},tabBarActiveTintColor:'#3A416F',}} >

     
<Tab.Screen {...tabsParams(props.navigation).profile} />
      {/* <Tab.Screen {...tabsParams.Nofiction} /> */}
      <Tab.Screen {...tabsParams(props.navigation).share} />
      {/* <Tab.Screen {...tabsParams.loaction} /> */}
      <Tab.Screen {...tabsParams(props.navigation).home} />
    
    </Tab.Navigator>
    </SafeAreaProvider>
    
  )

}



const tabsParams = (navigation,props,route) =>({
 

  profile: {
    
    name: "Profile",
    component: ProfileDrawer,
    options: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        
        <AntDesign name="profile" size={size} />
      ),
    headerShown: false,  // Hide the header for the Profile page
      // headerLeft: () => (
      //   <TouchableOpacity
      //     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      //     style={{ marginLeft: 15 }}
      //   >
      //     <Image
      //       source={require('../src/Images/SettingWhitw2.png')}
      //       style={{ width: 25, height: 25 }}
      //     />
      //   </TouchableOpacity>
      // ),
      
      
       
    
      // <Image source={require('../src/Images/SettingWhitw2.png')} style={{ width: 30, height: 30,}} />
   
        
      
      
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
  // loaction: {
    
  //   name: "loaction",
  //   component: loaction,
  //   options: {
  //     tabBarLabel: 'loaction',
  //     tabBarIcon: ({ color, size }) => (
       
        
  //       <MaterialIcons name="location-on" size={size} color="black"/>
  //     ),
  //   }
  // },

  home: {
    name: "home",
    component: home,
    options: ({ navigation}) => ({
      
      // headerRight: () => (
      //   <Button
      //     onPress={() => navigation.navigate('stack', { screen: 'Chat' })}
      //     icon={{
      //       name: 'chat',
      //       type: 'Entypo'
      //     }}
      //     color="white"
      //     title={'btat'}
      //   />
      
      // ),
      
      headerLeft: () => (
        <SearchButton/>
        // <Searchbox/>
        
      ),
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" size={size} />
      ),
    })
  }
  })



export default TabNavigtor;
