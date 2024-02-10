  
    
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SignIn from './SignIn';
import { Api } from '../res/api';


const SignupScreen = ({navigtion},props) => {
    const navigation = useNavigation(props);
    const [PhoneNumber, setPhoneNumber] =useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setloading]=useState(false);
  


  const handleSignup = async () => {
    setloading(true);
      
      if (!name || !email || !password|| !PhoneNumber) {
      
      }
      try {
        const { data } = await axios.post (Api.signup,{
          name,
         email,
         PhoneNumber,
          password,
          
      });
      if(data.error){

        Alert.alert(data.error);
      }
      else {
        setloading(false);
        console. log ("SIGN up SUCCESS »> ", data); 
        Alert.alert ("Sign up successful");
        navigation.navigate('stack',{screen:'SignIn'});
      }
      }  catch (error) {
        Alert.alert('Signup Failed', error);
        console.error('Signup Error:', error);
        setloading(false);
      }
    };
    // const handleSubmit = async () => {
    //   try {
    //     await axios.post('http://localhost:8000/api/phoneNumber', { PhoneNumber });
    //     Alert.alert('Success', 'Phone number stored successfully');
    //   } catch (error) {
    //     Alert.alert('Error', 'Failed to store phone number');
    //     console.error('Error storing phone number:', error);
    //   }
    // };
  

  return (
   
    
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Your Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Your Email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Your Password"
        secureTextEntry
      />
     <TextInput
        style={styles.input}
        value={PhoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="Your PhoneNumber "
        keyboardType="numeric"
        maxLength={10}
    
      /> 
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{marginTop:15}}>Already Joined  <Text style={styles.SmallSignInButton} 
       onPress={()=>navigation.navigate('stack',{screen:'SignIn'})} >signIn</Text>  </Text>
      
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight:'500',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  SmallSignInButton:{
    color:'#a52a2a',
    
  }
});

export default SignupScreen;

    
    
    
  