import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import ip from '../Ip';

const Cart = ({ cartItems, onClose, removeFromCart, isVisible }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(false);
  const [mid, setmid] = useState('');

  const navigation = useNavigation();
  
 
  const handleAddToCart = (item) => {
    // Implement your logic to add an item to the cart here
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
    setIsCheckoutEnabled(true);
  };

  //  const token =  AsyncStorage.getItem("authToken");
  //          const decodedToken = jwt_decode(token);
  //          const userId = decodedToken.userId;
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
  const handleCheckout = async () => {
   
   const loggedUserId = await getTokenAndDecode();
   const mID = cartItems[0].mID;
   //console.log(mID);
    //console.log(loggedUserId);
    const itemsToCheckout = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })
    );
    //console.log(mID);
    axios.post(`http://${ip}:8000/addtocart`, {
      items: itemsToCheckout,
      userId:loggedUserId,
      managerId: mID,
      // You can include any additional data you need in the request body
    })
      .then((response) => {
        // Handle the response if needed
        navigation.navigate('Payment', {  });
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if the request fails
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Cart Items</Text>
        
          {cartItems && cartItems.length > 0 ? (
            <ScrollView style={styles.scrollView}>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image source={item.image} style={styles.alertImage} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.quantity}</Text>
                 
                  
                  <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyCartText}>Currently, your cart is empty</Text>
          )}

          <View style={styles.totalContainer}>
            <TouchableOpacity
              onPress={calculateTotalPrice}
              style={styles.totalButton}
              disabled={!cartItems || cartItems.length === 0}
            >
              <Text style={styles.totalButtonText}>Total</Text>
            </TouchableOpacity>
            <Text style={styles.totalText}>Total: ${totalPrice}</Text>
          </View>

          <TouchableOpacity
            onPress={handleCheckout}
            style={[
              styles.checkoutButton,
              { backgroundColor: isCheckoutEnabled ? 'orange' : 'gray' },
            ]}
            disabled={!isCheckoutEnabled}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    
  },
  container: {
    backgroundColor: 'white',
    width: '80%',
    padding: 16,
    borderRadius: 10,
    maxHeight:700
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    //marginTop:200
  },
  scrollView: {
    maxHeight: 700,
    //marginTop:100
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  alertImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 50,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 8,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
    marginTop: 50,
  },
  totalButtonText: {
    color: 'white',
  },
  totalText:{
    fontWeight:'bold', 
    fontSize:20

  },
  checkoutButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 8,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: 'white',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default Cart;
