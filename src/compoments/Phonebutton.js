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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <EvilIcons 
                   name="close"
                   size={36}
                   color='black'
                   style={styles.IconButton}
                  />
                </TouchableOpacity>
                
              <View style={styles.text}> 
              <Text > {Phonenumber}</Text>
  
              </View>
             
            </View>

          </View>
          
        </Modal>
  
        <Button
          buttonStyle={styles.buttonStyle}
          icon={{
            name: 'phone',
            type: 'FontAwesome',
            size: 28,
            color: '#252f40',
          }}
         
          iconPosition='bottom'
        
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
    buttonStyle:{
      backgroundColor: '#CED4DA',
      borderRadius: 13,
      borderWidth: 0.2,
      borderColor: '#627594',
      width:90,
      marginVertical:0,
      height:40,
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
           left:60,
           top:-30,
    },
    
    text:{
      top:-18,
      right:5,
    },

  })
   
export default Phonebutton;