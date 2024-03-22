import { NavigationContainer, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { FlatList,ScrollView } from 'react-native';
import Cardd from '../compoments/RenderCardd';
import { useContext,useCallback,useState,useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Card from '../compoments/RenderCardd';


const Home = () => {
    
    
      
  
    return (
        <ScrollView style={styles.ScrollView}>

            <View style={styles.mainview}>
            
         <Cardd/>
             
            </View>

        </ScrollView>




    )
}
const styles = StyleSheet.create({
    ScrollView:{
    backgroundColor:"#EBEFF4",
    },
    mainview:{
        flex:1,
        padding:20,

    },
})

export default Home;











