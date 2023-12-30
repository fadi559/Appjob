
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

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sign In</Text>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Sign In" onPress={handleSignIn} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     marginBottom: 16,
//     padding: 10,
//     borderWidth: 1,
//   },
// });

// export default SignInScreen;







//  2SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Biometrics from 'react-native-biometrics';
import Home from './home';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [biometricType, setBiometricType] = useState(null);

  const checkBiometrics = async () => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();

      if (available && biometryType === Biometrics.Biometrics) {
        setBiometricType(biometryType);
      } else {
        console.error('Biometrics not available');
      }
    } catch (error) {
      console.error('Error checking biometrics:', error);
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const { success } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });

      if (success) {
        console.log('Authentication successful');
        // Navigate to the next screen or perform actions after successful authentication
      } else {
        console.log('Authentication failed or canceled');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
    }
  };

  const signIn = async () => {
    
    // Perform actual authentication logic here
    if (email && password) {
      try {
        
        // Example: Authenticate with a hypothetical backend serv
        const response = await fetch('http://127.0.0.1:3000/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Authentication successful
          console.log('Authentication successful');
          navigation.navigate('Home'); // Navigate to the Home screen or the next screen in your app
        } else {
          // Authentication failed
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    } else {
      console.log('Email and password are required');
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
        onPress={signIn}
        buttonStyle={styles.signInButton}
      />
      {biometricType ? (
        <Button
          title={`Sign In with ${biometricType}`}
          onPress={authenticateWithBiometrics}
          buttonStyle={styles.biometricButton}
        />
      ) : (
        <Text>Biometrics not available on this device</Text>
      )}
      

    </View>
  );
};

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

export default SignInScreen;



// // SignInScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Input, Button } from 'react-native-elements';
// import Biometrics from 'react-native-biometrics';

// const SignInScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [biometricType, setBiometricType] = useState(null);

//   const checkBiometrics = async () => {
//     try {
//       const { available, biometryType } = await Biometrics.isSensorAvailable();

//       if (available && biometryType === Biometrics.Biometrics) {
//         setBiometricType(biometryType);
//       } else {
//         console.error('Biometrics not available');
//       }
//     } catch (error) {
//       console.error('Error checking biometrics:', error);
//     }
//   };

//   const authenticateWithBiometrics = async () => {
//     try {
//       const { success } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });

//       if (success) {
//         console.log('Authentication successful');
//         // Navigate to the next screen or perform actions after successful authentication
//       } else {
//         console.log('Authentication failed or canceled');
//       }
//     } catch (error) {
//       console.error('Error during biometric authentication:', error);
//     }
//   };

//   const signIn = async () => {
//     // Perform actual authentication logic here
//     if (email && password) {
//       try {
//         // Example: Authenticate with a hypothetical backend service
//         const response = await fetch('https://your-backend-api.com/authenticate', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//           // Authentication successful
//           console.log('Authentication successful');
//           navigation.navigate('Home'); // Navigate to the Home screen or the next screen in your app
//         } else {
//           // Authentication failed
//           console.log('Authentication failed');
//         }
//       } catch (error) {
//         console.error('Error during authentication:', error);
//       }
//     } else {
//       console.log('Email and password are required');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sign In</Text>
//       <Input
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         style={styles.input}
//       />
//       <Input
//         placeholder="Password"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button
//         title="Sign In"
//         onPress={signIn}
//         buttonStyle={styles.signInButton}
//       />
//       {biometricType ? (
//         <Button
//           title={`Sign In with ${biometricType}`}
//           onPress={authenticateWithBiometrics}
//           buttonStyle={styles.biometricButton}
//         />
//       ) : (
//         <Text>Biometrics not available on this device</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   signInButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   biometricButton: {
//     backgroundColor: '#3498db',
//     borderRadius: 5,
//     marginTop: 20,
//   },
// });

// export default SignInScreen;



// // / SignInScreen.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Biometrics from 'react-native-biometrics';
// import Stacknav from '../../route/stack';

// const SignInScreen = ({ navigation }) => {
//   const [biometricType, setBiometricType] = useState(null);

//   const checkBiometrics = async () => {
//     try {
//       const { available, biometryType } = await Biometrics.isSensorAvailable();

//       if (available && biometryType === Biometrics.Biometrics) {
//         setBiometricType(biometryType);
//       } else {
//         console.error('Biometrics not available');
//       }
//     } catch (error) {
//       console.error('Error checking biometrics:', error);
//     }
//   };

//   const authenticateWithBiometrics = async () => {
//     try {
//       const { success } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });

//       if (success) {
//         console.log('Authentication successful');
//         // Navigate to the next screen or perform actions after successful authentication
//       } else {
//         console.log('Authentication failed or canceled');
//       }
//     } catch (error) {
//       console.error('Error during biometric authentication:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Sign In Page</Text>
//       {biometricType ? (
//         <TouchableOpacity onPress={authenticateWithBiometrics} style={styles.button}>
//           <Text>Sign In with {biometricType}</Text>
//         </TouchableOpacity>
//       ) : (
//         <Text>Biometrics not available on this device</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//   },
// });

// export default SignInScreen;
