import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackgroundImage, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';


const Conbutton = (props) => {
  const navigation = useNavigation()
    return (

      <View>
  
        <Button

          buttonStyle={{
            backgroundColor: '#53618A',
            borderRadius: 13,
            borderWidth: 0.2,
            borderColor: '#627594',
            width:120,
            marginHorizontal:40,
            marginVertical:0,
            height:50,
            right:10,
          }}
          
            
          
          icon={{
            name: 'chat',
            type: 'FontAwesome',
            size: 30,
            color: '#E9ECEF',
          }}
          onPress={() =>
            navigation.navigate('stack',
              { screen: 'Chat' })} />
        
      </View>
    )
  }
  



export default Conbutton;