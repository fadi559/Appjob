
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Button ,Image} from 'react-native';
import { useEffect } from 'react';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Avatar } from '@rneui/themed';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import StackPro from '../../route/StackProfile';



const ProfilePage = ({ userId }) => {
  const { user, setUser } = useContext(UserContext);
  console.log('userss', user);

   const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
   const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({ title: '', description: '' });

  const navigation = useNavigation()


  const userProfile = {

    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg', 
    skills: ['React Native', 'Node.js', 'MongoDB'],
    experience: [
      { company: 'Company A', role: 'Software Engineer', years: 2 },
      { company: 'Company B', role: 'Senior Developer', years: 3 },
    ],
    isElite: true,
  }; 
  
  const handleAddSkill = async (skills) => {

    const body = JSON.stringify({ skill:newSkill , userId: user._id })

    try {
      await fetch('http://localhost:8000/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
      .then( res => res?.json())
      .then(resJson => setUser({...resJson?.user}))
      
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };


  const handleAddExperience = async (experiences) => {
    try {
      await fetch('http://localhost:8000/api/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experiences),
      });
      
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  // const 


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
        style={styles.Image}
      
        />
        </TouchableOpacity>

      


        <View style={styles.skillsContainer}>
          {userProfile.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skill}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>

        
        {userProfile.experience.map((exp, index) => (
          <TouchableOpacity key={index} style={styles.experienceItem}>
            <Text style={styles.experienceText}>{exp.company} - {exp.role}</Text>
            <Text style={styles.experienceYears}>{exp.years} years</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new skill"
          value={newSkill}
          onChangeText={setNewSkill}
        />
        <Button title="Add Skill" onPress={handleAddSkill} />

         <TextInput
          style={styles.input}
          placeholder="Experience Title"
          value={newExperience.title}
          onChangeText={(text) => setNewExperience(current => ({ ...current, title: text }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience Description"
          value={newExperience.description}
          onChangeText={(text) => setNewExperience(current => ({ ...current, description: text }))}
        />
        <Button title="Add Experience" onPress={handleAddExperience} /> 
       
        <FlatList
          data={user.skills}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
         <FlatList
          data={experience}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
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
    fontSize: 20,
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
  Image:{
    width: 30, 
    height: 35, 

  }
});


export default ProfilePage;



