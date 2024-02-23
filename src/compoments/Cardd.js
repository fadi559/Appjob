import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import Phonebutton from './Phonebutton';
import Conbutton from './Conbutton';
import RatingComponent from './RatingComponent';
import { useContext,useCallback,useState,useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShareScreen from '../Screens/share';




const Card = (props,data,jobType,notes,item) => {
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
    }, []);
    useEffect(() => {
    fetchPosts();
    }, []);

    useFocusEffect(
    useCallback(() => {
        fetchPosts();
    }, [])
    );
    const fetchPosts = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/getposts");
          setPosts(response.data);
        } catch (error) {
          console.log("error fetching posts", error);
        }
      };
    

  return (
    
    <View style={styles.container}>

     
  
      <View style={styles.box}>
        
      
      <Text style={styles.cityName}>getjobLocation</Text>
      
      <RatingComponent style={styles.RatingComponent}/>
       
     
        <View style={styles.Avatar}>
      
             <Avatar
            onPress={()=>
              navigation.navigate('Profile')}
          
              size={45}
              rounded
              icon={{ name: 'rowing' }}
              containerStyle={{ backgroundColor: '#3d4db7' }}/>
         
          <Text style={styles.text}>getname</Text>
          
        </View>
        <Text style={styles.text2} >{jobType}</Text>
        <Text style={styles.text2}  > Nots:getnots </Text>

        <View style={styles.ViewRowButten}>
         
            <Conbutton onPress={() =>
              navigation.navigate('stack',
                { screen: 'Chat' })} />

          <Phonebutton />
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
    borderWidth:0.3,
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
  
  
})


export default Card;










