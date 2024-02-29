import React, { useState , useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput,FlatList, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CustomAlertBox from '../Components/Alertbox';
import Cart from '../Components/cart';
import Header from '../Components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ip from '../Ip';

const RestaurantDetails = ({ route }) => {
  const { restaurant } = route.params;
  const [selectedTab, setSelectedTab] = useState('Food Order');
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [allFood, setAllFood] = useState([]);
  const [allTable, setAllTable] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  //const RestFood = restaurant._id;


  
  // useEffect(() => {
  //   // Make a GET request to fetch all products from your server
  //   // const Matchedproduct = {
  //   //   RestFood
  //   // 
  //   axios.get(`http://${ip}:8000/allFood`)
  //     .then((response) => {
  //       setAllFood(response.data);
  //        // Set the fetched products in state
         
  //       console.log(restaurant._id);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products', error);
  //     });
  // }, []); 
  useEffect(() => {
    axios.get(`http://${ip}:8000/allFood?restaurant_id=${restaurant._id}`)
      .then((response) => {
        setAllFood(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, [restaurant._id]); 
  useEffect(() => {
    // Make a GET request to fetch all products from your server
    axios.get(`http://${ip}:8000/allTable?restaurant_id=${restaurant._id}`)
      .then((response) => {
        setAllTable(response.data);
         // Set the fetched products in state
         //console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, [restaurant._id]); 

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };
  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCartItems);
  };
  const handleautomatedbooking = ()=>{
    navigation.navigate("Automated")


  }
  const renderFoodCategories = () => {
    const itemsPerRow = 3; // Number of items per row
    const categories = [];
  
    for (let i = 0; i < filteredFood.length; i += itemsPerRow) {
      const rowProducts = filteredFood.slice(i, i + itemsPerRow);
  
      const row = (
        <View key={i} style={styles.foodCategoryItemsContainer}>
          {rowProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantItem}
              onPress={() => sshowAlert(product)}
            >
             
  <Image
    key={index}
    source={{ uri: product.image[0] }}
    style={styles.productImage}
    
  />

              <Text style={styles.foodCategoryText}>{product.name}</Text>
             
             
            </TouchableOpacity>
          ))}
        </View>
      );
  
      categories.push(row);
    }
  
    return categories;
  
  };
  const renderTableCategories = () => {
    const itemsPerRow = 3; // Number of items per row
    const categories = [];
  
    for (let i = 0; i < filteredTable.length; i += itemsPerRow) {
      const rowProducts = filteredTable.slice(i, i + itemsPerRow);
  
      const row = (
        <View key={i} style={styles.foodCategoryItemsContainer}>
          {rowProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantItem}
              onPress={() => opentableDetails(product)}
            >
             
  <Image
    key={index}
    source={{ uri: product.image[0] }}
    style={styles.productImage}
    
  />

              <Text style={styles.foodCategoryText}>{product.name}</Text>
             
             
            </TouchableOpacity>
          ))}
        </View>
      );
  
      categories.push(row);
    }
  
    return categories;
  
  };
  const opentableDetails = (table) => {
    setSelectedTable(table);
    setModalVisible(true);
  };
  const handletablebooking = ()=>{
    navigation.navigate('Table', { tableId: selectedTable._id, mId: restaurant._id });

  }
  
  
  const addToCart = (item) => {
    // Add the selected item to the cart
    setCartItems([...cartItems, item]);
  };

  const sshowAlert = (item) => {
    console.log(item);
    setSelectedItem(item); // Set the selected food item details
    setShowAlert(true); // Show the aler
  };
  const filteredFood = allFood.filter((allFood) =>
  allFood.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTable = allTable.filter((allTable) =>
  allTable.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <View style={styles.container}>
      <Header cartItems={cartItems} addToCart={addToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  /> 
      <Cart
        cartItems={cartItems}
        isVisible={showCart}
        onClose={closeCart}
        removeFromCart={removeFromCart} // Pass the removeFromCart function as a prop
      />
      <View style={styles.upperContainer}>
        <Image source={restaurant.image} style={styles.restaurantLogoo} />
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
      </View>
      <View style={styles.topTabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Food Order' && { borderBottomColor: 'blue' },
          ]}
          onPress={() => setSelectedTab('Food Order')}
        >
          <Text style={styles.tabText}>Order Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Table Reserve' && { borderBottomColor: 'blue' },
          ]}
          onPress={() => setSelectedTab('Table Reserve')}
        >
          <Text style={styles.tabText}>Reserve Table</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'Food Order' ? (
        <ScrollView>
           {/* <Text style={styles.reserveText}>food your table</Text> */}
           <View style={styles.foodCategoriesContainer}>{renderFoodCategories()}</View> 
        </ScrollView>
      ) : (
        <View style={styles.reserveContainer}>
          <View>
          <Text style={styles.BookingText}>Automated Booking</Text>
          <TouchableOpacity style={styles.Automated}
           onPress = {handleautomatedbooking}
          >
            <Text style={styles.Automatedtext}>Automated Booking</Text>
           
          </TouchableOpacity>
          </View>
          <Text style={styles.BookingText}>Manual Booking</Text>
          <ScrollView>
           {/* <Text style={styles.reserveText}>food your table</Text> */}
           <View style={styles.foodCategoriesContainer}>{renderTableCategories()}</View> 
        </ScrollView>
        </View>
      )}
     
      <CustomAlertBox
      isVisible={showAlert}
      itemDetails={{ price:selectedItem?.price , name: selectedItem?.name, _id: selectedItem?._id, mID: selectedItem?.mID }}
      //itemDetails={selectedItem}
      onClose={() => setShowAlert(false)} // Close the alert when onClose is called
      onQuantityChange={(quantity) => {
        // Handle quantity change if needed
        console.log('Quantity changed:', quantity);
      }}
      onAddToCart={(item) => {
        addToCart(item); // Call the addToCart function when Add to Cart is pressed
      }}
      
    />
    <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedTable && (
            <View>
              <Image source={require('../assets/Logo.png')} style={styles.image} />
              <Text style={styles.DetailsText}>Table Details :</Text>
             
              <Text style={styles.DetailsText}>Name: {selectedTable.name}</Text>
              <Text style={styles.DetailsText}>Brand: {selectedTable.brand}</Text>
              <Text style={styles.DetailsText}>Price: {selectedTable.price}</Text>
              <Text style={styles.DetailsText}>Descrition: {selectedTable.description}</Text>
              <Text style={styles.DetailsText}>Capacity: {selectedTable.capacity}</Text>
              <Text style={styles.DetailsText}>Location: {selectedTable.location}</Text>
            </View>
          )}
          <View style={styles.Buttoncontainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handletablebooking}>
          <Text style={styles.closeButtonText}>Booking</Text>
          </TouchableOpacity>
         <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
         
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  voiceIcon: {
    marginLeft: 8,
  },
  upperContainer: {
    alignItems: 'center',
    padding: 20,
    height: 150,
    borderRadius: 20,
    //marginLeft: 10,
    //marginRight: 10,
    backgroundColor: 'orange',
  },
  restaurantLogo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  foodCategoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  foodCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodCategoryItems: {
    flexDirection: 'column',
  },
  image: {
    marginBottom:40,
    
    resizeMode: 'cover',
    borderRadius: 80,
  },
  foodCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodCategoryContent: {
    marginLeft: 10,
  },
  foodCategoryText: {
    fontSize: 16,
  },
  foodCategoryDescription: {
    fontSize: 12,
    color: 'gray',
  },

  foodCategoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  foodCategoryContainer: {
    marginBottom: 20,
  },
  foodCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodCategoryItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalContainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  foodCategoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    marginBottom: 10,
  },
  foodCategoryText: {
    fontSize: 16,
  },
  restaurantLogoo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  restaurantList: {
    padding: 10,
  },
  restaurantItem: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    maxWidth: '33.33%',
  },
  restaurantLogo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  closeButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginLeft:50,
    marginRight:50,
},
closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
},
Buttoncontainer:{
  flexDirection: 'row',
  marginTop:30

},
DetailsText:{
  fontWeight:'bold'

},
Automated:{
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'orange',
  marginRight: 100, 
  marginLeft: 100,
  marginTop:20,
  marginBottom:20,
  borderRadius:10,
  height:40,
  

},
Automatedtext:{
  fontWeight:'bold',
  fontSize: 15,

},
BookingText:{
  fontWeight:'bold',
  fontSize:20,
  marginTop:20,
  marginLeft:15
}
});

export default RestaurantDetails;
