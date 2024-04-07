// AddSkillPage.js
import React, { useState } from 'react';
import { View, TextInput, Button,Image,StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';

import { useNavigation } from '@react-navigation/native';




const AddSkills = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);

    const [newSkill, setNewSkill] = useState('');
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);

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




  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        
            <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require("../Images/clear2.png")}
          style={styles.skillsStyle}
          />
          </TouchableOpacity>

      <TextInput
          style={styles.input}
          placeholder="Enter a new skill"
          value={newSkill}
          onChangeText={setNewSkill}
        />
        <Button title="Add Skill" onPress={handleAddSkill} />
       
    </View>
  );
};

export default AddSkills;


const styles = StyleSheet.create({
    skillsStyle:{
     width:50,
     height:50,
     left:180,
     position:'relative',
    top: -340, // For top-right corner; adjust as needed
    right: 0, // For top-right corner; adjust as needed
    padding: 0,
     color:'black',

    },
    clearStlye:{
        position: 'relative',
        
        
    },
    input: {
        borderWidth:1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        width:320,
        
      },
      input:{
       
        

      },
      
      

     
 })
 