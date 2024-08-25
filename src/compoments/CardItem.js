import { StyleSheet, Text, View } from 'react-native';
import React ,{useState}from 'react';
import { Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Phonebutton from './Phonebutton';
import Conbutton from './Conbutton';
import ExpandableBox from './ExpandableBox';
import CustomLoadingSpinner from './Loading';
import { useLoading } from './LoadingContext';




const CardItem = (props) => {
  const { User, location, jobType, notes, Phonenumber,image} = props.post;
    //  console.log("avtareee:",props.post)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 
  const { showLoader, hideLoader } = useLoading();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.userInfo}>
      
        <Avatar
          onPress={() => navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
          size={70}
          rounded
          source={User?.image ? { uri: User.image } : null}
          icon={User?.image ? null : { name: 'person', type: 'material', color: 'purple' }}
          iconStyle={{ color: 'purple' }}
          containerStyle={styles.avatar}
          onLoadStart={() => setLoading(true)} 
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}    
        />
       {loading && (
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <CustomLoadingSpinner style={styles.loader} />
            </View>
          )}
          
        

        <View style={styles.userDetails}>
          <Text style={styles.userName}>{User?.name}</Text>
          <Text style={styles.jobTypeLabel}>Job Type:</Text>
          <Text style={styles.jobType}>{jobType}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.notesTitle}>Notes:</Text>
        <ExpandableBox content={notes} />
      </View>
      <View style={styles.buttons}>
        <Conbutton Phonenumber={Phonenumber} />
        <Phonebutton Phonenumber={Phonenumber} />
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f4f8',  
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
    width: 70,  // Ensure this matches your Avatar size
    height: 70, // Ensure this matches your Avatar size
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the loader is above the Avatar image
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    marginBottom: 15,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a416f',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#3a416f',
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
  },
  jobTypeLabel: {
    fontSize: 16,
    color: '#3a416f',
    marginTop: 8,
  },
  jobType: {
    fontSize: 16,
    color: '#0984e3',
    fontWeight: '600',
  },
  details: {
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

 
 
 
 
 // import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { Avatar } from '@rneui/themed';
// import { useNavigation } from '@react-navigation/native';
// import Phonebutton from './Phonebutton';
// import Conbutton from './Conbutton';
// import ExpandableBox from './ExpandableBox';

// const CardItem = (props) => {
//   const { User, location, jobType, notes, Phonenumber } = props.post;
//   const navigation = useNavigation();

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.location}>{location}</Text>
//       </View>
//       <View style={styles.userInfo}>
//         <Avatar
//           onPress={() => navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
//           size={70}
//           rounded
//           source={{ uri: User?.avatarUrl }}
//           containerStyle={styles.avatar}
//         />
//         <Text style={styles.userName}>{User?.name}</Text>
//       </View>
//       <View style={styles.details}>
//         <Text style={styles.jobType}>
//           Job Type: <Text style={styles.jobTypeValue}>{jobType}</Text>
//         </Text>
//         <Text style={styles.notesTitle}>Notes:</Text>
//         <ExpandableBox content={notes} />
//       </View>
//       <View style={styles.buttons}>
//         <Conbutton Phonenumber={Phonenumber} />
//         <Phonebutton Phonenumber={Phonenumber} />
//       </View>
//     </View>
//   );
// };

// export default CardItem;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     marginVertical: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//     borderColor: '#e0e0e0',
//     borderWidth: 1,
//   },
//   header: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: 10,
//     marginBottom: 15,
//   },
//   location: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#3A416F',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     marginRight: 15,
//     borderWidth: 2,
//     borderColor: '#3A416F',
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   details: {
//     marginBottom: 20,
//   },
//   jobType: {
//     fontSize: 18,
//     color: '#555',
//     marginBottom: 10,
//   },
//   jobTypeValue: {
//     fontWeight: '600',
//     color: '#3A416F',
//   },
//   notesTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   text: {
//     color: '#E9ECEF',
//   },
// });

   
   
   // import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { Avatar } from '@rneui/themed';
// import { useNavigation } from '@react-navigation/native';
// import Phonebutton from './Phonebutton';
// import Conbutton from './Conbutton';
// import ExpandableBox from './ExpandableBox';

// const CardItem = (props) => {
//   const { User, location, jobType, notes, Phonenumber } = props.post;
//   const navigation = useNavigation();

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.location}>{location}</Text>
//       </View>
//       <View style={styles.userInfo}>
//         <Avatar
//           onPress={() => navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
//           size={60}
//           rounded
//           icon={{ name: 'rowing' }}
//           containerStyle={styles.avatar}
//         />
//         <Text style={styles.userName}>{User?.name}</Text>
//       </View>
//       <View style={styles.details}>
//         <Text style={styles.jobType}>Job Type: <Text style={styles.jobTypeValue}>{jobType}</Text></Text>
//         <Text style={styles.notesTitle}>Notes:</Text>
//         <ExpandableBox content={notes} />
//       </View>
//       <View style={styles.buttons}>
//         <Conbutton Phonenumber={Phonenumber} />
//         <Phonebutton Phonenumber={Phonenumber} />
//       </View>
//     </View>
//   );
// };

