// import {
//     StyleSheet,
//     Text,
//     View,
//     ScrollView,
//     TouchableOpacity,
//   } from "react-native";
//   import React, { useState, useEffect, useContext } from "react";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import jwt_decode from "jwt-decode";
//   import axios from "axios";
//   import { UserType } from "../UserContext";
// import { UserContext } from "./usercontext";
// import Card from "./RenderCardd";
// import { users } from "../res/data/data";


  
//   const user = () => {
//     const [selectedButton, setSelctedButton] = useState("people");
//     const [content, setContent] = useState("People Content");
//      const [users, setUsers] = useState([]);
//     const { user, setUser } = useContext(UserContext);
//     const handleButtonClick = (buttonName) => {
//       setSelctedButton(buttonName);
//     };
//     useEffect(() => {
//       const fetchUsers = async () => {
//         const token = await AsyncStorage.getItem("authToken");
//         // const decodedToken = jwt_decode(token);
//         const userId = decodedToken.userId;
//         setUserId(userId);
  
//         axios
//           .get(`http://localhost:8000/user/ueserId`)
//           .then((response) => {
//             setUsers(response.data);
//           })
//           .catch((error) => {
//             console.log("error", error);
//           });
//       };
  
//       fetchUsers();
//     }, []);
//     console.log("users", users);
// }

// //  return(
// // <View style={{marginTop:20}}>
// //               {users?.map((item, index) => (
// //                 <Card key={index} item={item} />
// //               ))}
// //             </View>
          
// // )


//     export default user;