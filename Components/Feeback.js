import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useNavigation, useRoute } from '@react-navigation/native';
import ip from '../Ip'

const FeedbackComponent = ({ isVisible, onClose }) => {
  const route = useRoute();
  const mID = route.params?.mId;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    console.log(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
        >
          <MaterialIcons
            name={i <= rating ? 'star' : 'star-border'}
            size={40}
            color={i <= rating ? 'orange' : 'black'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };
  const handleclose = ()=>{
    navigation.navigate('Home')
    
  }
  const getTokenAndDecode = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const loggedUserId = decodedToken.customerId;
      
      return loggedUserId;
    } catch (error) {
      console.error("Error while getting or decoding the token:", error);
      return null; // Handle the error gracefully if needed
    }
  };
  const handlepostfeedback = async ()=>{
    const loggedUserId = await getTokenAndDecode();
    const newFeedback = {
        
        userId:loggedUserId,
        mID:mID,
        rating:rating,
        feedback:feedback,
    }
    axios
    .post(`http:/${ip}:8000/postfeedback`,newFeedback)
    .then((response) =>{
        navigation.navigate('Home')
    })
    .catch((error) =>{
        conslo.error("error in posting feedback", error)
    })

  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
          
          <TextInput
            style={styles.textInput}
            placeholder="Write your feedback here..."
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            multiline
          />
          <View style={styles.Buttoncontainer}>
          <TouchableOpacity onPress={handlepostfeedback} style={styles.closeButton}>
            <Text style={styles.Buttontext}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleclose} style={styles.closeButton}>
            <Text style={styles.Buttontext}>Close</Text>
          </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    minHeight: 100,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor:"orange",
    height:40,
    width:70,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    
  },
  Buttoncontainer:{
    flexDirection: 'row',
    marginTop:30,
    justifyContent:'space-between',
  
  },
  Buttontext:{
    fontWeight:'bold',
    color:'white',
    fontSize:15
  }
});

export default FeedbackComponent;
