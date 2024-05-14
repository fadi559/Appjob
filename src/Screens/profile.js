
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Button, Image, Alert } from 'react-native';
import { useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Avatar } from '@rneui/themed';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Api, baseUrl } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';


const ProfilePage = ({ userId }) => {
  const { user, setUser } = useContext(UserContext);
  // console.log('Userss', user);
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState('');
  const { showLoader, hideLoader } = useLoading();
  const navigation = useNavigation()



  const deleteSkill = async (skill) => {

    showLoader(true)
    try {
      console.log("Deleting skill URL:", Api.deleteSkill(skill, user._id));
      console.log("URL delete skill:", url);
      console.log("User ID:", user?._id);
console.log("skill to delete:", skill);

      const url = Api.deleteSkill(skill, user?._id)


      const response = await fetch(url, {

        method: 'DELETE',
      });

      const updatedSkills = await response?.json();

      !updatedSkills.message &&
        setUser({ ...user, skills: updatedSkills })

       console.log("SKK*: ", updatedSkills);


    } catch (error) {
      console.warn('Error deleting skill:', error.message);
    }
    hideLoader(false)
  };

  const handlePressdeleteSkill = (skill) => {
    Alert.alert(
      "Delete Skill",
      "Are you sure you want to delete this skill?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteSkill(skill)
        }
      ],
      { cancelable: false }
    );
  };

  const deleteExperince = async (experience) => {
 
    showLoader(true)
    try {

      console.log("Deleting Experience URL:", Api.deleteExperince(experience, user._id));
      console.log("Attempting to delete experience URL:", urll);
      console.log("User ID:", user?._id);
console.log("Experience to delete(EXPIRNCE):", experience);


      const urll = Api.deleteExperince(experience,user?._id)

      const response = await fetch(urll, {

        method:'DELETE',
      });
      const updatedexperiences = await response?.json();
     
      !updatedexperiences.message &&
      setUser({ ...user, experiences: updatedexperiences })

       console.log("sk2E: ", updatedexperiences);

    } catch (error) {
      console.warn('Error deleting experience:', error.message);
    }
    hideLoader(false)
  };


  const handlePressDeleteExperiences = (experience) => {
    Alert.alert(
      "Delete experience ",
      "Are you sure you want to delete this experience?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteExperince(experience)
        }
      ],
      { cancelable: false }
    );
  };
  
  const renderSkills = () => {
    return user?.skills?.map?.((skill, index,) => (

      <TouchableOpacity key={index} style={styles.skillItem} onLongPress={() => handlePressdeleteSkill(skill)}>
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skill}>{skill}</Text>
        </View>
      </TouchableOpacity>
    ))
  };
  const renderExperince = () => {
    return user?.experiences?.map?.((experience,index) => (

      <TouchableOpacity key={index} style={styles.experienceItem} onLongPress={() => handlePressDeleteExperiences(experience)}>
        <Text style={styles.experienceText}>{experience}</Text>
        {/* <Text style={styles.experienceYears}>{ }</Text> */}
      </TouchableOpacity>
    ))
  };
  return (
    <ScrollView style={styles.container}>
      <CustomLoadingSpinner />
      <View style={styles.profileHeader}>
        <Avatar size={80} rounded
          icon={{ name: 'rowing' }}
          containerStyle={{ backgroundColor: '#3d4db7' }} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddSkills' })}>
          <Image
            source={require("../Images/plus-48.png")}
            style={styles.AddSkillImage}
          />
        </TouchableOpacity>
        <View style={styles.skillsContainer}>
          {renderSkills()}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StackProfile', { screen: 'AddExperience' })}>
          <Image
            source={require("../Images/plus-48.png")}
            style={styles.AddExperienceImage}
          />
        </TouchableOpacity>

        {renderExperince()}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 33,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 23,
  },
  eliteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skill: {
    color: '#fff',
    fontSize: 16,
  },
  experienceItem: {
    
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  experienceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  experienceYears: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  AddSkillImage: {
    width: 29,
    height: 29,
    left: 70,
    top: -37,
  },
  AddExperienceImage: {
    width: 29,
    height: 29,
    left: 136,
    top: -38,
  }
});

export default ProfilePage;



