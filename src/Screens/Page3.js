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
    backgroundColor: '#f0f0f5',
  },
  content: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
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
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  skipText: {
    color: 'black',
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





// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';

// const Page3 = ({ navigation, route }) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [currentJob, setCurrentJob] = useState('');
//   const [noCurrentJob, setNoCurrentJob] = useState(false);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleFinish = () => {
//     const { interests, jobType } = route.params;
//     if (!noCurrentJob && !currentJob) {
//       Alert.alert('Please enter your current job or select "I do not have a current job".');
//       return;
//     }
//     // Submit preferences to backend
//     navigation.navigate('stack', { screen: 'SignIn' });
//   };

//   const handleSkip = () => {
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Text style={styles.title}>What is your current job?</Text>
//         {!noCurrentJob && (
//           <TextInput
//             style={styles.input}
//             placeholder="Current Job"
//             placeholderTextColor="#ccc"
//             value={currentJob}
//             onChangeText={setCurrentJob}
//           />
//         )}
//         <View style={styles.checkboxContainer}>
//           <CheckBox
//             value={noCurrentJob}
//             onValueChange={setNoCurrentJob}
//             tintColors={{ true: 'black', false: 'gray' }}
//           />
//           <Text style={styles.checkboxLabel}>I do not have a current job</Text>
//         </View>
//         <TouchableOpacity style={styles.nextButton} onPress={handleFinish}>
//           <Text style={styles.nextText}>Finish</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f5',
//   },
//   content: {
//     width: '80%',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//     color: '#333',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//     width: '100%',
//     color: '#333',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: '#333',
//   },
//   nextButton: {
//     backgroundColor: 'black',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   nextText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//   },
//   skipText: {
//     color: 'black',
//     fontSize: 16,
//   },
// });

// export default Page3;
