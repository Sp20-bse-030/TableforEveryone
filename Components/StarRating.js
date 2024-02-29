import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Number of filled stars
  const remainingStars = 5 - filledStars; // Number of empty stars

  const filledArray = Array.from({ length: filledStars }, (_, index) => (
    <Text key={`filled-${index}`} style={styles.filledStar}>&#9733;</Text> // Filled star with custom style
  ));

  const emptyArray = Array.from({ length: remainingStars }, (_, index) => (
    <Text key={`empty-${index}`}  style={styles.emptyStar}>&#9734;</Text> // Empty star
  ));

  return (
    <View style={{ flexDirection: 'row' }}>
      {filledArray}
      {emptyArray}
    </View>
  );
};

const styles = StyleSheet.create({
  filledStar: {
    color: 'orange',
    fontSize:20
     // Set the color of filled stars to orange
  },
  emptyStar:{
    fontSize:20
  }
});

export default StarRating;
