import { StyleSheet, Text, TextInput, View, Image  } from 'react-native'
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
// import { Icon } from 'react-native-vector-icons/Icon'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const Searchbox = (props) => {

  // const {User}=props.route.params
  const {user,setUser}=useContext(UserContext);
  const [searchTerm,setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const animation =useSharedValue(0);
  const [value,setValue]= useState(0);
  const navigation = useNavigation();
  const { showLoader, hideLoader,isLoading } = useLoading();
  const [searchMode, setSearchMode] = useState('users'); 
  
// console.log("name",users);
//  console.log('userrs2',users);
//  console.log('searchMode3',searchMode);

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
      setJobs([]);
      return;
    }
    showLoader(true)
    try {
      const body = { searchTerm: text, searchType: searchMode };
      // const body={"searchTerm":text}
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
       console.log("DATA",data);
       if (searchMode === 'users') {
        setUsers(data);
        setJobs([]);
      } else {
        setJobs(data);
        setUsers([]);
      }
    } catch (error) {
      // console.error('Failed to fetch users:', error);
      // console.log("job",setJobs)
      // console.log("job55",setUsers)
    
  } finally {
    hideLoader(false)

  }
  };

  const renderUser = ({ item }) => (
      //  console.log("iitt.",item),
      //   console.log("nameee4:",item.jobType),
    <TouchableOpacity
    style={styles.userRueslt}
    onPress={() =>{
    if (searchMode === 'users') {
       navigation.navigate('drawer', { screen: 'UserProfile', params: { User:item } })
    } else {
      navigation.navigate('drawer', { screen: 'JobProfile', params: { Job: item } });
    }
    }}
      >

{searchMode === 'users' ? (

         <Avatar size={20} rounded 
       icon={{name:'rowing'}}  
       containerStyle={styles.Avtarstyle}/>
      ) : (
        <MaterialIcons name="work"  size={20} rounded 
        
        containerStyle={styles.Avtarstyle2}
      />
    )}
      <Text style={styles.userItem}>{item.name}</Text>
      <Text style={styles.userItem}>{item.jobType}</Text>

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
        <View style={styles.modeSwitchContainer}>
    <TouchableOpacity
      style={[styles.modeButton, searchMode === 'users' ? styles.activeModeButton:{}]}
      onPress={() => setSearchMode('users')}
    >
     <Text style={searchMode === 'users' ? styles.activeModeButtonText : styles.inactiveModeButtonText}>
    Users
  </Text>
    </TouchableOpacity>
    <View style={styles.modeDivider} />
    <TouchableOpacity
      style={[styles.modeButton, searchMode === 'jobs' ? styles.activeModeButton : {}]}
      onPress={() => setSearchMode('jobs')}
    >
      <Text style={searchMode === 'jobs' ? styles.activeModeButtonText :styles.inactiveModeButtonText}>
    Jobs
  </Text>
    </TouchableOpacity>
  </View>
        </View>

  
      {searchTerm!== '' && (
      
        <FlatList
        data={searchMode === 'users' ? users : jobs}
          // data={users}
          // keyExtractor={item => item._users} 
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}

          style={styles.resultList}
           renderItem={renderUser}
          
          ListEmptyComponent={() => 
            isLoading ? (
              <CustomLoadingSpinner style={styles.spinnerLoading}/>
            ) : (searchMode === 'users' && users.length === 0) ||
             (searchMode === 'jobs' && jobs.length === 0) ? (
              <Text style={styles.SerachTermResultFalse}>No {searchMode} found</Text>
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
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    // backgroundColor: 'white', 
    borderRadius: 12,
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeButton: {
    paddingVertical: 8,
  borderRadius: 10, 
  backgroundColor: 'transparent',
  },
  modeDivider: {
   height: 20,
  width: 1,
  backgroundColor: 'black',
  marginHorizontal: 10,
  },
  activeModeButton: {
    color:'#5C7AEA', 
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeModeButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#5C7AEA',
  },
  inactiveModeButtonText: {
    color: 'gray', 
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'gray', 
    borderRadius: 10,
    padding: 24,
    elevation: 5,
  },
  // textInput: {
  //   height: 40,
  //   left:16,
  // },
  resultList: {
    marginTop: 10,
     marginVertical:-230,
    left:13,
    backgroundColor:'white',
    borderRadius:10,
    // width:"110%",
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
  Avtarstyle2:{
  width:20,
  height:20,
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


