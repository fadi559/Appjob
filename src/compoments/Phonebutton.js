import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native';
import { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useContext } from 'react';
import { UserContext } from './usercontext';
import CardItem from './CardItem';


const Phonebutton = (props) => {
    const navigation = useNavigation();
    const {Phonenumber} =props
    const [modalVisible, setModalVisible] = useState(false);
    const { user, setUser} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    

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
              
              <View style={styles.text}> 
  
              <Text > Number:{Phonenumber}</Text>
  
              </View>
             
            </View>

          </View>
          
        </Modal>
  
        <Button
          buttonStyle={{
            backgroundColor: '#53618A',
            borderRadius: 13,
            borderWidth: 0.2,
            borderColor: '#627594',
            width:120,
            marginVertical:0,
          }}
          icon={{
            name: 'phone',
            type: 'FontAwesome',
            size: 30,
            color: '#E9ECEF',
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
      height:100,
    },
    IconButton:{
      marginTop:-30,
      left: 82, 
      marginVertical: -20,
       height: 40

    },
    text:{
      marginTop:15,
      right:5,
    },

  })
   
export default Phonebutton;