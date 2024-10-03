
import React, { useContext, useRef, useState } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import { View, Text, StyleSheet, Alert, Image ,Modal} from 'react-native';
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
import { Strings } from '../res/Strings';
import { Animated,TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';






const SignIn = ({ navigtion }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const { setUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics()
  const { showLoader, hideLoader } = useLoading();
  const {language,setLanguage} = useContext(UserContext)

  const [dropdownVisible, setDropdownVisible] = useState(false);
const dropdownAnimation = useRef(new Animated.Value(-200)).current;


  const handleSignin = async () => {

    if (!email || !password) {
      navigation.navigate('tab', { screen: 'home' });
      // neeed to delet the navgition 
      // Alert.alert('Please fill in all fields');
      return;

    } else
    showLoader(true)
    try {
      const { data } = await axios.post(Api.signIn, {
        email,
        password,
      });
      if (data.error) {
        Alert.alert(data.error);
        // qusetion how to do it , wrong password and no user data but it from server 
      }
      else {
        // console.log("Data:",data)
        await AsyncStorage.setItem("@auth", JSON.stringify(data));

        console.log("SIGNIN SUCCESS »> ", data.user);
        setUser(data.user);

        navigation.navigate('tab', { screen: 'home' });
      }
    } catch (error) {
      Alert.alert('SigninFailed', error);
      console.error('Signin Error:', error);
      hideLoader(false)
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
    // console.log("sucsses: " , sucsses);
    // console.log("isStart: " , isStart);

    if (!sucsses) {
      !isStart && Alert.alert(Strings.AlertsignIn.NoUserDataSigned[language])

  
      return ; 
    }
    // console.log("after if ");
    
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
        // console.log("available: " , resultObject);
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
  

  useEffect(() => {
    handleBiometricLogin(true)
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) {
      Animated.timing(dropdownAnimation, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownAnimation, {
        toValue: -200, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  const selectLanguage = (language) => {
    setLanguage(language); 
    toggleDropdown(); 
  };

  return (
  
    
    <View style={styles.container}>
    <TouchableOpacity onPress={toggleDropdown} style={styles.MainLangugeButton}>
  <LinearGradient
    colors={['#ff7e5f', '#feb47b']} 
    style={styles.languageButtonGradient} 
  >
    <Text style={styles.languageButtonText}>
  {language === 'eng' ? 'EN' : language === 'arabic' ? 'AR' : 'HE'}
</Text>
  </LinearGradient>
</TouchableOpacity>

      
      {/* <Button title={"test"} onPress={()=>{setLanguage("arabic")}}/> */}
      <Text style={styles.header}>{Strings.EntreyPage.sign_in[language]}</Text>
      <CustomLoadingSpinner/>
      <Input
        placeholder={Strings.EntreyPage.email[language]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Input
        placeholder={Strings.EntreyPage.password[language]}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
     
      <Button
        title={Strings.EntreyPage.sign_in[language]}
        onPress={handleSignin}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.signInButton}
      />
      <Text style={styles.SmallSignupButton2}> {Strings.EntreyPage.notYetRegsister[language]}  <Text style={styles.SmallSignupButton}
        onPress={() => navigation.navigate('stack', { screen: 'SignupScreen' })}>{Strings.EntreyPage.sign_up[language]}          </Text></Text>

      <TouchableOpacity style={styles.button} onPress={()=> handleBiometricLogin()}>
        <Image
          source={require('../Images/facidbig.png')}
          style={styles.faceid}
        />
      </TouchableOpacity>

      {dropdownVisible && (
  <TouchableWithoutFeedback onPress={toggleDropdown}>
    <View style={styles.modalOverlay}>
      <Animated.View
        style={[
          styles.languageDropdown,
          { transform: [{ translateY: dropdownAnimation }] }, 
        ]}
      >
        <TouchableOpacity style={styles.languageOption} onPress={() => selectLanguage('eng')}>
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageOption} onPress={() => selectLanguage('arabic')}>
          <Text style={styles.languageText}>عربيه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageOption} onPress={() => selectLanguage('hebrew')}>
          <Text style={styles.languageText}>Hebrew</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  </TouchableWithoutFeedback>
)}

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
  titleStyle:{
fontSize:17,

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
  MainLangugeButton:{
    top:-210,
    right:210,

  },
  languageButtonGradient: {
    position: 'absolute',
    top: 40, 
    left: 20, 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  languageButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  languageDropdown: {
    position: 'absolute',
    top: 90, 
    left: 20, 
    width: 180, 
    backgroundColor: '#ffffff', 
    paddingVertical: 10,
    borderRadius: 15, 
    elevation: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, 
    zIndex: 1000, 
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  languageOption: {
    paddingVertical: 15, 
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center', 
  },
  languageText: {
    fontSize: 16, 
    color: '#333',
    fontWeight: '500',
  },
});

export default SignIn;



