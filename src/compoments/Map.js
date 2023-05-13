import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import Loaction from '../Screens/loaction';
    

const Mapp = (props) => {
 
  return (

    <MapView
    style={tw`flex-1`}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
  )
}

export default Mapp

const styles = StyleSheet.create({})