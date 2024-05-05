// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const RatingComponent = () => {
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     // Simulate submitting the rating to a server when the rating changes
//     if (rating > 0) {
//       submitRatingToServer();
//     }
//   }, [rating]);

//   const handleRating = (selectedRating) => {
//     setRating(selectedRating);
//   };

//   const submitRatingToServer = () => {
//     // Simulate submitting the rating to a server
//     // You can replace this with your actual submission logic
//     Alert.alert('Rating Submitted', `You have submitted a rating of ${rating} stars`);
//     // In a real scenario, you would send a network request to your backend API here
//     // Example: fetch('your_backend_api_url', { method: 'POST', body: JSON.stringify({ rating }) })
//   };

//   const renderStar = (position) => {
//     const filled = position <= rating;

//     return (
//       <TouchableOpacity key={position} onPress={() => handleRating(position)}>
//         <Icon
//           name={filled ? 'star' : 'star-border'}
//           size={20}
//           color={filled ? 'orange' : 'gray'}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
      
//       <View style={styles.starsContainer}>
//         {[1, 2, 3, 4, 5].map((position) => renderStar(position))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginTop:-20,
//     left:130,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginBottom:35,
    
    
//   },
// });

// export default RatingComponent;
