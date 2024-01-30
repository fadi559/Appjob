import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screens/home'
import Mapp from './Map';
import { BackgroundImage, Button } from '@rneui/base';
import { Avatar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
 import { TouchableOpacity } from 'react-native'
import { homeData } from '../res/data/data';
import Ionicons from "react-native-vector-icons/Ionicons"
import Mapbutton from './Mapbutton';
import Phonebutton from './Phonebutton';
import Conbutton from './Conbutton';
import { users } from '../res/data/data';
import Searchbox from '../Screens/Searchbox';
import RatingComponent from './RatingComponent';


const Card = (props,data) => {
  const navigation = useNavigation()
  const userID ='4'
  
  const getCompnyname =()=>{
    return users[userID].compnayName
  }
  const getJoptype=()=>{
    return users[userID].Joptype
  }
  const getnots =()=>{
    return users[userID].nots
  }
  const getjobLocation=()=>{
    return users[userID].jobLocation
  }
  return (

    <View style={styles.container}>

      <View style={styles.box}>
        
      <Text style={styles.cityName}> {getjobLocation()} </Text>

      <RatingComponent style={styles.RatingComponent}/>
       
     
        <View style={styles.Avatar}>
       {/* <Text> {users[4].avatar}  </Text> */}
             <Avatar
            onPress={()=>
              navigation.navigate('Profile')}
          
              size={45}
              rounded
              icon={{ name: 'rowing' }}
              containerStyle={{ backgroundColor: '#3d4db7' }}/>
         
          <Text style={styles.text}> {getCompnyname()} </Text>
          
        </View>
        <Text style={styles.text2} key={homeData}>{getJoptype()} </Text>
        <Text style={styles.text2} key={homeData} > Nots: {getnots()} </Text>

        <View style={styles.ViewRowButten}>
         
            <Conbutton onPress={() =>
              navigation.navigate('stack',
                { screen: 'Chat' })} />

          <Phonebutton userID={userID} />
          
    

        </View>
        
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Avatar:{
    marginTop:-50,

  },

  ViewRowButten: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'',
    marginVertical:100,
    marginLeft:20,
    
  },
  viewconButten: {
    marginTop: -10,
    left:350,
    width:150,
  },
  box: {
    width: "100%",
    height:330,
    padding: 5,
    backgroundColor: '#3A416F',
    borderRadius: 22,
    flex: 1,
  },
  text: {
    marginTop:1,
    marginVertical: 1,
    marginBottom:15,
    color:'#E9ECEF',
  },
  text2: {
    marginVertical: 30,
    marginBottom:-8,
    color:'#E9ECEF',
  },
  cityName: {
    borderWidth:0.2,
    borderColor:"#141727",
    borderRadius:7,
    alignSelf: 'center',
    color:'#E9ECEF',
    
    
  },
  RatingComponent:{
   
  },

})


export default Card;










