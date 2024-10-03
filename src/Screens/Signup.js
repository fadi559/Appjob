  
    
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet,TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SignIn from './SignIn';
import { Api } from '../res/api';
import { UserContext } from '../compoments/usercontext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import { color } from '@rneui/base';
import { Strings } from '../res/Strings';



const SignupScreen = ({navigtion},props) => {
    const navigation = useNavigation(props);
    const [phoneNumber, setphoneNumber] =useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setloading]=useState(false);
  const {setUser}=useContext(UserContext);
  const {language,setLanguage} = useContext(UserContext)


  const handleSignup = async () => {
    setloading(true);
      
      if (!name || !email || !password|| !phoneNumber) {
      
      }
      try {
        const { data } = await axios.post (Api.signup,{
          name,
         email,
         phoneNumber,
          password,
          
      });
      
      if(data.error){

        Alert.alert(data.error);
      }
      else {
        // await AsyncStorage.setItem ("@auth", JSON.stringify(data));
        setloading(false);
        console. log ("SIGN up SUCCESS »> ", data); 
        setUser(data.user)
      // Alert.alert ("Sign up successful");
        navigation.navigate('UpdateProfileImage',{ userId: data.user});
        // navigation.navigate('stack', { screen: 'Page1', params: { userId: data.user._id} })
      }
      //   navigation.navigate('stack',{screen:'SignIn'});
      // }
      }  catch (error) {
        Alert.alert( Strings.ALertSginUp.SignupFailed[language], error);
        Strings.ALertSginUp.FaieldALert[language]
        console.error('Signup Error:', error);
        setloading(false);
      }
    };
  return (  
    <View style={styles.container}>
      <Text style={styles.title}> {Strings.EntreyPage.sign_up[language]}</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={ Strings.EntreyPage.yourName[language]}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={ Strings.EntreyPage.email[language]}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={ Strings.EntreyPage.password[language]}
        secureTextEntry
        placeholderTextColor="#888"
      />
     <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setphoneNumber(text)}
        placeholder={ Strings.EntreyPage.phoneNumber[language]}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#888"
    
      /> 
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{ Strings.EntreyPage.sign_up[language]}</Text>
      </TouchableOpacity>
      <Text style={{marginTop:15}}>{ Strings.EntreyPage.AlreadyJoin[language]} <Text style={styles.SmallSignInButton} 
       onPress={()=>navigation.navigate('stack',{screen:'SignIn'})
      } >{ Strings.EntreyPage.sign_in[language]}      </Text>  </Text>
                    
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
    color: 'black',
    
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

    
    
    
  