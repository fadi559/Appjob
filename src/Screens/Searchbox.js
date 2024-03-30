import { StyleSheet, Text, TextInput, View,Image  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { FlatList } from 'react-native'
import { UserContext } from '../compoments/usercontext'
import { useContext } from 'react'


const Searchbox = ({ navigation },props) => {
  
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const {user,setUser}=useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const animation =useSharedValue(0);
  const [value,setValue]= useState(0);



 console.log('userrs2',users);

  const animatdStyle =useAnimatedStyle(() => {
    return{
      width:
      animation.value == 1
      ?withTiming(300, {duration: 500})
      :withTiming(1, {duration: 500}),
    };
  });
   
  const handleSearch = async (text) => {
    setSearchTerm(text)
    if (!text.trim()) {
      setUsers([]);
      return;
    }
    try {
      const body={"searchTerm":text}
      const response = await fetch(`http://localhost:8000/api/search`,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include the JWT token here if your endpoint requires authentication
        },
        body:JSON.stringify(body)
      });
      const data = await response.json();
      console.log("data",data);
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Handle the error (e.g., show an alert)
    }
  };
  return (
    // console.log("user1:",searchTerm),
    // console.log("setUsers:",users),

    <View style={styles.screen}>
    <Animated.View
     style ={[
      {
        width:'30%',
        height:40,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E7E7E7',
        left:'14%',
      },
   animatdStyle
          ]}>
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          onChangeText={text => handleSearch(text)}
          value={searchTerm}
          onSubmitEditing={handleSearch}
        />
      </View>
      {searchTerm!== '' && (
        <FlatList
          data={users}
          keyExtractor={item => item._users} 
          style={styles.resultList}
          renderItem={({ item }) => (
            <Text style={styles.userItem}>{item.name}</Text>
          )}
        />
      )}
    </View>
        <TouchableOpacity onPress={()=>{ 
          setSearchTerm('')
          if(animation.value == 1){
            animation.value = 0;
            setValue(0)

          } else {
            animation.value =1;
            setValue(1)
          }
       }}>
      <Image 
      source={
        value==1
      ?require('../Images/clear2.png') 

      :require('../Images/search-100.png' )}

      style={{width:value==1 ?40:40, height:value==1 ?  30:40,}} />

       </TouchableOpacity>
       </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  searchContainer: {
    backgroundColor: '#E7E7E7',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'gray', 
    borderRadius: 10,
    padding: 24,
    elevation: 5,
  },
  textInput: {
    height: 40,
    left:16,
  },
  resultList: {
    marginTop: 10,
     marginVertical:-230,
    left:13,
    backgroundColor:'white',
    borderRadius:10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height:43, 
    borderRadius:10,
  },
  userItem:{
    marginTop:20,
    left:10,
  },
})
export default Searchbox


