import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { UserContext } from '../compoments/usercontext';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';

const Page2 = ({ route }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [customJobType, setCustomJobType] = useState('');
  const [items, setItems] = useState([
    { label: 'Full-Time', value: 'Full-Time' },
    { label: 'Part-Time', value: 'Part-Time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Freelance', value: 'Freelance' },
    { label: 'Other', value: 'Other' },
  ]);
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNext = async () => {
    const jobType = selectedJobType === 'Other' ? customJobType : selectedJobType;
    if (jobType) {
      try {
        const updatedUser = { ...user, jobType };
        await axios.post(Api.preferences, { userId: user._id, jobType });
        setUser(updatedUser);
        navigation.navigate('Page3');
      } catch (error) {
        Alert.alert('Error', 'Failed to save preferences. Please try again.');
      }
    } else {
      Alert.alert('Please select or enter a job type');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Page3');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>What type of job are you looking for?</Text>
        <DropDownPicker
          open={open}
          value={selectedJobType}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedJobType}
          setItems={setItems}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownContainerStyle={styles.dropdown}
          placeholder="Choose a job type"
          placeholderStyle={styles.placeholder}
          textStyle={styles.text}
          labelStyle={styles.label}
          selectedItemContainerStyle={styles.selectedItemContainer}
          selectedItemLabelStyle={styles.selectedItemLabel}
          onChangeValue={(value) => setCustomJobType('')}
        />
        {selectedJobType === 'Other' && (
          <TextInput
            style={styles.input}
            placeholder="Enter your job type"
            placeholderTextColor="#ccc"
            value={customJobType}
            onChangeText={setCustomJobType}
          />
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
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
    backgroundColor: '#f8f9fa',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  placeholder: {
    color: '#888',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemContainer: {
    backgroundColor: '#e0e0e0',
  },
  selectedItemLabel: {
    fontWeight: 'bold',
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
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
  skipButton: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  skipText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default Page2;





// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const Page2 = ({ navigation, route }) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [open, setOpen] = useState(false);
//   const [selectedJobType, setSelectedJobType] = useState(null);
//   const [customJobType, setCustomJobType] = useState('');
//   const [items, setItems] = useState([
//     { label: 'Full-Time', value: 'Full-Time' },
//     { label: 'Part-Time', value: 'Part-Time' },
//     { label: 'Contract', value: 'Contract' },
//     { label: 'Internship', value: 'Internship' },
//     { label: 'Freelance', value: 'Freelance' },
//     { label: 'Other', value: 'Other' },
//   ]);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleNext = () => {
//     const jobType = selectedJobType === 'Other' ? customJobType : selectedJobType;
//     if (jobType) {
//       navigation.navigate('Page3', { jobType });
//     } else {
//       Alert.alert('Please select or enter a job type');
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('Page3');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Text style={styles.title}>What type of job are you looking for?</Text>
//         <DropDownPicker
//           open={open}
//           value={selectedJobType}
//           items={items}
//           setOpen={setOpen}
//           setValue={setSelectedJobType}
//           setItems={setItems}
//           containerStyle={styles.pickerContainer}
//           style={styles.picker}
//           dropDownContainerStyle={styles.dropdown}
//           placeholder="Choose a job type"
//           placeholderStyle={styles.placeholder}
//           textStyle={styles.text}
//           labelStyle={styles.label}
//           selectedItemContainerStyle={styles.selectedItemContainer}
//           selectedItemLabelStyle={styles.selectedItemLabel}
//           onChangeValue={(value) => setCustomJobType('')}
//         />
//         {selectedJobType === 'Other' && (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your job type"
//             placeholderTextColor="#ccc"
//             value={customJobType}
//             onChangeText={setCustomJobType}
//           />
//         )}
//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextText}>Next</Text>
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
//     backgroundColor: '#f8f9fa',
//   },
//   content: {
//     width: '90%',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   pickerContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   picker: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingVertical: 10,
//   },
//   dropdown: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   placeholder: {
//     color: '#888',
//     fontSize: 16,
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectedItemContainer: {
//     backgroundColor: '#e0e0e0',
//   },
//   selectedItemLabel: {
//     fontWeight: 'bold',
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
//   nextButton: {
//     backgroundColor: 'black',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 10,
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

// export default Page2;
