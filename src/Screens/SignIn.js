
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import Biometrics from 'react-native-biometrics';

// const BiometricsCheckScreen = () => {
//   const [biometricsAvailable, setBiometricsAvailable] = useState(null);

//   useEffect(() => {
//     checkBiometrics();
//   }, []);

//   const checkBiometrics = async () => {
//     try {
//       const { available, biometryType } = await Biometrics.isSensorAvailable();

//       if (available) {
//         console.log(`Biometrics is available, type: ${biometryType}`);
//         setBiometricsAvailable(true);
//       } else {
//         console.log('Biometrics not available');
//         setBiometricsAvailable(false);
//       }
//     } catch (error) {
//       console.error('Biometrics check failed:', error);
//       setBiometricsAvailable(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Biometrics Check Screen</Text>
//       {biometricsAvailable === null && <Text>Checking biometrics...</Text>}
//       {biometricsAvailable === true && <Text>Biometrics is available on this device!</Text>}
//       {biometricsAvailable === false && <Text>Biometrics is not available on this device.</Text>}
//       <Button title="Check Biometrics Again" onPress={checkBiometrics} />
//     </View>
//   );
// };

// export default BiometricsCheckScreen;





// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const SignInScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = async () => {
//     try {
//       const serverUrl = 'http://127.0.0.1:3000'; // Replace with your server IP
      

//       const response = await axios.post(serverUrl, {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         console.log('Authentication successful');
//         // Navigate to the home screen or perform actions after successful sign-in
//       } else {
//         console.error('Authentication failed:', response.data.message);
//         // Handle authentication failure (e.g., show error message)
//       }
//     } catch (error) {
//       console.error('Error during sign-in:', error.message);
//     }
//   };







//  2SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Biometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import Home from './home';
import { Screen } from 'react-native-screens';


  const SignIn = ({navigtion}) => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setloading]=useState(false);


  const handleSignin= async () => {

    setloading(true);
      // Validate input fields (you can add more validation as needed)
      if (!email || !password) {
       Alert.alert('Please fill in all fields');
      }

      try {
        const { data } = await axios.post ("http://loaclhost:8000/api/signIn",{
         email,
          password,
      });
      if(data.error){

        Alert.alert(data.error);
      }
      else {
        setloading(false);
        console.log ("SIGNIN SUCCESS »> ", data); 

        Alert.alert ("Sign in successful");
        navigation.navigate('tab',{screen:'home'});
      }

      }  catch (error) {
        Alert.alert('SigninFailed', error);
        console.error('Signin Error:', error);
        setloading(false);
       
      }
    };
    
    

    const authenticateWithFaceID = async () => {
      try {
        const isFaceIDAvailable = await LocalAuthentication.hasHardwareAsync() && 
                                  await LocalAuthentication.isEnrolledAsync();
  
        if (isFaceIDAvailable) {
          const isAuthenticated = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with Face ID',
          });
  
          if (isAuthenticated.success) {
            // Face ID authentication successful, proceed with sign-in
            handleSignIn();
          } else {
            // Face ID authentication failed
            Alert.alert('Authentication failed', 'Unable to authenticate with Face ID');
          }
        } else {
          // Face ID not available or not enrolled
          Alert.alert('Face ID not available', 'Face ID is not available or not enrolled on this device.');
        }
      } catch (error) {
        console.error('Face ID authentication error:', error);
      }
    };
  
  
  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Sign In</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Sign In"
        onPress={handleSignin}
        buttonStyle={styles.signInButton}
        
      />
      <Text> not yet registered </Text>
      <Button onPress={()=>navigation.navigate('stack',{screen:'SignupScreen'})}/>
       {authenticateWithFaceID ? (
        <Button
          title={`Sign In with ${authenticateWithFaceID}`}
          onPress={authenticateWithFaceID}
          buttonStyle={styles.biometricButton}
        />
       ) : (
        <Text>Biometrics not available on this device</Text>
      )}
      

    </View>
  );
      }
      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    marginTop: 13,
    
  },
  biometricButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SignIn;



  