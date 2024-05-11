import { StyleSheet, Text, TextInput, View,Image  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { useAnimatedStyle } from 'react-native-reanimated'
import { FlatList } from 'react-native'
import { UserContext } from '../compoments/usercontext'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import { Api } from '../res/api'
import CustomLoadingSpinner from '../compoments/Loading'
import { useLoading } from '../compoments/LoadingContext'





const Searchbox = (props) => {

  // const {User}=props.route.params

  const {user,setUser}=useContext(UserContext);
  const [searchTerm,setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const animation =useSharedValue(0);
  const [value,setValue]= useState(0);
  const navigation = useNavigation();
  const { showLoader, hideLoader,isLoading } = useLoading();
  

  
// console.log("name",users);
//  console.log('userrs2',users);

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
       hideLoader(false);
      setUsers([]);
      return;
    }
    showLoader(true)
    try {
      const body={"searchTerm":text}
      const response = await fetch(Api.serach,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include the JWT token here if your endpoint requires authentication
        },
        body:JSON.stringify(body)
      });
      const data = await response.json();
      // console.log("data",data);
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      
    
  } finally {
    hideLoader(false)

  }
  };
  
  const Spinner =() =>{
    <View>
      <CustomLoadingSpinner/>
    </View>

  }
  
  const renderUser = ({ item }) => (
    //  console.log("iitt.",item),
    //  console.log("nameee4:",item.name),
    <TouchableOpacity
    style={styles.userRueslt}
      onPress={() => navigation.navigate('drawer', { screen: 'UserProfile', params: { User:item } })}>
         <Avatar size={20} rounded 
       icon={{name:'rowing'}}  
       containerStyle={styles.Avtarstyle}/>
      
      <Text style={styles.userItem}>{item.name}</Text>
    </TouchableOpacity>
  );
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
          onChangeText={text => handleSearch(text)}
          value={searchTerm}
          onSubmitEditing={handleSearch}
        />
        </View>
    
      {searchTerm!== '' && (
        
        <FlatList
          data={users}
          // keyExtractor={item => item._users} 
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}

          style={styles.resultList}
           renderItem={renderUser}
          
          ListEmptyComponent={() => 
            isLoading ? (
              <CustomLoadingSpinner style={styles.spinnerLoading}/>
            ) : users.length === 0 && searchTerm ? (
              <Text style={styles.SerachTermResultFalse}>No user found</Text>
            ) : null
          }
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
    marginTop:1,
    left:7,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
  },
  Avtarstyle:{
    backgroundColor: '#3d4db7',
  },
  userRueslt:{
    flexDirection: 'row',
     marginTop:25,
     left:6,
  },
  SerachResaultEmpty:{
    alignSelf:'center',
    top:70,
    fontSize:20,
  },
  spinnerLoading:{
top:80,
  },
  SerachTermResultFalse:{
    alignSelf:"center",
top:80,    
  }
})
export default Searchbox


