import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { Icon } from 'react-native-elements';
import JobProfile from './JobProfile';
import SkillPage from './SkillSearchPage';
import JobTypePage from './JobTypePage';



const SearchScreen22 = () => {
  const [search, setSearch] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(['name']); // Default to 'name'
  const [ALLData, setALLData] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  const navigation = useNavigation();

  const [Type, setType] = useState({
    skill: { pressed: false, Text: '' },
    name: { pressed: true, Text: '' },
    jobType: { pressed: false, Text: '' },
  });

  const toggleFilterOption = (option) => {
    const newType = { skill: { pressed: false, Text: '' }, name: { pressed: false, Text: '' }, jobType: { pressed: false, Text: '' } };
    newType[option].pressed = true;
    setType(newType);
    setSearch(''); // Clear the search input when switching filters
    setALLData([]); // Clear previous results
    setSelectedFilters([option]);
    setIsFilterModalVisible(false);
  };
  

  const GetSkillsApi = async () => {
    setLoading(true);
    try {
        const body = { name: Type.skill.Text}; 
        console.log('Request Body:', body); 

      const response = await fetch(Api.GetSkills, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (responseData && responseData.data) {
        setALLData(responseData.data);
        console.log('Request resp:',responseData.data); 
      } else {
        setALLData([]);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const GetJobType = async () => {
    setLoading(true);
    try {
      const body = { name: Type.jobType.Text }; 
    //   console.log('Request Body:', body); 
  
      const response = await fetch(Api.GetJobType, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
      console.log('API Response:', responseData); 
  
      if (responseData && responseData.data) {
        setALLData(responseData.data); 
        console.log('Request resp:',responseData.data); 

      } else {
        setALLData([]); 
      }
    } catch (error) {
      console.error('Failed to fetch job types:', error);
    } finally {
      setLoading(false);
    }
  };





  const handleSearchChange = (text) => {
    setSearch(text); 
    const activeFilter = selectedFilters[0];
  
    if (text.trim() !== '') {
      Type[activeFilter].Text = text;
      setType({ ...Type });
  
      if (activeFilter === 'skill') {
        GetSkillsApi(); 
      }
      if (activeFilter === 'jobType') {
        GetJobType(); 
      }
      if (activeFilter === 'name') {
        searchApi(activeFilter); 
      }
    } else {
      setALLData([]); 
    }
  };
  
  
  const searchApi = async (filterType) => {
    const body = {};
    if (Type[filterType].Text) {
      body[filterType] = { $regex: Type[filterType].Text, $options: 'i' };
    }
    setLoading(true);
    try {
      const response = await fetch(Api.filterData, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (responseData && responseData.data) {
        setALLData(responseData.data);
      } else {
        setALLData([]);
      }
    } catch (error) {
      console.error('Failed to search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (item) => {
    const activeFilter = selectedFilters[0];
    if (activeFilter === 'name') {
        navigation.navigate('drawer', {
            screen: 'JobProfile',
            params: { jobTypeName :item.name },
          });
      
    } else if (activeFilter === 'jobType') {

        navigation.navigate('StackProfile', {
            screen: 'JobTypePage',
            params: { jobTypeName: item.name },
          });
     

    } else if (activeFilter === 'skill') {
        navigation.navigate('StackProfile', {
            screen: 'SkillPage',
            params: { skillName: item.name },
          });
    }
  };


  const renderResults = ({ item }) => (
    <TouchableOpacity style={styles.resultCard} onPress={() => handleResultClick(item)}>
      <View style={styles.resultContent}>
        {selectedFilters[0] === 'jobType' ? (
          <>
            <Image
              source={require('../Images/Work2.png')} 
              style={styles.iconImage}
            />
            <Text style={styles.resultText}>{item.name || 'Job Title'}</Text>
          </>
        ) : selectedFilters[0] === 'name' ? (
          <>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.resultImage} />
            ) : (
              <Icon name="person" type="material" color="#b0c4de" size={40} style={styles.iconstyle} />
            )}
            <Text style={styles.resultText}>{item.name || 'Name'}</Text>
          </>
        ) : (
          <Text style={styles.resultText}>{item.name || 'Skill'}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../Images/backIcon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${selectedFilters[0]}...`}
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
          <Image source={require('../Images/Filtter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <FlatList
          data={ALLData}
          keyExtractor={(item) => item._id}
          renderItem={renderResults}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
             
              
            </View>
          )}
        />
      )}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            {['skill','name','jobType'].map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilterOption(option)}
                style={styles.filterOptionContainer}
              >
                <Text style={styles.filterOption}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
                <View
                  style={[
                    styles.lightIndicator,
                    Type[option].pressed && styles.lightIndicatorActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
      },
      searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      backButton: {
        marginRight: 12,
      },
      backIcon: {
        width: 20,
        height: 20,
      },
      searchInput: {
        flex: 1,
        height: 45,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      filterIcon: {
        width: 28,
        height: 28,
        marginLeft: 12,
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000',
      },
      filterOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        marginBottom: 14,
      },
      filterOption: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
      },
      lightIndicator: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#D3D3D3',
        borderWidth: 1,
        borderColor: '#A9A9A9',
      },
      lightIndicatorActive: {
        backgroundColor: '#007BFF',
        borderColor: '#0056b3',
      },


      resultCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0', // Thin line for separation
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
      },
      resultContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      resultImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
      },
      iconImage: {
        width: 30,
        height: 30,
        marginRight: 15,
      },
      resultText: {
        fontSize:16,
        color: '#333',
        flex: 1,
        left:9,
      },
      skillText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
      },

      resultImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        resizeMode: 'cover',
      },
      resultDetails: {
        flex: 1,
      },
     
      iconstyle:{
        backgroundColor: '#f0f4f7',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      emptyText:{
        left:140,
        top:160,
      },
     
       

      });
      

      export default SearchScreen22;











// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const SearchScreen22 = () => {
//   const [search, setSearch] = useState('');
//   const navigation = useNavigation();
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);





//   return (
//     <SafeAreaView style={styles.container}>
//   {/* Header Section */}
//   <View style={styles.searchHeader}>
//     <TouchableOpacity
//       onPress={() => navigation.goBack()}
//       style={styles.backButton}
//     >
//       <Image
//         source={require('../Images/backIcon.png')} 
//         style={styles.backIcon}
//       />
//     </TouchableOpacity>
//     <TextInput
//       style={styles.searchInput}
//       placeholder="Search here..."
//       placeholderTextColor="#888"
//       value={search}
//       onChangeText={setSearch}
//     />
//     <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
//       <Image
//         source={require("../Images/Filtter.png")}
//         style={styles.filterIcon}
//       />
//     </TouchableOpacity>
//   </View>

//   {/* Filter Modal */}
//   <Modal
//     visible={isFilterModalVisible}
//     animationType="slide"
//     transparent={true}
//     onRequestClose={() => setIsFilterModalVisible(false)}
//   >
//     <TouchableOpacity 
//       style={styles.modalOverlay} 
//       activeOpacity={1} 
//       onPress={() => setIsFilterModalVisible(false)} // Close modal when tapping outside
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalHalfContent}>
//           <Text style={styles.modalTitle}>Filter Options</Text>
//           {['Users', 'Skills', 'Jobs'].map((option, index) => (
            
//             <TouchableOpacity
//               key={index}
//               onPress={() => toggleFilterOption(option)}
//               style={styles.filterOptionContainer}
//             >
//               <Text style={styles.filterOption}>{option}</Text>
//               <View
//                 style={[
//                   styles.lightIndicator,
//                   selectedOptions.includes(option) && styles.lightIndicatorActive,
//                 ]}
//               />
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity
//             onPress={() => setIsFilterModalVisible(false)}
//             style={styles.closeButtonContainer}
//           >
//             <Text style={styles.closeButton}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </Modal>
// </SafeAreaView>
//   );
// };







// const styles = StyleSheet.create({
//   container: {

//           flex: 1,
//           backgroundColor: '#E7E7E7',
//         },
//         searchHeader: {
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: 16,
//           paddingVertical: 12,
//           backgroundColor: '#f5f5f5',
//           borderBottomWidth: 1,
//           borderBottomColor: '#ddd',
//         },
//         backButton: {
//           marginRight: 12,
//         },
//         backIcon: {
//           width: 20,
//           height: 20,
//         },

// searchInput: {
//     flex: 1,
//     height: 45,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 25, 
//     backgroundColor: '#f9f9f9',
//     fontSize: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3, // For Android shadow
//   },

//         filterIcon: {
//           width:28,
//           height: 28,
//          right:50,
//         },


//         modalOverlay: {
//             flex: 1,
            
//             justifyContent: 'flex-end',
//           },
//           modalContainer: {
//             backgroundColor: '#FFFFFF', // Pure white for the modal background
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             padding: 20,
//           },
//           modalHalfContent: {
//             paddingBottom: 20,
//           },
//           modalTitle: {
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginBottom: 20,
//             textAlign: 'center',
//             color: '#000000', // Black for the title text
//           },
//           filterOptionContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingVertical: 12,
//             paddingHorizontal: 18,
//             borderRadius: 12,
//             backgroundColor: '#F5F5F5', // Light grey for filter options
//             marginBottom: 14,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//             elevation: 2, // For Android shadow
//           },
//           filterOption: {
//             fontSize: 18,
//             fontWeight: '600',
//             color: '#333333', // Dark grey for filter text
//           },
//           lightIndicator: {
//             width: 14,
//             height: 14,
//             borderRadius: 7,
//             backgroundColor: '#D3D3D3', // Light grey for inactive indicator
//             borderWidth: 1,
//             borderColor: '#A9A9A9', // Dark grey for inactive indicator border
//           },
//           lightIndicatorActive: {
//             backgroundColor: '#000000', // Black for active indicator
//             borderColor: '#4B4B4B', // Slightly lighter black for border
//           },
//           closeButtonContainer: {
//             marginTop: 20,
//             alignItems: 'center',
//           },
//           closeButton: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             color: '#FFFFFF', // White text for the button
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             backgroundColor: '#000000', // Black background for the button
//             borderRadius: 8,
//             borderWidth: 1,
//             borderColor: '#333333', // Dark grey for the button border
//           },
//       });
      

// export default SearchScreen22;
