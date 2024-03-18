
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



import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Biometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import Home from './home';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native'
import { ImageBackground } from 'react-native';
import { Api } from '../res/api';
import TopNotification from '../compoments/AlertPro';
import { UserContext } from '../compoments/usercontext';


  const SignIn = ({navigtion}) => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const {setUser}=useContext(UserContext);


  const[loading,setloading]=useState(false);



  const handleSignin= async () => {

    setloading(true);
      // Validate input fields (you can add more validation as needed)
      if (!email || !password) {
       Alert.alert('Please fill in all fields');
      }

      try {
        const { data } = await axios.post (Api.signIn,{
         email,
          password,
      });
      if(data.error){

        Alert.alert(data.error);
      }
      else {
        setloading(false);
        // console.log ("SIGNIN SUCCESS »> ", data.user); 
        setUser(data.user)
        // Alert.alert ("Sign in successful");
        navigation.navigate('tab',{screen:'home'});
      
      }

      }  catch (error) {
        Alert.alert('SigninFailed', error);
        console.error('Signin Error:', error);
        setloading(false);
       
      }
    };
    const authenticate = async () => {
      try {
        const { available, biometryType } = await Biometrics.isSensorAvailable();
        if (available && biometryType === Biometrics.BiometryType.FACE_ID) {
          const { success, error } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });
          if (success) {
            // Face ID authentication successful
            setAuthStatus('Authentication successful');
            // Send authentication token to the backend
            sendAuthTokenToBackend();
          } else {
            setAuthStatus('Authentication failed');
          }
        } else {
          setAuthStatus('Face ID not available');
        }
      } catch (error) {
        console.error('Biometrics error:', error);
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
       
      <Text style={styles.SmallSignupButton2}> not yet registered  <Text style={styles.SmallSignupButton} 
       onPress={()=>navigation.navigate('stack',{screen:'SignupScreen'})} >signup</Text>  </Text>
      


      <TouchableOpacity onPress={authenticate} style={styles.button}>
        <Image 
        source={require('../Images/faceidsmall.png')}
        style={styles.faceid}
        />
       
      </TouchableOpacity>

       
        {/* <Text>Biometrics not available on this device</Text> */}
      
      

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
  SmallSignupButton:{
    color:'#a52a2a',
    height:9,
    
  },
  SmallSignupButton2:{
    marginTop:10,
    marginBottom:80,
  },
  faceid:{
    justifyContent: 'center',
    width: 80, 
    height: 80, 
    alignItems: 'center',
    
  },
  

});

export default SignIn;



  