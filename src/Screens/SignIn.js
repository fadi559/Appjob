
import React, { useContext, useState } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Biometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native'
import { Api } from '../res/api';
import { UserContext } from '../compoments/usercontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';





  const SignIn = ({navigtion}) => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const {setUser}=useContext(UserContext);
  const[loading,setloading]=useState(false);
  const rnBiometrics = new ReactNativeBiometrics()


  const handleSignin= async (data) => {

    setloading(true);
     const sucsses = await loadFromAsyncStorage()

     if(sucsses){
      return
    }else
  
      if (!email || !password) {
        
       Alert.alert('Please fill in all fields');
      }else
      try {
        const { data } = await axios.post (Api.signIn,{
         email,
          password,
      });
      
      if(data.error){
         Alert.alert(data.error);
      }
      else {
         await AsyncStorage.setItem ("@auth", JSON.stringify(data));
        setloading(false);
         console.log ("SIGNIN SUCCESS »> ", data.user); 
        setUser(data.user)
        
        navigation.navigate('tab',{screen:'home'});
      }
      }  catch (error) {
        Alert.alert('SigninFailed', error);
        console.error('Signin Error:', error);
        setloading(false);
      }  
    };

    const loadFromAsyncStorage = async () =>
    {
    let data=await AsyncStorage.getItem("@auth");
      if(data){
        const {user} = JSON.parse(data)
        console.log ("FROM ASYNC STORAGE the get  → ", user);
        setUser(user)
        navigation.navigate('tab',{screen:'home'});
        return true;
      }
    };


    
    
    const handleBiometricLogin = () => {
      rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
          const { available, biometryType } = resultObject;
  
          if (available && biometryType === ReactNativeBiometrics.TouchID) {
            console.log('TouchID is supported');
          } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
            console.log('FaceID is supported');
          } else if (available) {
            console.log('Biometric sensor is supported');
          } else {
            console.log('Biometric sensor is not supported');
          }

          if (available) {
            rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
              .then((resultObject) => {
                const { success } = resultObject;
  
                if (success) {
                  console.log('successful biometrics provided');
                    loadFromAsyncStorage();
                  navigation.navigate('tab',{screen:'home'});

                  // You can proceed with logging the user in or accessing secure content
                } else {
                  console.log('user cancelled biometric prompt');
                  
                }
              })
              .catch(() => {
                console.log('biometrics failed');
              });
          }
        });
      }

      
    
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

    
      <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
        <Image 
        
        source={require('../Images/facidbig.png')}
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
    height: 85, 
    
    alignItems: 'center',
    
  },
  

});

export default SignIn;



// const authenticate = async () => {
  //       try {
  //         const { available, biometryType } = await Biometrics.isSensorAvailable();
  //         if (available && biometryType === Biometrics.BiometryType.FACE_ID) {
  //           const { success, error } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });
  //           if (success) {
  //             // Face ID authentication successful
  //             setAuthStatus('Authentication successful');
  //             // Send authentication token to the backend
  //             sendAuthTokenToBackend();
  //           } else {
  //             setAuthStatus('Authentication failed');
  //           }
  //         } else {
  //           setAuthStatus('Face ID not available');
  //         }
  //       } catch (error) {
  //         console.error('Biometrics error:', error);
  //       }
  //     };
    
  
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
  // }
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //   useEffect(() => {
  //     // Assuming this function checks for Face ID support
  //     checkFaceIDSupport();
  //   }, []);
  
  //   const checkFaceIDSupport = async () => {
  //     try {
  //       const result = await Biometrics.isSensorAvailable();
  //       if (result !== Biometrics.FaceID) {
  //         Alert.alert('Face ID not available', 'This device does not support Face ID.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   const handleAuthenticate = () => {
  //     Biometrics.simplePrompt('Confirm your identity')
  //       .then(() => {
  //         setIsAuthenticated(true);
  //         Alert.alert('Authentication Successful', 'You have been granted access.');
  //         // Here you can navigate to another screen or unlock features
  //       })
  //       .catch(() => {
  //         Alert.alert('Authentication Failed', 'You could not be authenticated.');
  //       });
  //   };