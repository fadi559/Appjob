import { NavigationContainer, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { FlatList,ScrollView } from 'react-native';
import Cardd from '../compoments/Cardd';
import { useContext,useCallback,useState,useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Card from '../compoments/Cardd';


const Home = () => {
    
    const { userId, setUserId } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <ScrollView style={styles.ScrollView}>

            <View style={styles.mainview}>
            
         <Cardd/>
             
            </View>

        </ScrollView>




    )
}
const styles = StyleSheet.create({
    ScrollView:{
    backgroundColor:"#EBEFF4",
    },
    mainview:{
        flex:1,
        padding:20,

    },
})

export default Home;











