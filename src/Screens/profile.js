// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { users } from '../res/data/data';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [skills, setSkills] = useState([...users[4].skill]);
  const [experience, setExperience] = useState([
   users[4]
    
  ]);

  return (
    <View style={styles.container}>
    
   

      <View style={styles.header}>
        <TouchableOpacity >
      <Text> {users[4].avatar}</Text>
      </TouchableOpacity>
        <Text style={styles.name}>{users[4].userName}</Text>
        
        <Text style={styles.title}>{users[4].Joptype}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skill}>
            <Text>{skill}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((job, index) => (
          <View key={index} style={styles.job}>
            <Text style={styles.jobTitle}>{users[4].Joptype}</Text>
            <Text>{users[4].phoneNumber}</Text>
            <Text>{users[4].Experience}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <MaterialIcons name="edit" size={24} color="black" />
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  skill: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    
  },
  job: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
