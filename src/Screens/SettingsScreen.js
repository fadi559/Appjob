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

  
    
    const SettingsScreen = () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    );
    
    export default SettingsScreen