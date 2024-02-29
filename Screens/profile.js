import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const profile = () => {
  const handleButtonPress = () => {
    alert('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Simple Component with a Button</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default profile;
