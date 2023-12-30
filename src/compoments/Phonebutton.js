import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackgroundImage, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native'

import { Modal } from 'react-native';
import { useState } from 'react';
import { homeData, users } from '../res/data/data';
import EvilIcons from 'react-native-vector-icons/EvilIcons'



const Phonebutton = (props) => {
    const navigation = useNavigation();
    const {userID} = props
    const [modalVisible, setModalVisible] = useState(false);

    const getUserPhoneNumber = () => {
      return users[userID].phoneNumber
    }
  
    return (
      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
  
              <View style={styles.IconButton}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <EvilIcons 
                   name="close"
                   size={40}
                   color='black'
                   style={{}}
                  />
                </TouchableOpacity>
  
              </View >
              <View  style={{ width:130,height:34}}> 
  
              <Text > number: {getUserPhoneNumber()} </Text>
  
              </View>
  
            </View>
  
  
          </View>
        </Modal>
  
        <Button
          buttonStyle={{
            backgroundColor: '#f5f5f5',
            borderRadius: 13,
            height: 71,
            borderWidth: 0.2,
            borderColor: 'black',
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
          containerStyle={{
            marginHorizontal: -3,
  
            width: 155,
            
          }}
          icon={{
            name: 'phone',
            type: 'FontAwesome',
            size: 30,
            color: 'black',
  
          }}
          iconRight
  
          onPress={() => setModalVisible(true)}>
  
        </Button>
  
  
      </View>
    )
  }

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
    },
    IconButton:{
      left: 82, 
      marginVertical: -20,
       height: 40

    }
  })
   
export default Phonebutton;