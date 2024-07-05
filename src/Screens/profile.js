

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';
import { UserContext } from '../compoments/usercontext';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { showLoader, hideLoader } = useLoading();
  const navigation = useNavigation();
  // console.log("user%%%:",user)

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        handleUploadPhoto(source);
      }
      
    });
  };

  const handleUploadPhoto = async (image) => {
    showLoader(true);
    const data = new FormData();
    data.append('userId', user._id);
    data.append('image', {
      uri: image.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
console.log('picker resauLLT',image.uri)
    try {
      console.log("datares",data)
      console.log('user44',user)
      const response = await axios.post(Api.updateProfileImage,data,user, {
        user:user,
        image:image.uri,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.user) {
        setUser(response.data.user);
        Alert.alert('Profile image updated successfully');
        console.log("REspnse44:",response)
      }
    } catch (error) {
      
      console.log('Error updating profile image:', error);
      Alert.alert('Error updating profile image: ' + error.message);
    } finally {
      hideLoader(false);
    }
  };

  const deleteSkill = async (skill) => {
    showLoader(true);
    try {
      const url = Api.deleteSkill(skill, user._id);
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const updatedSkills = await response?.json();
      if (!updatedSkills.message) {
        setUser({ ...user, skills: updatedSkills });
      }
    } catch (error) {
      console.warn('Error deleting skill:', error.message);
    }
    hideLoader(false);
  };

  const handlePressdeleteSkill = (skill) => {
    Alert.alert(
      "Delete Skill",
      "Are you sure you want to delete this skill?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteSkill(skill) }
      ],
      { cancelable: false }
    );
  };

  const deleteExperience = async (experience) => {
    showLoader(true);
    try {
      const url = Api.deleteExperince(experience, user._id);
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const updatedExperiences = await response?.json();
      if (!updatedExperiences.message) {
        setUser({ ...user, experiences: updatedExperiences });
      }
    } catch (error) {
      console.warn('Error deleting experience:', error.message);
    }
    hideLoader(false);
  };

  const handlePressDeleteExperience = (experience) => {
    Alert.alert(
      "Delete Experience",
      "Are you sure you want to delete this experience?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteExperience(experience) }
      ],
      { cancelable: false }
    );
  };

  const renderSkills = () => {
    return user?.skills?.map?.((skill, index) => (
      <TouchableOpacity key={index} style={styles.skillItem} onLongPress={() => handlePressdeleteSkill(skill)}>
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skill}>{skill}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderExperience = () => {
    return user?.experiences?.map?.((experience, index) => (
      <TouchableOpacity key={index} style={styles.experienceItem} onLongPress={() => handlePressDeleteExperience(experience)}>
        <Text style={styles.experienceText}>{experience}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <CustomLoadingSpinner />
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={120}
            rounded
            source={{ uri: user.image?.url }}
            containerStyle={styles.avatar}
          />
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>{user.title}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddSkills' })}>
            <Image source={require("../Images/plus-48.png")} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {renderSkills()}
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddExperience' })}>
            <Image source={require("../Images/plus-48.png")} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.experienceContainer}>
          {renderExperience()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: '#3d4db7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 20,
  },
  addPhotoButton: {
   
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  addPhotoText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#3d4db7',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  skill: {
    color: '#fff',
    fontSize: 16,
  },
  experienceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  experienceItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  experienceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default ProfilePage;




// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// import { useContext, useState } from 'react';
// import { Avatar } from '@rneui/themed';
// import { useNavigation } from '@react-navigation/native';
// import { Api } from '../res/api';
// import CustomLoadingSpinner from '../compoments/Loading';
// import { useLoading } from '../compoments/LoadingContext';
// import { UserContext } from '../compoments/usercontext';


// const ProfilePage = ({ userId }) => {
//   const { user, setUser } = useContext(UserContext);
//   const [newSkill, setNewSkill] = useState('');
//   const [newExperience, setNewExperience] = useState('');
//   const { showLoader, hideLoader } = useLoading();
//   const navigation = useNavigation();
//   console.log("USser",user)

//   const deleteSkill = async (skill) => {
//     showLoader(true);
//     try {
//       const url = Api.deleteSkill(skill, user._id);
//       const response = await fetch(url, {
//         method: 'DELETE',
//       });
//       const updatedSkills = await response?.json();
//       if (!updatedSkills.message) {
//         setUser({ ...user, skills: updatedSkills });
//       }
//     } catch (error) {
//       console.warn('Error deleting skill:', error.message);
//     }
//     hideLoader(false);
//   };

//   const handlePressdeleteSkill = (skill) => {
//     Alert.alert(
//       "Delete Skill",
//       "Are you sure you want to delete this skill?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "OK", onPress: () => deleteSkill(skill) }
//       ],
//       { cancelable: false }
//     );
//   };

//   const deleteExperience = async (experience) => {
//     showLoader(true);
//     try {
//       const url = Api.deleteExperince(experience, user._id);
//       const response = await fetch(url, {
//         method: 'DELETE',
//       });
//       const updatedExperiences = await response?.json();
//       if (!updatedExperiences.message) {
//         setUser({ ...user, experiences: updatedExperiences });
//       }
//     } catch (error) {
//       console.warn('Error deleting experience:', error.message);
//     }
//     hideLoader(false);
//   };

//   const handlePressDeleteExperience = (experience) => {
//     Alert.alert(
//       "Delete Experience",
//       "Are you sure you want to delete this experience?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "OK", onPress: () => deleteExperience(experience) }
//       ],
//       { cancelable: false }
//     );
//   };

//   const renderSkills = () => {
//     return user?.skills?.map?.((skill, index) => (
//       <TouchableOpacity key={index} style={styles.skillItem} onLongPress={() => handlePressdeleteSkill(skill)}>
//         <View key={index} style={styles.skillBadge}>
//           <Text style={styles.skill}>{skill}</Text>
//         </View>
//       </TouchableOpacity>
//     ));
//   };

//   const renderExperience = () => {
//     return user?.experiences?.map?.((experience, index) => (
//       <TouchableOpacity key={index} style={styles.experienceItem} onLongPress={() => handlePressDeleteExperience(experience)}>
//         <Text style={styles.experienceText}>{experience}</Text>
//       </TouchableOpacity>
//     ));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <CustomLoadingSpinner />
//       <View style={styles.profileHeader}>
//         <Avatar
//           size={120}
//           rounded
//           icon={{ name: 'rowing' }}
//           containerStyle={styles.avatar}
//         />
//         <View style={styles.headerTextContainer}>
//           <Text style={styles.name}>{user.name}</Text>
//           <Text style={styles.subtitle}>{user.title}</Text>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Skills</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddSkills' })}>
//             <Image source={require("../Images/plus-48.png")} style={styles.addIcon} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.skillsContainer}>
//           {renderSkills()}
//         </View>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Experience</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddExperience' })}>
//             <Image source={require("../Images/plus-48.png")} style={styles.addIcon} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.experienceContainer}>
//           {renderExperience()}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 20,
//   },
//   avatar: {
//     marginBottom: 20,
//     backgroundColor: '#3d4db7',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 20,
//   },
//   headerTextContainer: {
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 5,
//   },
//   section: {
//     marginBottom: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillBadge: {
//     backgroundColor: '#3d4db7',
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   skill: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   experienceContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   experienceItem: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   experienceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   addIcon: {
//     width: 24,
//     height: 24,
//   },
//   noSkills: {
//     fontSize: 16,
//     color: '#999',
//   },
// });

// export default ProfilePage;


// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Button, Image, Alert } from 'react-native';
// import { useEffect } from 'react';
// import { UserContext } from '../compoments/usercontext';
// import { useContext } from 'react';
// import { Avatar } from '@rneui/themed';
// import { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Api, baseUrl } from '../res/api';
// import CustomLoadingSpinner from '../compoments/Loading';
// import { useLoading } from '../compoments/LoadingContext';


// const ProfilePage = ({ userId }) => {
//   const { user, setUser } = useContext(UserContext);
//   // console.log('Userss', user);
//   const [newSkill, setNewSkill] = useState('');
//   const [newExperience, setNewExperience] = useState('');
//   const { showLoader, hideLoader } = useLoading();
//   const navigation = useNavigation()



//   const deleteSkill = async (skill) => {

//     showLoader(true)
//     try {
//       console.log("Deleting skill URL:", Api.deleteSkill(skill, user._id));
//       console.log("URL delete skill:", url);
//       console.log("User ID:", user?._id);
// console.log("skill to delete:", skill);

//       const url = Api.deleteSkill(skill, user?._id)


//       const response = await fetch(url, {

//         method: 'DELETE',
//       });

//       const updatedSkills = await response?.json();

//       !updatedSkills.message &&
//         setUser({ ...user, skills: updatedSkills })

//        console.log("SKK*: ", updatedSkills);


//     } catch (error) {
//       console.warn('Error deleting skill:', error.message);
//     }
//     hideLoader(false)
//   };

//   const handlePressdeleteSkill = (skill) => {
//     Alert.alert(
//       "Delete Skill",
//       "Are you sure you want to delete this skill?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         {
//           text: "OK",
//           onPress: () => deleteSkill(skill)
//         }
//       ],
//       { cancelable: false }
//     );
//   };

//   const deleteExperince = async (experience) => {
 
//     showLoader(true)
//     try {

//       console.log("Deleting Experience URL:", Api.deleteExperince(experience, user._id));
//       console.log("Attempting to delete experience URL:", urll);
//       console.log("User ID:", user?._id);
// console.log("Experience to delete(EXPIRNCE):", experience);


//       const urll = Api.deleteExperince(experience,user?._id)

//       const response = await fetch(urll, {

//         method:'DELETE',
//       });
//       const updatedexperiences = await response?.json();
     
//       !updatedexperiences.message &&
//       setUser({ ...user, experiences: updatedexperiences })

//        console.log("sk2E: ", updatedexperiences);

//     } catch (error) {
//       console.warn('Error deleting experience:', error.message);
//     }
//     hideLoader(false)
//   };


//   const handlePressDeleteExperiences = (experience) => {
//     Alert.alert(
//       "Delete experience ",
//       "Are you sure you want to delete this experience?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         {
//           text: "OK",
//           onPress: () => deleteExperince(experience)
//         }
//       ],
//       { cancelable: false }
//     );
//   };
  
//   const renderSkills = () => {
//     return user?.skills?.map?.((skill, index,) => (

//       <TouchableOpacity key={index} style={styles.skillItem} onLongPress={() => handlePressdeleteSkill(skill)}>
//         <View key={index} style={styles.skillBadge}>
//           <Text style={styles.skill}>{skill}</Text>
//         </View>
//       </TouchableOpacity>
//     ))
//   };
//   const renderExperince = () => {
//     return user?.experiences?.map?.((experience,index) => (

//       <TouchableOpacity key={index} style={styles.experienceItem} onLongPress={() => handlePressDeleteExperiences(experience)}>
//         <Text style={styles.experienceText}>{experience}</Text>
//         {/* <Text style={styles.experienceYears}>{ }</Text> */}
//       </TouchableOpacity>
//     ))
//   };
//   return (
//     <ScrollView style={styles.container}>
//       <CustomLoadingSpinner />
//       <View style={styles.profileHeader}>
//         <Avatar size={80} rounded
//           icon={{ name: 'rowing' }}
//           containerStyle={{ backgroundColor: '#3d4db7' }} />
//         <View style={styles.headerTextContainer}>
//           <Text style={styles.name}>{user.name}</Text>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Skills</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddSkills' })}>
//           <Image
//             source={require("../Images/plus-48.png")}
//             style={styles.AddSkillImage}
//           />
//         </TouchableOpacity>
//         <View style={styles.skillsContainer}>
//           {renderSkills()}
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Experience</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddExperience' })}>
//           <Image
//             source={require("../Images/plus-48.png")}
//             style={styles.AddExperienceImage}
//           />
//         </TouchableOpacity>

//         {renderExperince()}
//       </View>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 33,
//     backgroundColor: '#f5f5f5',
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 15,
//   },
//   headerTextContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 23,
//   },
//   eliteText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillBadge: {
//     backgroundColor: '#007bff',
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   skill: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   experienceItem: {
    
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     backgroundColor: '#fff',
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   experienceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   experienceYears: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   container: {
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginBottom: 10,
//   },
//   AddSkillImage: {
//     width: 29,
//     height: 29,
//     left: 70,
//     top: -37,
//   },
//   AddExperienceImage: {
//     width: 29,
//     height: 29,
//     left: 136,
//     top: -38,
//   }
// });

// export default ProfilePage;



