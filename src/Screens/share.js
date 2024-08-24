  
  import React, { useState, useContext } from 'react';
  import { View, ScrollView, StyleSheet, Alert } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { Button, Input } from '@rneui/base';
  import { UserContext } from '../compoments/usercontext';
  import { Api } from '../res/api';
  import CustomLoadingSpinner from '../compoments/Loading';
  import { useLoading } from '../compoments/LoadingContext';
  
  const ShareScreen = (props) => {
    const navigation = useNavigation();
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const { user, setUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useLoading();
  
    const handlepost = async () => {
      const jobPostData = {
        User: user,
        location,
        jobType,
        notes,
        Phonenumber,
      };
  
      if (!jobType || !location || !notes || !Phonenumber) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }
  
      if (Phonenumber.length !== 10 || !/^\d+$/.test(Phonenumber)) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
        return;
      }
  
      showLoader();
      try {
        const response = await fetch(Api.jobposts, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobPostData),
        });
  
        const responseData = await response.json();
        console.log('Job posted successfully:', responseData);
  
        setJobType('');
        setLocation('');
        setNotes('');
        setPhonenumber('');
  
        setTimeout(() => {
          Alert.alert('Success', 'Job posted successfully!');
        }, 500);
      } catch (error) {
        console.log('Error posting job:', error);
      }
      hideLoader();
    };
  
    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={styles.spinnerContainer}>
            <CustomLoadingSpinner />
          </View>
  
          <Input
            placeholder="Job Type"
            value={jobType}
            onChangeText={(text) => setJobType(text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
  
          <Input
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
  
          <Input
            placeholder="Notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
  
          <Input
            placeholder="Phone Number"
            value={Phonenumber}
            onChangeText={(text) => setPhonenumber(text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            maxLength={10}
            keyboardType="numeric"
          />
  
          <Button
            title="Share"
            onPress={handlepost}
            buttonStyle={styles.shareButton}
            containerStyle={styles.shareButtonContainer}
          />
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f4f8',
    },
    spinnerContainer: {
      marginBottom: 10,
      top:10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      fontSize: 16,
      color: '#333',
    },
    shareButtonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    shareButton: {
      backgroundColor: '#3A416F',
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
  });
  
  export default ShareScreen;
  
  
  
  // ShareScreen.js
// import React, { useState,useEffect } from 'react';
// import { useContext } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Button,Input } from '@rneui/base';
// import jwt_decode from "jwt-decode";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {UserType } from '../compoments/usercontext';
// import { UserContext } from '../compoments/usercontext';
// import { Api } from '../res/api';
// import UserProfile from './UserProfile';
// import { ScrollView } from 'react-native';
// import SuccessAnimation from '../compoments/SuccessAnimation';
// import CustomLoadingSpinner from '../compoments/Loading';
// import { useLoading } from '../compoments/LoadingContext';



// const ShareScreen = (props) => {
//   const navigation = useNavigation();
//   const [jobType, setJobType] = useState('');
//   const [location, setLocation] = useState('');
//   const [notes, setNotes] = useState('');
//   const [Phonenumber,setPhonenumber]=useState('');
//   const {user,setUser}=useContext(UserContext);
//   const [textInputValue, setTextInputValue] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const { showLoader, hideLoader } = useLoading();
  
//   // console.log("user44",user);

//   const handlepost =async () => {
    
//     const jobPostData = {
//       User:user,
//       location,
//       jobType,
//       notes,
//       Phonenumber,
//     };
//     if (!jobType) {
//       Alert.alert('Error', 'Please enter a job');
//       return;
//     };
//     if (!location) {
//       Alert.alert('Error', 'Please enter a location');
//       return;
//     };
//     if (!notes) {
//       Alert.alert('Error', 'Please enter a notes');
//       return;
//     };
//     if (!Phonenumber) {
//       Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
//       return;
//     }
    
//     console.log("JOBPOST33:",jobPostData);

//     if (Phonenumber.length === 10 && /^\d+$/.test(Phonenumber)) 
//     showLoader()
//     try {
//       const response = await fetch(Api.jobposts,{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(jobPostData),
        
//       });
//       // console.log("res.status: " , response.status);
//     setJobType('');
//     setLocation('');
//     setNotes('');
//     setPhonenumber('');
//       const responseData = await response.json();
//       console.log('Job posted successfully:', responseData);
      
//       // navigation.navigate("tab",{screen:'home'})
    
//     } catch (error) {
//       console.log('Error posting job:', error);
//     }
//     hideLoader()
//   };
//   return (
    

//     <View style={styles.container}>
//       <ScrollView>
//       <View style={{top:12,}}>
//       <CustomLoadingSpinner/>
//       </View>
     
//       <Input
//         placeholder="Job"
//         value={jobType}
//         onChangeText={(text) => setJobType(text)}
//         containerStyle={styles.inputContainer}
//       />
      
//       <Input
//         placeholder="Location"
//         value={location}
//         onChangeText={(text) => setLocation(text)}
//         containerStyle={styles.inputContainer}
//       />
//       <Input
//         placeholder="Notes"
//         value={notes}
//         onChangeText={(text) => setNotes(text)}
       
//         containerStyle={styles.inputContainer}
//       />
//        <Input
//         placeholder="phone"
//         value={Phonenumber}
//         onChangeText={(text) => setPhonenumber(text)}
//         multiline
//         containerStyle={styles.inputContainer}
//         maxLength={10}
//         keyboardType="numeric"
//       />
      
//       <Button
//         title="Share"
//         onPress={handlepost}
//         buttonStyle={styles.shareButton}
//         containerStyle={styles.shareButtonContainer}
//       />
     

//       </ScrollView>
      
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     width:150,
//   },
//   pickImageButton: {
//     backgroundColor: '#3A416F',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginRight: 8,
//   },
//   pickDocumentButton: {
//     backgroundColor: '#3A416F',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginLeft: 8,
//   },
//   selectedImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   shareButtonContainer: {
//     marginTop: 16,
//     width: "40%",
//     left:120,
//     borderRadius: 20,

//   },
//   shareButton: {
//     backgroundColor: '#3A416F',
//     borderRadius: 20,
   
//   },
// });

// export default ShareScreen;
