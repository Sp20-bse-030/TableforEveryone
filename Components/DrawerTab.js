import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import ip from '../Ip';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const LeftDrawer = ({ closeDrawer, isVisible }) => {
    const [userid, setuserid] = useState('');
  const [user, setUser] = useState();
  const handleLogout = () => {
    // Implement your logout logic here
    // For example: navigation.navigate('Login')
    closeDrawer(); // Close the drawer after handling logout
  };
  const handleImageUpload = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Handle the image upload logic here
        // For example: Send the image to your server, update the user's profile image field
        // For now, let's just set the image locally in the component
        setUser({ ...user, profileImage: response.uri });
      }
    });
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodedToken = jwt_decode(token);
        const loggedUserId = decodedToken.customerId;
        setuserid(loggedUserId);
        // console.log(loggedUserId);
  
        // Make a GET request to fetch orders for the logged user
        const response = await axios.get(`http://${ip}:8000/getuserdetails/${loggedUserId}`);
        setUser(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
  
    fetchUser();
  }, []);

  // Destructure user profile information
 

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeDrawer}
    >
      <TouchableOpacity
        style={styles.drawerContainer}
        activeOpacity={1}
        onPressOut={closeDrawer}
      >
        <View style={styles.drawerContent}>
          <View style={styles.profileContainer}>
          {user && (
              <>
              <TouchableOpacity onPress={handleImageUpload}>
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
              <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.username}>Name: {user.customername}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.username}>Email: {user.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.username}>Password: {user.password}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.username}>Ph Number: {user.phnumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.username}>History: {user.phnumber}</Text>
                </TouchableOpacity>
              </>
            )}
           
           
          </View>
          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <Text>Close</Text>
          </TouchableOpacity>
          {/* Add more drawer items as needed */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  drawerContent: {
    width: '75%', // Width of the drawer content
    height: '90%',
    marginTop:70, // Height of the drawer content
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 20,
  },
  profileContainer: {
    marginBottom: 20,
    width:'100%',
    height:'70%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor:'white',
    marginBottom:25
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
    marginBottom: 25,
    
  },
  drawerItem: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    backgroundColor:'white',
    width:80,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15

  },
  drawerfeilds:{
    height:50
  },
  plusIcon: {
    position: 'absolute',
     bottom: 20,
     left: 70,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 24,
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default LeftDrawer;
