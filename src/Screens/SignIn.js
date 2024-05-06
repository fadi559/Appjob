
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
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';
import user from '../compoments/User';



const SignIn = ({ navigtion }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics()
  const { showLoader, hideLoader } = useLoading();


  const handleSignin = async () => {


    const sucsses = await loadFromAsyncStorage()

    //  if(sucsses){
    //   handleBiometricLogin();

    //  }else{

    if (!email || !password) {

      Alert.alert('Please fill in all fields');
    } else

      
    try {
      const { data } = await axios.post(Api.signIn, {
        email,
        password,
      });

      if (data.error) {
        Alert.alert(data.error);
      }
      else {
        // console.log("Data:",data)
        await AsyncStorage.setItem("@auth", JSON.stringify(data));

        console.log("SIGNIN SUCCESS »> ", data.user);
        setUser(data.user)

        navigation.navigate('tab', { screen: 'home' });
      }
    } catch (error) {
      Alert.alert('SigninFailed', error);
      console.error('Signin Error:', error);
      setloading(false);
    }
    
    // };
  };

  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    if (data) {
      const { user } = JSON.parse(data)
      console.log("FROM ASYNC STORAGE the get  → ", user);
      setUser(user)
      // navigation.navigate('tab', { screen: 'home' });
      return true;
    }
  };

  const handleBiometricLogin = async (isStart) => {

    const sucsses = await loadFromAsyncStorage()

    console.log("sucsses: " , sucsses);
    console.log("isStart: " , isStart);

    if (!sucsses) {
      !isStart && Alert.alert('No User Data signed')
      return ; 
    }

    console.log("after if ");

    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;

        console.log("available: " , resultObject);

        if (available) {
          rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
              const { success } = resultObject;

              if (success) {
                console.log('successful biometrics provided');
                loadFromAsyncStorage();
                navigation.navigate('tab', { screen: 'home' });

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
  // const  sucsses = loadFromAsyncStorage()

  
  useEffect(() => {
    handleBiometricLogin(true)
    

  }, []);
  


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
        onPress={() => navigation.navigate('stack', { screen: 'SignupScreen' })} >signup</Text>  </Text>

      <TouchableOpacity style={styles.button} onPress={()=> handleBiometricLogin()}>
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
  SmallSignupButton: {
    color: '#a52a2a',
    height: 9,

  },
  SmallSignupButton2: {
    marginTop: 10,
    marginBottom: 80,
  },
  faceid: {
    justifyContent: 'center',
    width: 80,
    height: 85,
    alignItems: 'center',

  },
});

export default SignIn;



