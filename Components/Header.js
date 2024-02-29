import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cart from './cart';
import LeftDrawer from './DrawerTab'; // Import the LeftDrawer component

const Header = ({ cartItems, addToCart, searchQuery, setSearchQuery }) => {
  const [showCart, setShowCart] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.bars}>
        <Icon name="bars" size={30} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search restaurants..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <TouchableOpacity>
        <FontAwesome name="microphone" size={24} color="black" style={styles.bars} />
      </TouchableOpacity>

      <TouchableOpacity onPress={openCart}>
        <FontAwesome name="shopping-cart" size={24} color="black" style={styles.shoppingcart} />
      </TouchableOpacity>

      {showCart && (
        <Cart onClose={closeCart} cartItems={cartItems} addToCart={addToCart} />
      )}

     <LeftDrawer isVisible={showDrawer} closeDrawer={toggleDrawer} />  
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 1,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  bars: {
    marginRight: 15,
  },
  shoppingcart: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default Header;
