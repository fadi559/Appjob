import React, { useState } from 'react';
import { View, TextInput, Image,StyleSheet, TouchableOpacity, RefreshControlBase,Text } from 'react-native';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import { Button } from '@rneui/base'; 
import SuccessAnimation from '../compoments/SuccessAnimation';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';
import { Alert } from 'react-native';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';




const AddExperience = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [newExperience, setNewExperience] = useState('');
    const [experience, setExperience] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const { showLoader, hideLoader } = useLoading();
    
  //   console.log("newExperienceee:,",newExperience)
  // console.log("experience:",experience)
  // console.log("userrr:",user)



     

    const handleAddExperience = async (experiences) => {
      if (newExperience.trim() === '') {
        // Alert the user if the input is empty
        Alert.alert("Invalid Input", "Please type your experience before adding.");
      } else {
        setNewExperience('');
       

      setTimeout(() => {
          setShowSuccess(false);
      }, 2000); // Hide the GIF af
      const body= JSON.stringify({ experience : newExperience , userId: user._id})
      showLoader(true)
        try {
          await fetch(Api.AddExperince, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:body,
          })
          .then( res => res?.json())
          .then(resJson => setUser({...resJson?.user}))
          
        } catch (error) {
          console.error('Error adding experience:', error);
        }
        hideLoader(false)
      }
      };

    
  return (
    <View style={styles.MainVeiew}>
     <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require("../Images/clear2.png")}
          style={styles.skillsStyle}
          />
           <CustomLoadingSpinner/>
          </TouchableOpacity>
      <View style={styles.inputpostion}>
      <TextInput
          style={styles.input}
          placeholder="Experience Description"
          value={newExperience}
          onChangeText={setNewExperience}
          placeholderTextColor="#888"
        />
         <Button 
         buttonStyle={{backgroundColor:'#3A416F', width:130,
         left:100,borderRadius:30,}}
            title='Add'
            onPress={handleAddExperience}/>
           
       
        </View>
            
           
    </View>
  );
}
export default AddExperience;

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
    right: 0, 
    padding: 0,
     color:'black',
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
 