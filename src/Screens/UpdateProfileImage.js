


import React, { useState } from 'react';
import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Api } from '../res/api';

const UpdateProfileImage = ({ route, navigation }) => {
  const { userId } = route.params;
  console.log("userid55",userId)


  const [image, setImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
      }
    });
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Please choose an image first');
      return;
    }

    const data = new FormData();
    data.append('userId', userId);
    data.append('image', {
      name: 'profile.jpg', 
      type: 'image/jpeg', 
      uri: image.uri,
    });
    console.log("Data55",data)
    try {
      const response = await axios.post(Api.updateProfileImage,data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Profile image updated successfully', response.data);
      // navigation.navigate('SignIn');
      alert("succcfuly",response.data)
    } catch (error) {
      console.log('Error updating profile image9999', error);
      alert('Error updating profile image9999: ' +error.message);
    }
  };
  const handleSkip = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Update Profile Image</Text>
      <TouchableOpacity style={styles.choosePhotoButton} onPress={handleChoosePhoto}>
        <Text style={styles.choosePhotoButtonText}>Choose Photo</Text>
      </TouchableOpacity>
      {image && <Image source={image} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
        <Text style={styles.updateButtonText}>Update Profile Image</Text>
      </TouchableOpacity>
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
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  skipButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  choosePhotoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  choosePhotoButtonText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  updateButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateProfileImage;

// import React, { useState } from 'react';
// import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import { Api } from '../res/api';

// const UpdateProfileImage = ({ route, navigation }) => {
//   const { userId } = route.params;
//   const [image, setImage] = useState(null);

//   const handleChoosePhoto = () => {
//     const options = {
//       mediaType: 'photo',
//     };
//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorCode);
//       } else {
//         const source = { uri: response.assets[0].uri };
//         setImage(source);
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     if (!image) {
//       alert('Please choose an image first');
//       return;
//     }

//     const data = new FormData();
//     data.append('userId', userId);
//     data.append('image', {
//       name: 'profile.jpg', // use the proper name or filename from response
//       type: 'image/jpeg', // use the proper type from response
//       uri: image.uri,
//     });

//     try {
//       const response = await axios.post(Api.signup, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Profile image updated successfully', response.data);
//       navigation.navigate('SignIn');
//     } catch (error) {
//       console.log('Error updating profile image', error);
//     }
    
//   };
//   const handleSkip = () => {
//     navigation.navigate('SignIn');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleSkip}>
//         <Text style={styles.buttonText}>Skip</Text>
//       </TouchableOpacity>

//       <Text>Update Profile Image</Text>
//       <Button title="Choose Photo" onPress={handleChoosePhoto} />
//       {image && <Image source={image} style={{ width: 100, height: 100 }} />}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Update Profile Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default UpdateProfileImage;
