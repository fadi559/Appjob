// AddSkillPage.js
import React, { useState } from 'react';
import { View, TextInput, Image,StyleSheet, TouchableOpacity,Alert, SafeAreaView } from 'react-native';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Button } from '@rneui/base'; 
import { useNavigation } from '@react-navigation/native';
import SuccessAnimation from '../compoments/SuccessAnimation';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';
import { Strings } from '../res/Strings';


const AddSkills = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [newSkill, setNewSkill] = useState('');
    const [skill, setSkill] = useState('');
    const { showLoader, hideLoader } = useLoading();
    const {language,setLanguage} = useContext(UserContext)
        
    
    // const [skills, setSkills] = useState([]);
  //   console.log("newSkill:,",newSkill)
  // console.log("skill:",skill)

    

    const handleAddSkill = async (skills) => {
      if (newSkill.trim() === '') {
        
        Alert.alert(Strings.SkillsPageWithALert.InvalidInputAlert[language].title,
          Strings.SkillsPageWithALert.InvalidInputAlert[language].message,);
        return;
      } else {
        setNewSkill('');
        

        const body = JSON.stringify({ skill:newSkill , userId: user._id })
        showLoader(true);
        try {
          await fetch(Api.Addskills,{
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
    
    
      <SafeAreaView style={styles.MainVeiew}>
        
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
          placeholder=  {Strings.SkillsPageWithALert.EnterNewSkillInput[language]}
         
          value={newSkill}
          onChangeText={setNewSkill}
           placeholderTextColor="#888"
        />
         <Button 
         buttonStyle={{backgroundColor:'#3A416F', width:130,
         left:100,borderRadius:30,}}
            title=  {Strings.YesAndCancelandSkip.Add[language]}
            onPress={handleAddSkill} />
        </View>
        </SafeAreaView>
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
 