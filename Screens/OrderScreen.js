import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import ip from '../Ip';
import Header from '../Components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";



const OrderScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userid, setuserid] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodedToken = jwt_decode(token);
        const loggedUserId = decodedToken.customerId;
        setuserid(loggedUserId);
        console.log(loggedUserId);
  
        // Make a GET request to fetch orders for the logged user
        const response = await axios.get(`http://${ip}:8000/getorders/${loggedUserId}`);
        setAllOrders(response.data);
        
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
  
    fetchOrders();
  }, []);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text style={styles.ordrtext}>Your All Orders</Text>
      </View>
      {allOrders.length>0?(
      <FlatList
        data={allOrders}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => openOrderDetails(item)}>
            <View style={styles.orderContainer}>
              <Text style={styles.ordreitemtext}>Order Details :</Text>
              <Text style={styles.ordreitemtext}>Name: {item.username}</Text>
              {item.cartItems.map((cartItem, index) => (
                <View key={index}>
                  <Text style={styles.ordreitemtext}>Name: {cartItem.name}</Text>
                  <Text style={styles.ordreitemtext}>Price: {cartItem.price}</Text>
                  <Text style={styles.ordreitemtext}>Quantity: {cartItem.quantity}</Text>
                </View>
              ))}
              <Text style={styles.ordreitemtext}>Total Price: {item.cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)}</Text>

              <Text style={styles.ordreitemtext}>Status: {item.orderStatus}</Text>
              <Text style={styles.ordreitemtext}>Ph Number: {item.phoneNumber}</Text>
              <Text style={styles.ordreitemtext}>Order Time : {item.timeOfOrder}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      ):(
        <View style = {styles.NoOrder}>
          <Text  style = {styles.NoOrdertext}>No Order Yet!</Text>
        </View>

      )}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedOrder && (
            <View>
              <Text style={styles.ordreitemtext}>Order Details :</Text>
              <Text style={styles.ordreitemtext}>Name: {selectedOrder.username}</Text>
              {selectedOrder.cartItems.map((cartItem, index) => (
                <View key={index}>
                  <Text style={styles.ordreitemtext} >Name: {cartItem.name}</Text>
                  <Text style={styles.ordreitemtext}>Price: {cartItem.price}</Text>
                  <Text style={styles.ordreitemtext}>Quantity: {cartItem.quantity}</Text>

                </View>
              ))}
              <Text style={styles.ordreitemtext}>Total Price: {selectedOrder.cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)}</Text>
              <Text style={styles.ordreitemtext}>Status: {selectedOrder.orderStatus}</Text>
              <Text style={styles.ordreitemtext}>Ph Number: {selectedOrder.phoneNumber}</Text>
              <Text style={styles.ordreitemtext}>Order Time : {selectedOrder.timeOfOrder}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,

  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalOrderNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 50,
    marginRight: 50,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  NoOrder:{
    marginTop:300,
    alignItems:'center',
    justifyContent:'center'
  },
  NoOrdertext:{
    fontSize:20,
    fontWeight:'bold',
    
  },
  ordreitemtext:{
    fontWeight:'bold',

},
ordrtext:{
  fontWeight:'bold',
  fontSize:20,
  marginTop:10,
  marginBottom:10

}
});

export default OrderScreen;
