import { StyleSheet, Text, TextInput, View, Image  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { FlatList } from 'react-native'
import { UserContext } from '../compoments/usercontext'
import { useContext } from 'react'
import { useNavigation,DrawerActions } from '@react-navigation/native'
import JobProfile from './JobProfilepage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

  
    
    
    const CustomDrawer = ({navigation}) => {
    
          return (

    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 10 }}
    >
     <Image source={require('../Images/SettingWhitw2.png')} style={{ width: 30, height: 30,}} />
    </TouchableOpacity>
  );

      };
        
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
  })
  export default CustomDrawer ;


