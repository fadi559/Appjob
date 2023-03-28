import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { AirbnbRating } from '@rneui/themed';

const  RatingsComponentProps = {};

const Ratings = () => {
const ratingCompleted = (rating) => {
  console.log('Rating is: ' + rating);
};

const ratingProps = {};
return (
  <View >
    
      <View
        style={{
          justifyContent:'center',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <AirbnbRating  />
        <AirbnbRating isDisabled={true}/>
        <AirbnbRating
          count={11}
          reviews={[
            'Terrible',
            'Bad',
            'Meh',
            'OK',
            'Good',
            'Hmm...',
            'Very Good',
            'Wow',
            'Amazing',
            'Unbelievable',
            'Jesus',
          ]}
          defaultRating={11}
          size={20}
        />
      </View>
    
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
headingContainer: {
  paddingTop: 50,
},
titleText: {
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 5,
  fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : '',
  color: '#27ae60',
},
subtitleText: {
  fontSize: 19,
  fontWeight: '400',
  textAlign: 'center',
  fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : '',
  color: '#34495e',
},
viewContainer: {
  flex: 1,
},
rating: {
  paddingVertical: 10,
},
});

export default Ratings;