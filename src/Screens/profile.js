import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProfilePage = () => {
  const userProfile = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg', // Replace with actual avatar URL
    skills: ['React Native', 'Node.js', 'MongoDB'],
    experience: [
      { company: 'Company A', role: 'Software Engineer', years: 2 },
      { company: 'Company B', role: 'Senior Developer', years: 3 },
    ],
    isElite: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{userProfile.name}</Text>
          {userProfile.isElite && (
            <View style={styles.eliteBadge}>
              <Text style={styles.eliteText}>Elite</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {userProfile.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skill}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {userProfile.experience.map((exp, index) => (
          <TouchableOpacity key={index} style={styles.experienceItem}>
            <Text style={styles.experienceText}>{exp.company} - {exp.role}</Text>
            <Text style={styles.experienceYears}>{exp.years} years</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white ', // Soft background color
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#E8AA42', // Accent color border
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D1049', // Primary color for text
  },
  eliteBadge: {
    marginTop: 5,
    backgroundColor: 'ack ', // Accent color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  eliteText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D1049', // Use the primary color
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#5D1049', // Primary color
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skill: {
    color: '#FFF',
    fontSize: 16,
  },
  experienceItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  experienceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D1049', // Text color
  },
  experienceYears: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ProfilePage;


// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// const ProfilePage = () => {
//   const userProfile = {
//     name: 'John Doe',
//     avatarUrl: 'https://example.com/avatar.jpg', // Replace with actual avatar URL
//     skills: ['React Native', 'Node.js', 'MongoDB'],
//     experience: [
//       { company: 'Company A', role: 'Software Engineer', years: 2 },
//       { company: 'Company B', role: 'Senior Developer', years: 3 },
//     ],
//     isElite: true,
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatar} />
//         <View style={styles.headerTextContainer}>
//           <Text style={styles.name}>{userProfile.name}</Text>
//           {userProfile.isElite && (
//             <View style={styles.eliteBadge}>
//               <Text style={styles.eliteText}>Elite</Text>
//             </View>
//           )}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Skills</Text>
//         <View style={styles.skillsContainer}>
//           {userProfile.skills.map((skill, index) => (
//             <View key={index} style={styles.skillBadge}>
//               <Text style={styles.skill}>{skill}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Experience</Text>
//         {userProfile.experience.map((exp, index) => (
//           <TouchableOpacity key={index} style={styles.experienceItem}>
//             <Text style={styles.experienceText}>{exp.company} - {exp.role}</Text>
//             <Text style={styles.experienceYears}>{exp.years} years</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5', // Light grey background for contrast
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 15,
//   },
//   headerTextContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   eliteBadge: {
//     marginTop: 5,
//     backgroundColor: 'gold',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//     alignSelf:'center',
//     right:80,
//   },
//   eliteText: {
//     color: '#fff',
//     fontWeight: 'bold',
    
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
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
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
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
// });

// export default ProfilePage;



//  ProfileScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { users } from '../res/data/data';


// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const [skills, setSkills] = useState([...users[4].skill]);
//   const [experience, setExperience] = useState([
//    users[4]
    
//   ]);

//   return (
//     <View style={styles.container}>
    
   

//       <View style={styles.header}>
//         <TouchableOpacity >
//       <Text> {users[4].avatar}</Text>
//       </TouchableOpacity>
//         <Text style={styles.name}>{users[4].userName}</Text>
        
//         <Text style={styles.title}>{users[4].Joptype}</Text>
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Skills</Text>
//         {skills.map((skill, index) => (
//           <View key={index} style={styles.skill}>
//             <Text>{skill}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Experience</Text>
//         {experience.map((job, index) => (
//           <View key={index} style={styles.job}>
//             <Text style={styles.jobTitle}>{users[4].Joptype}</Text>
//             <Text>{users[4].phoneNumber}</Text>
//             <Text>{users[4].Experience}</Text>
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity
//         style={styles.editButton}
//         onPress={() => navigation.navigate('EditProfile')}
//       >
//         <MaterialIcons name="edit" size={24} color="black" />
//         <Text>Edit Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   skill: {
//     backgroundColor: '#e0e0e0',
//     padding: 8,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
    
//   },
//   job: {
//     marginBottom: 8,
//   },
//   jobTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     padding: 8,
//     borderRadius: 8,
//     justifyContent: 'center',
//   },
// });

// export default ProfileScreen;
