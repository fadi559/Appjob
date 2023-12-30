import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screens/home'
import Mapp from './Map';
import { AirbnbRating } from '@rneui/themed';
import { BackgroundImage, Button } from '@rneui/base';
import Chat from '../Screens/chat';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native'
import { homeData } from '../res/data/data';
import Ionicons from "react-native-vector-icons/Ionicons"


const Mapbutton = (props) => {

    const navigation = useNavigation()
    return (
      <View>
        <Button
          title={'Map'}
          titleStyle={{ color: "black" }}
          
          buttonStyle={{
            backgroundColor: '#f5f5f5',
            borderWidth: 0.2,
            borderRadius: 13,
            borderColor: 'black',
            height:70,
          }}

          containerStyle={{
            width: 200,
            marginHorizontal: 12,
            marginVertical:0,
          }}
          icon={{
            name: 'map-marker',
            type: 'font-awesome',
            size: 45,
            color: 'black',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 25, marginRight: -10 }}
          onPress={() => navigation.navigate('loaction')}
  
        />
      </View>
    )
  }
  export default Mapbutton;
  