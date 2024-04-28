import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackgroundImage, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Linking } from 'react-native';



const Conbutton = (props) => {
  const {Phonenumber}=props
  const navigation = useNavigation()
  // console.log("Phonenumber777::",Phonenumber)


  const openWhatsApp = () => {
  //   if (!Phonenumber) {
  //     Alert.alert('Phone number is undefined. Please check the number.');
  //     return;
  // }
    let url = 'whatsapp://send?phone=' + "792"+Phonenumber;

    // Check if WhatsApp is installed
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert('Please install WhatsApp to send a direct message.');
            }
        })
        .catch((err) => console.error('An error occurred', err));
       
};


    return (


      <View>

{/* #53618A */}

        <Button
          buttonStyle={styles.buttonStyle}
          icon={{
            name: 'chat',
            type: 'FontAwesome',
            size: 30,
            color: '#252f40',
            // #E9ECEF
          }}
          onPress={() => openWhatsApp(Phonenumber)}
       />
        
      </View>
    )
  }
  
















  const styles = StyleSheet.create({
    buttonStyle:{
      backgroundColor: '#CED4DA',
            borderRadius: 13,
            borderWidth: 0.2,
            borderColor: '#627594',
            width:120,
            marginHorizontal:40,
            marginVertical:0,
            height:50,
            right:10,
    }
    
  })
  



export default Conbutton;