// export default CardItem;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     marginVertical: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   header: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: 10,
//     marginBottom: 15,
//   },
//   location: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#3A416F',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     marginRight: 15,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   details: {
//     marginBottom: 20,
//   },
//   jobType: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 10,
//   },
//   jobTypeValue: {
//     fontWeight: '600',
//     color: '#3A416F',
//   },
//   notesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   text: {
//     color: '#E9ECEF',
//   },
// });







  // import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { FlatList, ScrollView } from 'react-native'
// import { Avatar } from '@rneui/themed'
// import { useNavigation } from '@react-navigation/native';
// import Phonebutton from './Phonebutton';
// import Conbutton from './Conbutton';
// import RatingComponent from './RatingComponent';
// import { useContext, useState, useEffect } from 'react';
// import ExpandableBox from './ExpandableBox';
// import CustomLoadingSpinner from './Loading';
// import { useLoading } from './LoadingContext';


// const CardItem = (props,post) => {
//     const { User } = props.post
//     const { location } = props.post
//     const { jobType } = props.post
//     const { notes } = props.post
//     const { Phonenumber } = props.post
//     // const { skills } = props.post
//     // const { User, location, jobType, notes, Phonenumber } = job;
//     const navigation = useNavigation()
//     // const [posts, setPosts] = useState([]);
//     // const { showLoader, hideLoader } = useLoading();
//     // console.log("Usersss2",User)
//     //  console.log("CARDITEM",props.post);

//     return (

//         <View style={styles.box}>
//             <View style={styles.shadow}>
           

//             <Text style={styles.cityName}>{location}</Text>
//             {/* <RatingComponent style={styles.RatingComponent} /> */}

//             <View style={styles.Avatar}>
//                 <Avatar
//                     onPress={() =>
//                         navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
//                     size={45}
//                     rounded
//                     icon={{ name: 'rowing' }}
//                     containerStyle={{ backgroundColor: '#3d4db7' }} />
//                 <Text style={styles.text}>{User?.name}</Text>
//             </View>
//             <Text style={styles.text2} > <Text style={styles.BaseString}>jobtype:</Text> {jobType}</Text>
//             <View style={styles.text4}>
//                 <Text style={styles.text3} > Note: </Text>
//                 <ExpandableBox content={notes} />
//             </View>

//             <View style={styles.ViewRowButten}>
//                 <Conbutton Phonenumber={Phonenumber} />
//                 <Phonebutton Phonenumber={Phonenumber} />
//             </View>

//             </View>
//         </View>
//     )
// }

// export default CardItem;

// const styles = StyleSheet.create({

//     container: {
//         // flex: 1,
//     },
//     Avatar: {
//         marginTop: -10,
//         left: 9,
//     },
//     text4:{
//         flexDirection: 'row'
//     },
    
//     ViewRowButten: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 70,
//         top:-9,
//         marginLeft: 30,
//         shadowColor: 'black',

//         // shadowOffset: {
//         //     width: 0,
//         //     height: 3,
//         // },
//         // shadowOpacity: 0.4,
//         // shadowRadius: 3.84,
//         // elevation: 5,
//     },
//     box: {
//         left:17,
//         alignContent:"center",
//         width:"90%",
//         // minHeight:330,
//         padding: 5,
       
//         borderRadius: 60,
//         borderWidth: 0.3,
//         marginTop: 30,
//         backgroundColor: '#3A416F',
       
//     },
//     shadow:{
//         // shadowColor: 'black',
//         // shadowOffset: {
//         //     width: 0,
//         //     height: 3,
//         // },
//         // shadowOpacity: 0.7,
//         // shadowRadius: 3.84,
//         // elevation: 5,

//     },
//     text: {
//         left:13,
//         marginBottom: 40,
//         color: '#E9ECEF',
//         top:3,
//         fontSize:17,
//     },
//     text2: {
//         color: '#E9ECEF',
//     },
//     text3: {
//      top:10,
//         color: '#E9ECEF',
//         fontSize:17,
//     },
//     cityName: {
//         borderColor: "#141727",
//         borderRadius: 7,
//         alignSelf: 'center',
//         color: '#E9ECEF',
//     },
//     BaseString:{
//         fontSize:16,

//     },
// })


