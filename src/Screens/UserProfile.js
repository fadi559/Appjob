import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import ProfilePage from './profile'
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Api } from '../res/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Avatar } from '@rneui/themed';


const UserProfile = (props) => {
  

  const {user,setUser}=useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const {User}=props.route.params
  const{skills}=props.route.params
  const{experiences}=props.route.params
  
   console.log("Userr::",User)
 
  // console.log("u2serr::",user)
  
   
  return (
    
    <ScrollView style={styles.container}>
<View style={styles.profileHeader}>
<Avatar
        size={80}
        rounded
        icon={{ name: 'rowing' }}
        containerStyle={{ backgroundColor: '#3d4db7' }} />
            
        {/* <Image source={require("../Images/Avatar.png")} style={styles.avatar} /> */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{User.name}</Text>

          {/* <Text style={styles.name}>{skills}</Text> */}
          
        </View>
        
        <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills</Text>  
     
  
         <View style={styles.skillsContainer}>
          {User.skills.map((skills, index) => (

             <TouchableOpacity>
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skill}>{skills}</Text>
            </View>
            </TouchableOpacity>
          ))}
        </View> 
        
      </View>
      

      <View style={{right:50,}}>
 <Text style={styles.sectionTitle}>Experience</Text>

       {User.experiences.map((experiences, index) => (
          <TouchableOpacity key={index} style={styles.experienceItem}>
            <Text style={styles.experienceText}>{experiences}</Text>
            <Text style={styles.experienceYears}>{}</Text>
          </TouchableOpacity>
        ))} 
     
     </View>
        </View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,    
    padding: 30,
    backgroundColor: 'white', // Light grey background for contrast
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom:20,
    backgroundColor: 'white'
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
    right:20,
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