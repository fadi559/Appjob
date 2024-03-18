import { StyleSheet, Text, TextInput, View,Image,useEffect, Modal  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-ionicons'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { JobAplicant, homeData, users } from '../res/data/data'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { searchData } from '../res/data/data'
import { UserContext } from '../compoments/usercontext'
import { useContext } from 'react'


const Searchbox = ({ navigation },props) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const {user,setUser}=useContext(UserContext);
  const animation =useSharedValue(0);
  const [value,setValue]= useState(0);
// console.log('userr',user);
  const animatdStyle =useAnimatedStyle(() => {
    return{
      width:
      animation.value == 1
      ?withTiming(300, {duration: 500})
      :withTiming(1, {duration: 500}),
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setUser([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/search?q=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Handle the error (e.g., show an alert)
    }
  };


  return (
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
          onChangeText={setSearchTerm}
          value={searchTerm}
          onSubmitEditing={handleSearch}
        />
      </View>
      {searchTerm!== '' && (
        <FlatList
          data={user}
          keyExtractor={item => item._user} 
          style={styles.resultList}
          renderItem={({ item }) => (
            <Text style={styles.userItem}>{item.name}</Text> // Adjust to match your user schema
          )}
        />
      )}
      
      
    </View>
       
        <TouchableOpacity onPress={()=>{ 
  
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
    marginTop: 8,
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
  
})
export default Searchbox


// const handleSearch = (query) => {
//   setSearchQuery(query);
//   const filteredResults = searchData  .filter((result) =>
//     result.toLowerCase().includes(query.toLowerCase())
//   );
//   setSearchResults(filteredResults);
// };

// const renderItem = ({ item }) => (
//   <TouchableOpacity style={styles.resultItem} onPress={() => handleResultPress(item)}>
//     <Text>{item}</Text>
//   </TouchableOpacity>
// );


// const handleResultPress = (result) => {
//   // Handle the selected result (e.g., navigate or perform an action)
//   console.log('Selected result:', result);
//   // For example, you can navigate to a details screen
//   // navigation.navigate('Details', { result });
// };
