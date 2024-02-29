import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'; // Import from 'react-navigation' instead of '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons, FontAwesome, Ionicons, Feather } from 'react-native-vector-icons'; // Import from 'react-native-vector-icons' instead of '@expo/vector-icons'
import NotificationScreen from './NotificationScreen';

const FoodpandaScreen = () => {
    const foodCategories = [
        {
            id: 1,
            title: 'Pizza',
            image: require('../assets/pizza.webp'),
        },
        {
            id: 2,
            title: 'Burger',
            image: require('../assets/burger.jpg'),
        },
        {
            id: 3,
            title: 'Shwarma',
            image: require('../assets/shwarma.png'),
        },
        {
            id: 4,
            title: 'Fries',
            image: require('../assets/fries.jpg'),
        },
        {
            id: 5,
            title: 'Biryani',
            image: require('../assets/biryani.jpg'),
        },
        {
            id: 6,
            title: 'Donuts',
            image: require('../assets/donuts.jpg'),
        },
        {
            id: 7,
            title: 'Soft Drink',
            image: require('../assets/drink.jpg'),
        },
        {
            id: 8,
            title: 'Noodles',
            image: require('../assets/noodle.jpg'),
        },
        {
            id: 9,
            title: 'Fried Chicken',
            image: require('../assets/fried.jpg'),
        },
        {
            id: 10,
            title: 'Sandwich',
            image: require('../assets/sandwich.jpg'),
        },
       


        // Add more categories as needed
    ];
    const foodslider = [
        {
            id: 1,
            title: 'Deal 1',
            price: 450,
            image: require('../assets/deal1.jpg'),
        },
        {
            id: 2,
            title: 'Deal 2',
            price: 450,
            image: require('../assets/deal2.jpg'),
        },
        {
            id: 3,
            title: 'Deal 3',
            price: 450,
            image: require('../assets/deal3.jpg')
        }
    ]
    const categoriesPerRow = 2;
    const rows = Math.ceil(foodCategories.length / categoriesPerRow);
    const press = (title)=>{
        Alert.alert(t)
    }
    const handlepress = (title)=>{
        Alert.alert(title)

    }

    return (
        <ScrollView style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
            </View>

            {/* Slider Container */}
            <ScrollView horizontal style={styles.sliderContainer}>
                {foodslider.map((image, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handlepress(image.title)}
                    >
                        <Image
                            source={image.image}
                           
                        />
                    </Pressable>
                ))}
            </ScrollView>


            {/* Food Categories */}
            <View style={styles.categoriesContainer}>
                {[...Array(rows)].map((_, rowIndex) => (
                    <View style={styles.categoryRow} key={rowIndex}>
                        {foodCategories
                            .slice(rowIndex * categoriesPerRow, (rowIndex + 1) * categoriesPerRow)
                            .map((category) => (
                                <View style={styles.categoryItem} key={category.id}>
                                    <Image style={styles.categoryImage} source={category.image} />
                                    <Text style={styles.categoryText}>{category.title}</Text>
                                </View>
                            ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Help Screen</Text>
    </View>
  );
};

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Orders Screen</Text>
    </View>
  );
};

const DealsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Deals Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Homepage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === 'Home') {
            icon = <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === 'Help') {
            icon = <MaterialIcons name="help" size={size} color={color} />;
          } else if (route.name === 'Orders') {
            icon = <FontAwesome name="shopping-basket" size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            icon = <Feather name="bell" size={size} color={color} />;
          } else if (route.name === 'Restaurant') {
            icon = <Ionicons name="restaurant" size={size} color={color} />;
          }

          return icon;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Foodpanda" component={FoodpandaScreen} options={{
        headershown: false
      }} />
      {/* Include the other tab screens here */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    searchInput: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    sliderContainer: {
        height: 200,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    sliderImage: {
        width: 200,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    sliderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    sliderDescription: {
        marginTop: 5,
        color: 'gray',
    },
    categoriesContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    categoryItem: {
        flex: 1,
        marginRight: 5,
    },
    categoryImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    categoryText: {
        marginTop: 5,
        textAlign: 'center',
    },
});

export default Homepage;
