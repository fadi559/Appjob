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





  const Cardd = ({route}) => {
   
  return(
    
    
    
      <View style={styles.container}>
         
  
 
      <View style={styles.box}> 
      
      <View style={{left:"87%"}}>
      <Text style={{right:"40%"}}> jeursalem </Text>
      <Text style={styles.Rating}> { <AirbnbRating size={14} /> }</Text>
      <TouchableOpacity>
      <Avatar 
      
  
          size={45}
          rounded
          icon={{ name: 'rowing' }}
          containerStyle={{ backgroundColor: '#3d4db7' }}
        />
        </TouchableOpacity>
        </View>
        
     
        
          <View>

      <Text style={styles.text} > company </Text>
      <Text style={styles.text} > job type</Text>
      <Text style={styles.text} > string:  </Text>

      </View  >


      <View >
      
      
      <Chatbutton/>
      <Mapbutton/>
      <Conbutton/>
      </View>
      
    
      </View>
     
      </View>
      


    
    )
  }
  

  export default Cardd

  const styles = StyleSheet.create({
    container:{
flex:1,


    },
    box:{
  width: "100%",
  height: 460,
  padding:5,
  backgroundColor:'#dcdcdc',
  borderRadius:22,
  flex:1,
  
      
    },  
  text:{
    left:'80%',
    
    marginVertical: 27,
  },
  text2:{
    left:'90%',
   height: "90%",
  },
  Rating:{

    right:"87%",
    height:9
  }
  })
  //////
  
  const CustomTitle = () => {
   
    return (
      <View style={{ flexDirection: 'column' }}>
        
        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>MAP</Text>
    

      </View>
    );
    };
    const Mapbutton = () => {
      const navigation=useNavigation()
      return (
        <View>
<Button 
      title={<CustomTitle/>}
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
              iconContainerStyle={{ marginLeft:25, marginRight: -10 }}
              onPress={()=> navigation.navigate('loaction')}
              
            />
            </View>
      )
            }
            
          
              const Conbutton = () => {
                return(
                  <View>
          <Button
              title="contact number"
              
              buttonStyle={{
                backgroundColor: '#6495ed',
                borderRadius: 13,
                
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{
                marginHorizontal: -3,
               
                width: 140,
                marginVertical:-73,
              }}
              icon={{
                name: 'phone',
                type: 'FontAwesome',
                size: 30,
                color: 'black',
                
              }}
              iconRight
              onPress={() =>Alert.alert('aa')}
            />
            </View>
      )
            }

            const Chatbutton =(props) =>{
              const navigation=useNavigation();

    
                return(
                  <View>
          <Button
              title="chat"
              
              buttonStyle={{
                backgroundColor: '#6495ed',
                borderRadius: 13,
                height:70,
                width:"99%",
                
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{
                marginHorizontal: -3,
               
                width: 140,
                marginVertical: 14,
              }}
              icon={{
                name:'chat',
                type: 'MaterialIcons',
                size: 30,
                color: 'black',
                
              }}
              iconRight
              onPress={() =>navigation.navigate('Chat')}
            />
            </View>
      )
            }
            


            
          

            