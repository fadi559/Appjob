// ShareScreen.js
import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button,Input } from '@rneui/base';
import jwt_decode from "jwt-decode";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {UserType } from '../compoments/usercontext';
import { UserContext } from '../compoments/usercontext';
import { Api } from '../res/api';

const ShareScreen = () => {
  const navigation = useNavigation();
  const [jobType, setJobType] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [Phonenumber,setPhonenumber]=useState('');
  const {userId,setuserId}=useContext(UserContext);



  const handlepost =async () => {
    
    const jobPostData = {
      location,
      skills,
      jobType,
      notes,
      
    };
    try {
      const response = await fetch(Api.share, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include the JWT token here if your endpoint requires authentication
        },
        body: JSON.stringify(jobPostData),
      });

      console.log("res.status: " , response.status);
  
      const responseData = await response.json();
      console.log('Job posted successfully:', responseData);
      // Optionally, refresh your job posts list to include the new post
    } catch (error) {
      console.log('Error posting job:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Input
        placeholder="Job"
        value={jobType}
        onChangeText={(text) => setJobType(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Skills"
        value={skills}
        onChangeText={(text) => setSkills(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
        containerStyle={styles.inputContainer}
      />
       <Input
        placeholder="phone"
        value={Phonenumber}
        onChangeText={(text) => setPhonenumber(text)}
        multiline
        containerStyle={styles.inputContainer}
        maxLength={10}
        keyboardType="numeric"
      />
      
      <Button
        title="Share"
        onPress={handlepost}
        buttonStyle={styles.shareButton}
        containerStyle={styles.shareButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width:150,
  },
  pickImageButton: {
    backgroundColor: '#3A416F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  pickDocumentButton: {
    backgroundColor: '#3A416F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  shareButtonContainer: {
    marginTop: 16,
  },
  shareButton: {
    backgroundColor: '#3A416F',
    borderRadius: 20,
  },
});

export default ShareScreen;
