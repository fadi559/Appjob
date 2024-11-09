

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated,Image, Alert,Modal } from 'react-native';
import { Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';
import { UserContext } from '../compoments/usercontext';
import  ImagePicker from 'react-native-image-picker';
import { Strings } from '../res/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window');




const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { showLoader, hideLoader } = useLoading();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(user.image?.url);
  const [title, setTitle] = useState('Profile Photo');
  const [photo, setPhoto] = useState(null);
  const {language,setLanguage} = useContext(UserContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useState(new Animated.Value(-width * 0.75))[0];
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  
  
console.log("avatar55::",avatar)
  console.log("user::",user)

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        console.log('ImagePicker Response: ', selectedPhoto);
  
      
        const fileUri = Platform.OS === 'ios'
          ? selectedPhoto.uri.replace('file://', '') 
          : selectedPhoto.uri;
  
        console.log('Formatted File URI: ', fileUri);
  
       
        const formData = new FormData();
        formData.append('file', {
          name: selectedPhoto.fileName,
          type: selectedPhoto.type,
          uri: fileUri, 
        });
        formData.append('userId', user._id); 

        axios.post(Api.SavePhotoUrl,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
       
        .then(response => {
          setAvatar(response.data.secure_url);
          setUser({...user ,image: { url: response.data.secure_url } });
          console.log('Photo uploaded and URL received:', response.data.secure_url);
        })
        .catch(error => {
          if (error.response) {
            console.log('Failed to upload photo:', error.response.data);
          } else if (error.request) {
            console.log('No response from server:', error.request);
          } else {
            console.log('Error setting up request:', error.message);
          }
        });
      }
      });
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
      Strings.ProfilePageAlert.DeleteSkillAlert[language].title,
      Strings.ProfilePageAlert.DeleteSkillAlert[language].message,
      [
        { text: Strings.YesAndCancelandSkip.cancel[language], style: "cancel" },
        { text:Strings.YesAndCancelandSkip.Yes[language], onPress: () => deleteSkill(skill) }
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
      Strings.ProfilePageAlert.DeleteExperienceAlert[language].title,
      Strings.ProfilePageAlert.DeleteExperienceAlert[language].message,
      [
        { text:Strings.YesAndCancelandSkip.cancel[language], style: "cancel" },
        { text: Strings.YesAndCancelandSkip.Yes[language], onPress: () => deleteExperience(experience) }
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
    <View style={{ flex: 1 }}>
    {/* Scrollable Content */}
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={120}
            rounded
            source={{ uri: user?.image }}
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
          <Text style={styles.sectionTitle}>{Strings.ProfilePage.Skills[language]}</Text>
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
          <Text style={styles.sectionTitle}>{Strings.ProfilePage.Experience[language]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddExperience' })}>
            <Image source={require("../Images/plus-48.png")} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.experienceContainer}>
          {renderExperience()}
        </View>
      </View>
    </ScrollView>


    </View>
  )};

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
  settingsIcon:{
   left:10,
   width:30,
   height:30,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.75, // Drawer width (75% of the screen)
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
  },
  drawerContent: {
    padding: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
  },
  drawerButtonText: {
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  languageModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
   languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  checkmarkIcon: {
    width: 20,
    height: 20,
    tintColor: '#007bff', // Blue color for the check mark
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },


});

export default ProfilePage;


