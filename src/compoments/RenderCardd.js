import {StyleSheet, Text, View,FlatList, ScrollView, Share } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useContext,useCallback,useState,useEffect } from 'react';
import { UserContext } from './usercontext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShareScreen from '../Screens/share';
import jwt_decode from "jwt-decode";
import CardItem from './CardItem';
import { Api } from '../res/api';
import UserProfile from '../Screens/UserProfile';




const Card = ({item}) => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const user = decodedToken.user;
      setUser(user);
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
          const response = await axios.get(Api.RenderCard);
          setPosts(response.data);
        } catch (error) {
          console.log("error fetching posts", error);
        }
      };
      //  console.log("renderr:",posts);
  
  return (
  <UserProfile posts={posts} />,

    <View style={styles.container}>
    {posts?.map((post) => (
      <CardItem post={post}/>
      
    ))}
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
    marginTop:30,
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
    borderColor:"#141727",
    borderRadius:7,
    alignSelf: 'center',
    color:'#E9ECEF',
  },
  
})

export default Card;










