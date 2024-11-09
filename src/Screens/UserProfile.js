import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext,useState,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import { UserContext } from '../compoments/usercontext';
import CustomLoadingSpinner from '../compoments/Loading';
import { useLoading } from '../compoments/LoadingContext';
import { Image } from 'react-native-elements';
import { Strings } from '../res/Strings';


const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const { showLoader, hideLoader } = useLoading();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const User = route.params?.User;
  const {language,setLanguage} = useContext(UserContext)
        

  // console.log("Userr::", route.params);

  const RenderSkills = () => {
    if (!User?.skills || User?.skills.length === 0) {
      return <Text style={styles.noSkills}>No skills added.</Text>;
    }
    return User?.skills.map((skills, index) => (
      <View key={index} style={styles.skillBadge}>
        <Text style={styles.skill}>{skills}</Text>
      </View>
    ));
  };

  const RenderExperiences = () => {
    if (!User?.experiences || User?.experiences.length === 0) {
      return <Text style={styles.noSkills}>No experiences added</Text>;
    }
    return User?.experiences.map((experiences, index) => (
      <TouchableOpacity key={index} style={styles.experienceItem}>
        <Text style={styles.experienceText}>{experiences}</Text>
        <Text style={styles.experienceYears}></Text>
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    if (User?.image) {
      // Preload the image to ensure it's available when needed
      Image.prefetch(User.image)
        .then(() => setLoading(false)) // Set loading to false when prefetch is done
        .catch(() => setLoading(false)); // Handle errors
    } else {
      setLoading(false);
    }
  }, [User?.image]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
      <Avatar
        size={100}
        rounded
        source={User?.image ? { uri: User.image } : null}
        icon={!User?.image ? { name: 'person', type: 'material' } : null}
        containerStyle={styles.avatar}
        onLoadStart={() => setLoading(true)}   // Show loader when image starts loading
        onLoadEnd={() => setLoading(false)}    // Hide loader when image finishes loading
        onError={() => setLoading(false)}      // Hide loader if there is an error
      />
      {loading && <CustomLoadingSpinner style={styles.loader} />} 

        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{User?.name}</Text>
          <Text style={styles.subtitle}>{User?.title}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.ProfilePage.Skills[language]}</Text>
        <View style={styles.skillsContainer}>
          {RenderSkills()}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.ProfilePage.Experience[language]}</Text>
        {RenderExperiences()}
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: '#3d4db7',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#3d4db7',
    paddingBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#3A416F',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  skill: {
    color: '#fff',
    fontSize: 16,
  },
  experienceItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  experienceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  experienceYears: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  noSkills: {
    fontSize: 16,
    color: '#999',
  },
});

export default UserProfile;



// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// import React from 'react';

// import { UserContext } from '../compoments/usercontext';
// import { useContext } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { Avatar } from '@rneui/themed';

// const UserProfile = () => {
//   const { user, setUser } = useContext(UserContext);
//   const route = useRoute();
//   const User = route.params?.User;

//   console.log("Userr::", route.params);

//   const RenderSkills = () => {
//     if (!User?.skills || User?.skills.length === 0) {
//       return <Text style={styles.noSkills}>No skills added.</Text>;
//     }
//     return User?.skills.map((skills, index) => (
//       <View key={index} style={styles.skillBadge}>
//         <Text style={styles.skill}>{skills}</Text>
//       </View>
//     ));
//   };

