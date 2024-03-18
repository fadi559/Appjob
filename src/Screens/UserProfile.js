import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import ProfilePage from './profile'
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';




const UserProfile = (props) => {

  const {User}=props

  const {user,setUser}=useContext(UserContext);
console.log("userr",user);
  const userProfile = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg', // Replace with actual avatar URL
    skills: ['React Native', 'Node.js', 'MongoDB'],
    experience: [
      { company: 'Company A', role: 'Software Engineer', years: 2 },
      { company: 'Company B', role: 'Senior Developer', years: 3 },
    ],
    isElite: true,
  };

  return (
    
    <ScrollView style={styles.container}>

<View style={styles.profileHeader}>
  <Image source={require("../Images/Avatar.png")} style={styles.avatar} />
  <View style={styles.headerTextContainer}>

    <Text style={styles.name}>{User}</Text>

  
   
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Skills</Text>
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
</ScrollView>
   
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light grey background for contrast
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
    marginTop:23,
  },
  eliteBadge: {
    marginTop: 5,
    backgroundColor: 'gold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf:'center',
    right:80,
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
});


export default UserProfile