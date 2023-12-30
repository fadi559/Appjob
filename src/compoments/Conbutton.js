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
            backgroundColor: '#f5f5f5',
            borderRadius: 13,
            borderWidth: 0.2,
            borderColor: 'black',
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
          containerStyle={{
            right:-12,
          }}
          icon={{
            name: 'chat',
            type: 'FontAwesome',
            size: 30,
            color: 'black',
          }}
          onPress={() =>
            navigation.navigate('stack',
              { screen: 'Chat' })} />
        
      </View>
    )
  }
  



export default Conbutton;