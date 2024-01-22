  
    // SignupScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SignIn from './SignIn';


const SignupScreen = ({navigtion},props) => {
    const navigation = useNavigation(props);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setloading]=useState(false);


  const handleSignup = async () => {
    setloading(true);
      // Validate input fields (you can add more validation as needed)
      if (!name || !email || !password) {
      
      }
      try {
        const { data } = await axios.post ("http://loaclhost:8000/api/signup",{
        name,
         email,
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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('stack',{screen:'SignIn'})}>
      <Text> signin </Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#4caf50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;

    
    
    
    //   // SignupScreen23.js

// const SignupScreen = () => {
//   const navigation = useNavigation();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('http://loaclhost:8000/api/signup', {
//         name,
//         email,
//         password,
//       });

//       // Handle successful signup
//       console.log(response.data);
//       Alert.alert('Signup Successful', 'You can now sign in.');

//       // Navigate to the sign-in screen
//       navigation.navigate('SignIn');
//     } catch (error) {
//       // Handle signup error
//       Alert.alert('Signup Failed', 'Email already exists or an error occurred during signup.');
//       console.error('Signup Error:', error);
//     }
//   };
// });

// export default SignupScreen;






//       // Handle successful signup, e.g., navigate to login screen
//       console.log(response.data);
//       Alert.alert('Signup Successful', 'You can now log in.');
//     } catch (error) {
//       // Handle signup error
//       Alert.alert('Signup Failed', 'Email already exists or an error occurred during signup.');
//       console.error('Signup Error:', error);
//     }
//   };
