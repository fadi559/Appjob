import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../compoments/usercontext';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';
import CheckBox from '@react-native-community/checkbox';

const Page3 = ({ route }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentJob, setCurrentJob] = useState('');
  const [noJob, setNoJob] = useState(false); // New state variable
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Log route.params to debug
  useEffect(() => {
    console.log('Route Params:', route.params);
  }, [route.params]);

  const handleFinish = async () => {
    try {
      // Add default values for interests and jobType
      const { interests = 'defaultInterests', jobType = 'defaultJobType' } = route.params || {};
      const jobStatus = noJob ? 'Unemployed' : currentJob;
      const updatedUser = { ...user, interests, jobType, currentJob: jobStatus };

      // Log the data being sent
      console.log('Sending data:', { userId: user._id, interests, jobType, currentJob: jobStatus });

      await axios.post(Api.preferences, { userId: user._id, interests, jobType, currentJob: jobStatus });
      setUser(updatedUser);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>What is your current job?</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Job"
          placeholderTextColor="#ccc"
          value={noJob ? '' : currentJob}
          onChangeText={setCurrentJob}
          editable={!noJob} 
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={noJob}
            onValueChange={setNoJob}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>I don't have a job</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleFinish}>
          <Text style={styles.nextText}>Finish</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',  // Updated to match Page1
  },
  content: {
    width: '90%',  // Updated to match Page1
    alignItems: 'center',
    backgroundColor: '#ffffff',  // Updated to match Page1
    padding: 20,
    borderRadius: 15,  // Updated to match Page1
    shadowColor: '#000',
    shadowOpacity: 0.2,  // Updated to match Page1
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    marginBottom: 20,  // Updated to match Page1
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007bff',  // Updated to match Page1
    paddingVertical: 12,  // Updated to match Page1
    paddingHorizontal: 25,  // Updated to match Page1
    borderRadius: 10,  // Updated to match Page1
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
  skipButton: {
    position: 'absolute',
    top: 70,  // Updated to match Page1
    right: 20,
  },
  skipText: {
    color: '#007bff',  // Updated to match Page1
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#333',
  },
});

export default Page3;





