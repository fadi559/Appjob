
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Button ,Image,Alert} from 'react-native';
import { useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Avatar } from '@rneui/themed';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import StackPro from '../../route/StackProfile';



const ProfilePage = ({ userId }) => {
  const { user, setUser } = useContext(UserContext);
  // console.log('userss', user);
  const [newSkill, setNewSkill] = useState('');
   const [skill, setSkill] = useState('');

  const [experience, setExperience] = useState('');
  const [newExperience, setNewExperience] = useState('');
  const navigation = useNavigation()

  console.log("newExperienceee:,",newExperience)
  console.log("experience:",experience)
  console.log("userrr:",user)


  const deleteSkill = async (userId, skills,setSkills) => {
    try {
        const response = await fetch(`http://localhost/api/SkillsDelete${userId}/${skill}`, {
            method: 'DELETE',
      });
      const updatedSkills = await response.json();
      if (response.ok) {
          // Update your local state to reflect the change
          setSkills(updatedSkills);
      } else {
          throw new Error('Failed to delete the skill');
      }
  } catch (error) {
      console.error('Error deleting skill:', error);
  }
};

  
  // Handler for pressing the skill item
  const handlePress = ({ skill,  }) => {
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
                  onPress: () => deleteSkill()
              }
          ],
          { cancelable: false }
      );
  };


  return (
    <ScrollView style={styles.container}>

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
      <TouchableOpacity onPress={()=>navigation.navigate('StackProfile',{screen:'AddSkills'})}>
        <Image
        source={require("../Images/plus-48.png")}
        style={styles.AddSkillImage}
      
        />
        </TouchableOpacity>
   
         <View style={styles.skillsContainer}>
          {user.skills.map((skill, index) => (
            

             <TouchableOpacity  style={styles.skillItem} onPress={() => handlePress(skill)}>
            <View key={index} style={styles.skillBadge}>
              
              <Text style={styles.skill}>{skill}</Text>
            </View>
            </TouchableOpacity>
          ))}
        </View> 
        
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>

      <TouchableOpacity onPress={()=>navigation.navigate('StackProfile',{screen:'AddExperience'})}>
      <Image
        source={require("../Images/plus-48.png")}
        style={styles.AddExperienceImage}
        />

      </TouchableOpacity>

      
       {user.experiences.map((experience, index) => (
          <TouchableOpacity key={index} style={styles.experienceItem}>
            <Text style={styles.experienceText}>{experience}</Text>
            <Text style={styles.experienceYears}>{}</Text>
          </TouchableOpacity>
        ))} 
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
  eliteBadge: {
    marginTop: 5,
    backgroundColor: 'gold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'center',
    right: 80,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  AddSkillImage:{
    width: 29, 
    height: 29, 
   left:70,
   top:-37,

  },
  AddExperienceImage:{
    width: 29, 
    height: 29, 
    left:136,
    top:-38,

  }
});


export default ProfilePage;



