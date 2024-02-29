import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import DealAlertBox from '../Components/DealAlert';
import Header from '../Components/Header';
import Cart from '../Components/cart';
import ip from '../Ip';
import axios from 'axios';
// Sample data for the slider and other deals
const sliderData = [
  {
    id: 1,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/deal1.jpg'),
  },
  {
    id: 2,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/deal2.jpg'),
  },
  {
    id: 3,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/deal3.jpg'),
  },
  {
    id: 4,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/fried.jpg'),
  },
  {
    id: 5,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/fries.jpg'),
  },
  
];

const otherDealsData = [
  {
    id: 1,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/noodle.jpg'),
  },
  {
    id: 2,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/sandwich.jpg'),
  },
  {
    id: 3,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1 nidjf idfhaf sidhasid dibasfiasoon fiafhas iasfoa osfnao sifasbfas ',
    remainingTime: '2h 30m',
    image: require('../assets/shwarma.png'),
  },
  {
    id: 4,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/pizza.webp'),
  },
  {
    id: 5,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/fried.jpg'),
  },
  {
    id: 6,
    name: 'Deal 1',
    restaurant:'TKR',
    items: 'Item 1, Item 2, Item 3',
    price: '$19.99',
    description: 'Description of Deal 1',
    remainingTime: '2h 30m',
    image: require('../assets/fried.jpg'),
  },
];




const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis for truncated text
  }
  return text;
};


const DealScreen = ( 
  isVisible,
  itemDetails,
  onClose,
  onAddToCart,
  ) => {
  const wordLimit = 6;
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [AllDeals, setAllDeals] = useState([]);
  const navigation = useNavigation();


  const sshowAlert = (item) => {
    setSelectedItem(item); // Set the selected food item details
    setShowAlert(true); // Show the alert
  };
  const addToCart = (item) => {
    // Add the selected item to the cart
    setCartItems([...cartItems, item]);
  };
  const openCart = () => {
    setShowCart(true);
  };
  const handleGetDeal = ()=>{
    Alert.alert("hello")
    
  }


  const closeCart = () => {
    setShowCart(false);
  };

  useEffect(() => {
    // Make a GET request to fetch all products from your server
    axios.get(`http://${ip}:8000/allDeals`)
      .then((response) => {
        setAllDeals(response.data);
        
         // Set the fetched products in state
         //console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Deals', error);
      });
  }, []); 
  return (
    
    <View style={styles.container}>
      <Header cartItems={cartItems} addToCart={addToCart} /> 
      <Cart
        cartItems={cartItems}
        isVisible={showCart}
        onClose={closeCart}
        //removeFromCart={removeFromCart} // Pass the removeFromCart function as a prop
      />
      <View style={styles.Topdeal}>
      <Text style={styles.Topdealtext}>Top Deals</Text>
      </View>
      <View style={styles.sliderContainer}>
        {/* Slider */}
        <Swiper showsPagination={false} loop={false}>
          {sliderData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.slide}  onPress={() => sshowAlert(item)}>
              <Image source={item.image} style={styles.slideImage} />
              <View style={styles.slideInfo}>
                <Text>{item.name}</Text>
                <Text>{item.restaurant}</Text>
                <Text>Items: {item.items}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Description: {truncateText(item.description, wordLimit)}</Text>
                <Text>Remaining Time: {item.remainingTime}</Text>
                <TouchableOpacity onPress={handleGetDeal}>
                <Text style={styles.getDealButton}>Get Deal</Text>
              </TouchableOpacity>
              </View>
              
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
      
      {/* Some other deals */}
      <Text style={styles.otherDealsTitle}>Some Other Deals</Text>
      <FlatList
        data={AllDeals}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.otherDealItem}  onPress={() => sshowAlert(item)}>
             <Image  source={ {uri:item?.image[0]} } style={styles.otherDealImage} /> 
            <View style={styles.otherDealInfo}>
           
              <Text>{item.name}</Text>
              
              <Text>Price: {item.price}</Text>
              <Text>Description: {truncateText(item.description, wordLimit)}</Text>
              <Text>End Time: {item.updatedAt}</Text>
              <TouchableOpacity onPress={handleGetDeal}>
              <Text style={styles.getDealButton}>Get Deal</Text>
            </TouchableOpacity>
            </View>
            
          </TouchableOpacity>
        )}
      />
      <DealAlertBox
      isVisible={showAlert}
      itemDetails={{ price:selectedItem?.price , name: selectedItem?.name, restaurant: selectedItem?.restaurant, description: selectedItem?.description, items: selectedItem?.items }}
      onClose={() => setShowAlert(false)} // Close the alert when onClose is called
      onAddToCart={(item) => {
        addToCart(item); // Call the addToCart function when Add to Cart is pressed
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Topdeal:{
    //marginTop:10,
    marginBottom:10,
    backgroundColor:'white',
    height:30,
    
    

  },
  Topdealtext:{
    margin:5,
    fontWeight:'bold',
    fontSize:15,
    
    

  },
  sliderContainer: {
    aspectRatio: 5.5/ 2, // Set the aspect ratio to control vertical size
    marginHorizontal: 10,
    marginBottom: 20,
  },
  restaurantLogo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  slideImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius:20,
  },
  slideInfo: {
    flex: 1,
  },
  getDealButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  otherDealsTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10, // Added margin for better separation
  },
  otherDealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10, // Added margin for better separation
  },
  otherDealImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius:20,
  },
  otherDealInfo: {
    flex: 1,
  
  },
});

export default DealScreen;
