import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
//import BottomTabBar from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import Header from '../Components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Draggable from 'react-native-draggable';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ip from '../Ip';
import StarRating from '../Components/StarRating'

const Page = ({ route }) => {
  const [chatbotPosition, setChatbotPosition] = useState({ x: 30, y: 650 });
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [userid, setuserid] = useState('');
  const navigation = useNavigation();
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [recommendRest, setrecommendRest] = useState([]);
  const [isRecommendedView, setIsRecommendedView] = useState(false);

  useEffect(() => {
    if (route.params && route.params.nearbyRestaurants) {
      setNearbyRestaurants(route.params.nearbyRestaurants);
    }
  }, [route.params]);
  

  // const fetchRecommendations = () => {
  //   axios.post(`http://192.168.0.112:5000/recommend`,{ userId: 'user2' })
  //     .then((response) => {
  //       const recommendedRestaurants = response.data.recommended_restaurants;
  //       // Handle the recommended restaurants data in your app
  //       console.log(recommendedRestaurants);
  //       setrecommendRest(recommendedRestaurants)
  //       setIsRecommendedView(true)

  //       // Update state or perform any necessary actions to display recommendations
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching recommendations', error);
  //       // Handle errors or show an error message in your app
  //     });
  // };
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const decodedToken = jwt_decode(token);
        const loggedUserId = decodedToken.customerId;
        setuserid(loggedUserId);
        console.log(loggedUserId);
        const response = await axios.post(`http://10.113.65.81:5000/recommend`, { userId: loggedUserId });
        const recommendedRestaurants = response.data.recommended_restaurants;
        setrecommendRest(recommendedRestaurants);
        setIsRecommendedView(true);
      } catch (error) {
        console.error('Error fetching recommendations', error);
        // Handle errors or show an error message in your app
      }
    };

    fetchRecommendations();
    
    // Fetch other initial data here if needed

  }, []);
  useEffect(() => {
    // Make a GET request to fetch all products from your server

    axios.get(`http://${ip}:8000/allRestaurants`)
      .then((response) => {
        setAllRestaurants(response.data);
        // Set the fetched products in state
        //console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Restaurants', error);
      });
  }, []);

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  // const restaurants = [
  //   { name: 'KFC', logo: require('../assets/KFC_logo.svg.png') },
  //   { name: 'Macdonalds', logo: require('../assets/Macdonalds.jpg') },
  //   { name: 'Cheezious', logo: require('../assets/Cheezious.png') },
  //   { name: 'Dawat', logo: require('../assets/Dawat.png') },
  //   { name: 'TKR', logo: require('../assets/noodle.jpg') },
  //   { name: 'Monal', logo: require('../assets/pizza.webp') },
  //   { name: 'Restaurant 1', logo: require('../assets/shwarma.png') },
  //   { name: 'Restaurant 2', logo: require('../assets/sandwich.jpg') },
  //   { name: 'Restaurant 3', logo: require('../assets/fried.jpg') },
  //   { name: 'Restaurant 1', logo: require('../assets/fried.jpg') },
  //   { name: 'Restaurant 2', logo: require('../assets/fried.jpg') },
  //   { name: 'Restaurant 3', logo: require('../assets/fried.jpg') },
  //   // Add more restaurants as needed
  // ];

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const getTokenAndDecode = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const loggedUserId = decodedToken.customerId;
      setuserid(loggedUserId);
      console.log(loggedUserId);
    } catch (error) {
      console.error("Error while getting or decoding the token:", error);
    }
  };



  //getTokenAndDecode();

  const handleRestaurantPress = (restaurant) => {
    // Navigate to the RestaurantDetail screen when the restaurant logo is pressed
    //console.log({restaurant});
    navigation.navigate('RestaurantDetails', { restaurant });
  };

  const filteredRestaurants = allRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View style={styles.upperContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.image} />
        <Text>TABLE FOR EVERYONE</Text>
      </View>
      <View>
        <Text style={styles.selectRestaurant}>Recommended Restaurants</Text>
        {/* <TouchableOpacity style={styles.recommendbutton} onPress={fetchRecommendations}>
          <Text style={styles.recommendbuttontext}>Recommend</Text> */}
          
        {isRecommendedView && recommendRest.length > 0 ? (
      <FlatList
        data={recommendRest}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Displaying three items in a row for recommendations
        contentContainerStyle={styles.restaurantList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.restaurantItem}>
            <Text style={styles.restaurantText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    ) : (
      <View style = {styles.recommend}>
        <Text>Not Found</Text>

      </View>
    )}
          
        {/* </TouchableOpacity> */}
        <FlatList
          data={nearbyRestaurants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.restaurantItem}>
              <Text style={styles.restaurantText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

      </View>

      <View>
        <Text style={styles.selectRestaurant}>Select Your Desired Restaurant</Text>
      </View>

      <FlatList
        data={searchQuery ? filteredRestaurants : allRestaurants}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.restaurantList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.restaurantItem} onPress={() => handleRestaurantPress(item)}>
            <Image source={{ uri: item?.photo[0] }} style={styles.restaurantLogo} />
            <Text style={styles.restaurantText}>{item.name}</Text>
            <StarRating rating={item.rating} />
          </TouchableOpacity>
        )}
      />
      <Draggable
        x={chatbotPosition.x}
        y={chatbotPosition.y}
        renderSize={60}
        isCircle
        renderText="Chat"
        pressDrag={() => { }}
        longPress={() => { }}
        onShortPressRelease={() => navigation.navigate('chatbot')}
      >
        <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate('chatbot')}>
          <Image source={require('../assets/Chatbot.webp')} style={styles.chatbotIcon} />
        </TouchableOpacity>
      </Draggable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'orange',
    height: 150,
    borderRadius: 20,
    //marginLeft: 10,
    //marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 80,
  },
  selectRestaurant: {
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize:15
  },
  restaurantList: {
    padding: 10,
  },
  restaurantText: {
    fontWeight: 'bold',
    fontSize: 20

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
  chatbotButton: {
    padding: 10,
  },
  chatbotIcon: {
    width: 60,
    height: 60,

    // Add any styling for the chatbot icon
  },
   recommend:{
    flexDirection:'row',
  },
  // recommendbutton:{
  //   backgroundColor:'orange',
  //   width:100,
  //   height:40,
  //   alignItems:'center',
  //   justifyContent:'center',
  //   borderRadius:15,
    
    
    

  // },
  recommendbuttontext:{
    fontWeight:'bold',
    fontSize:15
  },
  recommend:{
    alignItems:'center',
    justifyContent:'center'

  }
});

export default Page;
