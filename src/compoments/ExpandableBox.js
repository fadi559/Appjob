import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpandableBox = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit for text to be shown in collapsed mode
  const previewLimit =40;
  return (
    <View>
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
  showMore: {
    top:17,
    color: '#0066cc',    
  },
  text:{
    color: '#E9ECEF', 
    top:12,
    left:1,
    
    maxWidth:320,
  //
  },
  button: {
 
      
    // padding: 5,
},
});

export default ExpandableBox;
