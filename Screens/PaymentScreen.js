import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useNavigation } from '@react-navigation/native';
import ip from '../Ip';
import { StripeProvider,useStripe } from '@stripe/stripe-react-native';

const CheckoutComponent = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [orderstatus, setorderstatus] = useState('pending')
  const [userId, setUserId] = useState(null); // To store the logged-in user ID
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const stripe = useStripe();

  useEffect(() => {
    // Fetch the logged-in user ID using AsyncStorage and jwt_decode
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const loggedUserId = decodedToken.customerId;
        setUserId(loggedUserId);
      } catch (error) {
        console.error("Error while getting or decoding the token:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Fetch user's cart items using the userId
    const fetchUserCartItems = async () => {
      try {
        if (userId) {
          // Send a GET request to your backend API to retrieve the user's cart items
          const response = await axios.get(`http://${ip}:8000/getitemsuser/${userId}`);

          // Set the retrieved cart items in the state
          setCartItems(response.data);
           console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchUserCartItems();
  }, [userId]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOnlineCheckout = async() => {
    if (
      !username||
      !phoneNumber||
      !orderstatus||
      !address // Assuming tableId is available
    ) {
      Alert.alert('All fields must be filled');
      return;
    }


    try {
      // sending request
      const response = await fetch(`http://${ip}:8000/stripe/pay`, {
        method: 'POST',
        body: JSON.stringify({
          customerName: 'Haider',
          username,
          cartItems: cartItems.map((item) => ({
            mId: item.mId, // Include the mId from each cart item
            name: item.items[0].name, // Assuming you want the name from the first item
            price: item.items[0].price, // Assuming you want the price from the first item
            quantity: item.items[0].quantity, // Assuming you want the quantity from the first item
            totalprice: item.items[0].price*item.items[0].quantity,
          })),

          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
    } catch (err) {
      console.error(err);
    }
    const order = {
      userId,
      username,
      phoneNumber,
      orderstatus,
      address,
      location,
      paymentMethod: 'online payment',
      cartItems: cartItems.map((item) => ({
        mId: item.mId, // Include the mId from each cart item
        name: item.items[0].name, // Assuming you want the name from the first item
        price: item.items[0].price, // Assuming you want the price from the first item
        quantity: item.items[0].quantity, // Assuming you want the quantity from the first item
        totalprice: item.items[0].price*item.items[0].quantity,
      })),
      
    };
    axios
      .post(`http:/${ip}:8000/createorder`, order)
      .then((response) => {
        // Handle the response if needed
        Alert.alert("Order Placed", "Your order has been placed successfully.");
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Handle the error if the request fails
        console.error("Error placing the order:", error);
      });
  };
  

  const handleCashOnDelivery = () => {
    if (
      !username||
      !phoneNumber||
      !orderstatus||
      !address // Assuming tableId is available
    ) {
      Alert.alert('All fields must be filled');
      return;
    }

    const order = {
      userId,
      username,
      phoneNumber,
      orderstatus,
      address,
      location,
      paymentMethod: 'Cash on delivery',
      cartItems: cartItems.map((item) => ({
        mId: item.mId, // Include the mId from each cart item
        name: item.items[0].name, // Assuming you want the name from the first item
        price: item.items[0].price, // Assuming you want the price from the first item
        quantity: item.items[0].quantity, // Assuming you want the quantity from the first item
        totalprice: item.items[0].price*item.items[0].quantity,
      })),
    };
  
    // Send a POST request to create the order
    axios
      .post(`http:/${ip}:8000/createorder`, order)
      .then((response) => {
        // Handle the response if needed
        Alert.alert("Order Placed", "Your order has been placed successfully.");
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Handle the error if the request fails
        console.error("Error placing the order:", error);
      });
  };

  // Render the rest of your component

  return (
    <Fragment>
    <StripeProvider publishableKey="pk_test_51OHJcEAdQ3Xt2cB7cZf5yjZRrHNcb5G0MzAlUHjVsEBUOGB4Jgs4esmd7aCIBbB71VVz4nasqiPb8nqqyvfLoydK00ZdGwIaKx"/>
    <View style={styles.container}>
      <Text style={styles.confirmText}>Confirm Your Payment</Text>
      
      <Text>Name:</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />

      <Text>Phone Number:</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <Text>Address Or Location:</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* <Text>Location:</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      /> */}

      <Text>Payment Method:</Text>
      <Picker
      style={styles.input}
        selectedValue={paymentMethod}
        onValueChange={handlePaymentMethodChange}
      >
        <Picker.Item label="Stripe" value="Stripe" />
        
      </Picker>

      <TouchableOpacity style={styles.cashondeliveryButton} onPress={handleOnlineCheckout}>
        <Text style={styles.cashondeliveryButtonText}>Online Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cashondeliveryButton} onPress={handleCashOnDelivery}>
        <Text style={styles.cashondeliveryButtonText}>Cash on Delivery</Text>
      </TouchableOpacity>
    </View>
    </Fragment>
  );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor:'orange',
    flex: 1,
    padding: 16,
    justifyContent:'center'
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cashondeliveryButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    marginTop:10
  },
  cashondeliveryButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor:'white',
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10,
    padding: 10,
    marginBottom: 10,
    marginLeft:25
  },
});

export default CheckoutComponent;
