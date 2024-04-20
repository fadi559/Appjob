import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpandableBox = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit for text to be shown in collapsed mode
  const previewLimit =55;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isExpanded ? content : `${content.substring(0, previewLimit)}`}
      </Text>
      {content.length > previewLimit && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.button}>
          <Text style={styles.showMore}>{isExpanded ? 'Show Less' : 'Show More...'}</Text>
        </TouchableOpacity>
      )}
      
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    
        // borderBottomWidth: 1,
        // borderColor: '#ddd',
        // marginBottom: 10,
   
  },
  showMore: {
    color: '#0066cc',
    // fontSize: 16,
  //  marginBottom:-60,
  //  top:20,
  
    
  },
  text:{
    color: '#E9ECEF', 
    top:4,
    left:4,
  //  marginTop:0,
  //   color: '#E9ECEF',
  //   left:3,
  //   marginVertical:100,
    
  },
  button: {
 
      
    // padding: 5,
},
});

export default ExpandableBox;
