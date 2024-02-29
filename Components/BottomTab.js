import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

import OTPScreen from '../Screens/OTPScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import SignupScreen from '../Screens/SignUpScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import DealScreen from '../Screens/DealScreen';
import Page from '../Screens/Restaurant';
import ChatBot from '../Screens/ChatScreen';
import OrderScreen from '../Screens/OrderScreen';
//import RestaurantPage from '../Screens/Restaurant';

import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'RestaurantHome') {
            iconName = 'home';
          } else if (route.name === 'Deal') {
            iconName = 'local-offer';
           } //else if (route.name === 'Orders') {
          //   iconName = 'chat';
          // } 
          else if (route.name === 'Order') {
            iconName = 'shopping-cart';
          }
          else if (route.name === 'Notification') {
            iconName = 'notifications';
          }
          else if (route.name === 'Chat') {
            iconName = 'message';
          }

          return <MaterialIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#FA7D54', // Custom active color
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12, // Custom font size
          fontWeight: 'bold', // Custom font weight
        },
        tabBarItemStyle: {
          paddingBottom: 6, // Custom padding for tab items
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Custom background color
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.2)',
        },
      })}
    >
      <Tab.Screen name="RestaurantHome" component={Page} options = {{
            headerShown: false
        }} />
      <Tab.Screen name="Deal" component={DealScreen}  options = {{
            headerShown: false
        }}/>
      <Tab.Screen name="Order" component={OrderScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Notification" component={NotificationScreen} options = {{
            headerShown: false
        }}/>
      <Tab.Screen name="Chat" component={ChatBot} options = {{
            headerShown: false
        }}/>
        
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  // Define your custom styles here
});