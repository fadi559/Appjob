import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screens/home'
import Mapp from './Map';
import { AirbnbRating } from '@rneui/themed';
import { Button } from '@rneui/base';
import { Avatar } from '@rneui/themed'
import Loaction from '../Screens/loaction';
import Icon from 'react-native-ionicons'
import Chat from '../Screens/chat';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tabnavictor from '../../route/tab';
import { Modal} from 'react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { homeData } from '../res/data/data';
import Faa from '../Screens/Faa';



const Card = (props) => {
  const navigation = useNavigation()

  return (

    <View style={styles.container}>
      <View style={styles.box}>

        <View style={styles.Avatar}>
          <Text style={{ right: "40%" }}> jeursalem </Text>
          <Text style={styles.Rating}> {<AirbnbRating size={14} />}</Text>
          
          <TouchableOpacity>
            <Avatar
              size={45}
              rounded
              icon={{ name: 'rowing' }}
              containerStyle={{ backgroundColor: '#3d4db7' }}
            />
          </TouchableOpacity>
          <Text style={styles.text2}  key={homeData}> company </Text>
          <Text style={styles.text2}  key={homeData}> job type</Text>
        </View>

        <View>
        
          
          
          <Text style={styles.text}  key={homeData} > string:  </Text>
        </View>


        <View style={{ marginVertical: 143,}}>
          <Conbutton text={'chat'}onPress={() => navigation.navigate('stack', { screen: 'Chat' })} />
          <Mapbutton />
        <Chatbutton/>
        </View>

      </View>
    </View>
  )
}


export default Card

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: "100%",
    height: 460,
    padding: 5,
    backgroundColor: '#dcdcdc',
    borderRadius: 22,
    flex: 1,
  },
  text: {
    left: '80%',
    marginVertical: 44,
  },
  text2: {
    marginVertical: 10,
    left:-22
  },
  Rating: {
    right: "87%",
    height: 4,
  },
  Avatar:{
    left:296,
    
  },
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
      shadowOffset: {
        width: 0,
        height: 2,
      },
    }
})

const CustomTitle = () => {

  return (
    <View style={{ flexDirection: 'column' }}>

      <Text style={{ fontWeight: 'bold', fontSize: 40 }}>MAP</Text>


    </View>
  );
};

const Mapbutton = (props) => {
  const navigation = useNavigation()
  return (
    <View>
      <Button
        title={<CustomTitle />}
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}


        buttonStyle={{

          borderColor: 'transparent',

        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 141,
          marginVertical: 1,
        }}
        icon={{
          name: 'map-marker',
          type: 'font-awesome',
          size: 40,
          color: 'white',
        }}

        iconRight
        iconContainerStyle={{ marginLeft: 25, marginRight: -10 }}
        onPress={() => navigation.navigate('loaction')}

      />
    </View>
  )
}

const Conbutton = (props) => {
  return (
    <View>
      <Button
        title={props.text}

        buttonStyle={{
          backgroundColor: '#6495ed',
          borderRadius: 13,

        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: -3,

          width: 140,
          marginVertical: -73,
        }}
        icon={{
          name: 'phone',
          type: 'FontAwesome',
          size: 30,
          color: 'black',

        }}
        iconRight
        onPress={props.onPress}
      />
    </View>
  )
}
const Chatbutton = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View>
         <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>contact number:</Text>
            <Button 
            icon={{
              name:'close',
              type:"Ionicons",
              size:10,
              color:'black',
              iconStyle:{height:15}
              
              
              
            }}
            
            onPress={() => setModalVisible(false)}/>
          
         
          </View>
        </View>
      </Modal>
      <Button
        title={'contact'}
        buttonStyle={{
          backgroundColor: '#6495ed',
          borderRadius: 13,
          height:71,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23}}
        containerStyle={{
          marginHorizontal: -3,

          width: 140,
          marginVertical: -73,
        }}
        icon={{
          name: 'chat',
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