//   const RenderExperiences = () => {
//     if (!User?.experiences || User?.experiences.length === 0) {
//       return <Text style={styles.noSkills}>No experiences added</Text>;
//     }
//     return User?.experiences.map((experiences, index) => (
//       <TouchableOpacity key={index} style={styles.experienceItem}>
//         <Text style={styles.experienceText}>{experiences}</Text>
//         <Text style={styles.experienceYears}></Text>
//       </TouchableOpacity>
//     ));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <Avatar
//           size={100}
//           rounded
//           icon={{ name: 'person', type: 'material' }}
//           containerStyle={{ backgroundColor: '#3d4db7', marginBottom: 20 }}
//         />
//         <View style={styles.headerTextContainer}>
//           <Text style={styles.name}>{User?.name}</Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Skills</Text>
//           <View style={styles.skillsContainer}>
//             {RenderSkills()}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Experience</Text>
//           {RenderExperiences()}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F0F0F0',
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   headerTextContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   section: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#3d4db7',
//     alignSelf: 'flex-start',
//     borderBottomWidth: 2,
//     borderBottomColor: '#3d4db7',
//   },
//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillBadge: {
//     backgroundColor: '#3d4db7',
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   skill: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   experienceItem: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   experienceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   experienceYears: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 5,
//   },
//   noSkills: {
//     fontSize: 16,
//     color: '#999',
//   },
// });

// export default UserProfile;






// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import React from 'react'
// import ProfilePage from './profile'
// import { UserContext } from '../compoments/usercontext';
// import { useContext } from 'react';
// import { Api } from '../res/api';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useFocusEffect, useRoute } from '@react-navigation/native';
// import { useCallback } from 'react';
// import { Avatar } from '@rneui/themed';


// const UserProfile = (props) => {


//   const { user, setUser } = useContext(UserContext);
//   const [posts, setPosts] = useState([]);
//   const route = useRoute()
//   const  User  = route.params?.User


//   console.log("Userr::", route.params)
  


//   const RenderSkills = () => {
//     if (!User?.skills || User?.skills.length === 0) {
//       return <Text style={styles.noSkills}>No skills added.</Text>;
//     }
//     return User?.skills.map((skills, index, item) => (
//       <View key={index} style={styles.skillBadge}>

//         <Text style={styles.skill}>{skills}</Text>
//       </View>
//     ))
//   }

//   const RenderExperiences = () => {
//     if (!User?.experiences || User?.experiences.length === 0) {
//       return <Text style={styles.noSkills}>No experiences added</Text>;
//     }
//     return User?.experiences.map((experiences, index, item) => (
//       <TouchableOpacity key={index} style={styles.experienceItem}>
//         <Text style={styles.experienceText}>{experiences}</Text>
//         <Text style={styles.experienceYears}>{ }</Text>
//       </TouchableOpacity>
//     ))

//   };
//   return (

//     <ScrollView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <Avatar
//           size={80}
//           rounded
//           icon={{ name: 'rowing' }}
//           containerStyle={{ backgroundColor: '#3d4db7' }} />

//         {/* <Image source={require("../Images/Avatar.png")} style={styles.avatar} /> */}
//         <View style={styles.headerTextContainer}>
//           <Text style={styles.name}>{User?.name}</Text>

//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Skills</Text>
//           <View style={styles.skillsContainer}>

//             {RenderSkills()}

//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle2}>Experience</Text>

//           {RenderExperiences()}

//         </View>
//       </View>
//     </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 0,
//     padding: 30,
//     backgroundColor: '#f5f5f5', // Light grey background for contrast
//   },
//   profileHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#f5f5f5'
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 15,
//   },
//   headerTextContainer: {
//     flex: 1,
//     marginBottom: 50,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 23,
//   },
//   eliteText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     marginBottom: 20,
//     alignItems: "baseline",
//     borderRadius: 40,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     right: 20,

//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     backgroundColor: "white",
//     // '#f5f5f5',
//     borderRadius: 20,
//     margin: 5,
//     borderWidth: 1,
//     overflow: 'hidden'

//   },
//   sectionTitle2: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     right: 60,
//     marginTop: 40,
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     margin: 5,
//     borderWidth: 1,
//     borderColor: 'gray',
//     overflow: 'hidden',

//   },

//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillBadge: {
//     backgroundColor: '#007bff',
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   skill: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   experienceItem: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     backgroundColor: '#fff',
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   experienceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   experienceYears: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   noSkills: {
//     fontSize: 20,
//   },
// });

// export default UserProfile