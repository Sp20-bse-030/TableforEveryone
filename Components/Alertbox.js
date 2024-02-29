import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ip from '../Ip';
import CartScreen from './cart';

const CustomAlertBox = ({
  isVisible,
  itemDetails,
  onClose,
  onQuantityChange,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
console.log(itemDetails);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1);
  };

  const updateQuantity = (text) => {
    const newQuantity = parseInt(text) || 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  const openCart = () => {
    navigation.navigate('Cart', { cartItems }); // Assuming you have set up a 'Cart' screen in your navigator.
  };
  const handleAddToCart = () => {
    // Create an item object with all the details
    const newItem = {
      name: itemDetails.name,
      price: itemDetails.price,
      quantity: quantity,
      image: itemDetails.image,
      mID : itemDetails.mID,
      // You can add more properties like image here if needed
    };
    // Call the parent component's onAddToCart function with the item details
    onAddToCart(newItem);
    // Close the alert
    onClose();
  };

  

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* Display Item Image */}
          <Image source={itemDetails.image} style={styles.alertImage} />

          {/* Display Item Name */}
          <Text style={styles.alertItemName}>{itemDetails.name}</Text>

          {/* Display Item Price */}
          <Text style={styles.alertItemPrice}>Price: ${itemDetails.price}</Text>
          


          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={(text) => updateQuantity(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.alertTotalAmount}>
            Total: ${(itemDetails.price * quantity)}
          </Text>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
  },
  alertContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  alertImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  alertItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  alertItemPrice: {
    fontSize: 16,
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityInput: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    width: 50,
    textAlign: 'center',
  },
  alertTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomAlertBox;
