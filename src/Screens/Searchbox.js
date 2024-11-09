import { StyleSheet, Text, TextInput, View, Image ,Modal } from 'react-native'
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
import JobProfile from './JobProfile'



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
  const [results, setResults] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);


console.log("RESualt55:",results)
console.log("SETresulat344:",setResults)

  
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

 
  const handleSearch = async (text = searchTerm) => {
    setSearchTerm(text);
    if (!text.trim() && selectedOptions.length === 0) {
      hideLoader();
      setResults([]);
      return;
    }
    showLoader(true);
    try {
      const body = {};
  
      if (text.trim()) {
        body.searchTerm = text;
      }
      if (selectedOptions.includes('Skills')) {
        body.skills = {
          $regex: text,
          $options: 'i',
        };
      }
      if (selectedOptions.includes('Experience')) {
        body.experiences = {
          $regex: text,
          $options: 'i',
        };
      }
  
      const response = await fetch(Api.filterData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
  
      if (responseData && responseData.data) {
        setResults(responseData.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      hideLoader();
    }
  };
  
  const toggleFilterOption = (option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option];
  
      handleSearch(); // Initiate a search when a filter is applied
      return updatedOptions;
    });
  };
  const renderResult = ({ item }) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate('ResultDetails', { item })}>
    <Text style={styles.resultText}>{item.name}</Text>
  </TouchableOpacity>
);
  
  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          {
            width: '30%',
            height: 40,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E7E7E7',
            left: '14%',
          },
          animatdStyle,
        ]}
      >
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Search..."
              onChangeText={(text) => handleSearch(text)}
              value={searchTerm}
              onSubmitEditing={() => handleSearch(searchTerm)}
            />
            <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
              <Image
                source={require("../Images/Filtter.png")}
                style={{ width: 26, height: 26 }}
              />
            </TouchableOpacity>
          </View>
  
          {/* Filter Modal */}
          <Modal
            visible={isFilterModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsFilterModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalHalfContent}>
                <Text style={styles.modalTitle}>Filter Options</Text>
                {['Skills', 'Experience', 'Users', 'Jobs'].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleFilterOption(option)}
                    style={styles.filterOptionContainer}
                  >
                    <Text style={styles.filterOption}>{option}</Text>
                    <View
                      style={[
                        styles.lightIndicator,
                        selectedOptions.includes(option) && styles.lightIndicatorActive,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => setIsFilterModalVisible(false)}
                  style={styles.closeButtonContainer}
                >
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
  
          {console.log("Results before rendering:", results)}
  
          {searchTerm !== '' && (
            <FlatList
              data={results}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              style={styles.resultList}
              renderItem={renderResult}
              ListEmptyComponent={() =>
                isLoading ? (
                  <CustomLoadingSpinner style={styles.spinnerLoading} />
                ) : results.length === 0 ? (
                  <Text style={styles.noResultsText}>No results found</Text>
                ) : null
              }
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setSearchTerm('');
            if (animation.value == 1) {
              animation.value = 0;
              setValue(0);
            } else {
              animation.value = 1;
              setValue(1);
            }
          }}
        >
          <Image
            source={value == 1 ? require('../Images/clear2.png') : require('../Images/search-100.png')}
            style={{ width: value == 1 ? 40 : 40, height: value == 1 ? 30 : 40 }}
          />
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
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalHalfContent: {
    height: '50%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterOption: {
    fontSize: 18,
    flex: 1,
  },
  lightIndicator: {
  width: 14,          
  height: 14,         
  borderRadius: 7,    
  borderWidth: 1.5,   
  borderColor: '#007BFF',
  backgroundColor: '#fff',
  marginLeft: 10,
},
  lightIndicatorActive: {
    backgroundColor: '#007BFF',
  },
  closeButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
  },







  modeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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
  resultText: {
    fontSize: 16,
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
  },
})
export default Searchbox



//   const renderUser = ({ item }) => (
//           //  console.log("i)tt.",item),
//       //   console.log("nameee4:",item.jobType),
//       // console.log("nameee4:",jobs),
      

//     <TouchableOpacity
//     style={styles.userRueslt}
//     onPress={() =>{
//     if (searchMode === 'users') {
//        navigation.navigate('drawer', { screen: 'UserProfile', params: { User:item } })
//     } else {
//       navigation.navigate('drawer', { screen: 'JobProfile', params: { jobs:jobs ,selectedJob: item } })
//     }
//     }}
//       >

// {searchMode === 'users' ? (

//          <Avatar size={20} rounded 
//        icon={{name:'rowing'}}  
//        containerStyle={styles.Avtarstyle}/>
//       ) : (
//         <MaterialIcons name="work" size={20} rounded 
        
//         containerStyle={styles.Avtarstyle2}
//       />
//     )}
//       <Text style={styles.userItem}>{item.name}</Text>
//       <Text style={styles.userItem}>{item.jobType}</Text>

//     </TouchableOpacity>
//   );

