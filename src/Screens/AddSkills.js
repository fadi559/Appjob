// AddSkillPage.js
import React, { useState } from 'react';
import { View, TextInput, Image,StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Button } from '@rneui/base'; 
import { useNavigation } from '@react-navigation/native';
import SuccessAnimation from '../compoments/SuccessAnimation';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';




const AddSkills = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [newSkill, setNewSkill] = useState('');
    const [skill, setSkill] = useState('');
    const { showLoader, hideLoader } = useLoading();

        
    
    // const [skills, setSkills] = useState([]);
  //   console.log("newSkill:,",newSkill)
  // console.log("skill:",skill)

    

    const handleAddSkill = async (skills) => {
      if (newSkill.trim() === '') {
        
        Alert.alert("Invalid Input", "Please type your skill before adding.");
        return;
      } else {
        setNewSkill('');
        

        const body = JSON.stringify({ skill:newSkill , userId: user._id })
        showLoader(true);
        try {
          await fetch(Api.Addskils, {
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
        
      } finally {
        hideLoader(false);
        setNewSkill('');
    }
      };
    }


  return (
    
    <View style={styles.MainVeiew}>
        
            <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require("../Images/clear2.png")}
          style={styles.skillsStyle}
          />
          </TouchableOpacity>
          
           
          <CustomLoadingSpinner/>
            
      <View style={styles.inputpostion}>
      
      <TextInput
          style={styles.input}
          placeholder="Enter a new skill"
          value={newSkill}
          onChangeText={setNewSkill}
           placeholderTextColor="#888"
        />
         <Button 
         buttonStyle={{backgroundColor:'#3A416F', width:130,
         left:100,borderRadius:30,}}
            title='Add'
            onPress={handleAddSkill} />
  
        </View>
            
            
    </View>
  );
};

export default AddSkills;


const styles = StyleSheet.create({

    MainVeiew:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    skillsStyle:{
     width:50,
     height:50,
     left:180,
     position:'relative',
    top: -340, 
    },
    clearStlye:{
        position: 'relative',
    },
    input: {
        borderWidth:1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        width:320,
        borderRadius:20,
      },
      inputpostion:{
        // marginTop:-320,
        top: -330, 
        right: 15,

      },
      addSkills:{
            color:'black', 
           width:130,
           left:100,
      }
     
 })
 