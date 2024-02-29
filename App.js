import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
//import HomeScreen from './Screens/Foodpanda';
import LoginScreen from './Screens/LoginScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import SignupScreen from './Screens/SignUpScreen';
import OTPScreen from './Screens/OTPScreen';
import RestaurantPage  from './Screens/Restaurant';
//import FoodpandaScreen from './Screens/Foodpanda'
import RestaurantDetails from './Screens/RestaurantDetails'
import NotificationScreen from './Screens/NotificationScreen';
import BottomTabNavigator from './Components/BottomTab';
import CheckoutComponent from './Screens/PaymentScreen';
import DealScreen from './Screens/DealScreen';
import MapScreen from './Screens/MapScreen';
//import VoiceRecognition from './Components/VoiceRecognition';
import VoiceToTextConverter from './Components/VoiceRecognition'
//import ShowUser from './Screens/showuser';
import ChatBot from './Screens/ChatScreen';
import OrderScreen from './Screens/OrderScreen';
import BookingComponent from './Screens/Tablebooking';
import FeedbackComponent from './Components/Feeback'
// import DrawerNavigator from './Components/DrawerNav';
// import DrawerScreen from './Components/DrawerTab';
import AutomatedBooking from './Screens/AutomatedBooking'



const Landing = () => {
  const navigation = useNavigation();

  const handleLandingScreen = () => {
      navigation.navigate('LogIn');
 };

  return (
     <ImageBackground source={require('./assets/landing.png')} style={styles.backgroundImage}>
          <View style={styles.container}>
              <Image
                  source={require('./assets/Logo.png')}
                  style={{ width: 150, height: 150, marginBottom: 150 }}
              />

              <Text style={styles.text}>Table for everyone</Text>

              <TouchableOpacity style={styles.button} onPress={handleLandingScreen} >
                  <Text style={styles.buttonText}>Welcome</Text>
              </TouchableOpacity>
          </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor:'orange'
  },
  text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 20,
  },
  button: {
      backgroundColor: 'orange',
      padding: 10,
      borderRadius: 5,
  },
  buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
  },
});



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing">
    <Stack.Screen name="Landing" component={Landing} options = {{
            headershown: false
        }} />
         <Stack.Screen name="Map" component={MapScreen} options = {{
            headershown: false
        }} />
         <Stack.Screen name="LogIn" component={LoginScreen} options = {{
            headershown: false
        }} /> 
        <Stack.Screen name="Voice" component={VoiceToTextConverter} options = {{
            headerShown: false
        }} /> 
          {<Stack.Screen name="Home" component={BottomTabNavigator} Screenoptions = {{
            headerShown: false
        }} /> } 
         {<Stack.Screen name="chatbot" component={ChatBot} Screenoptions = {{
            headerShown: false
        }} /> } 
         
          { <Stack.Screen name="Deal" component={DealScreen} options={{
            headershown: false
        }} /> }  
        { <Stack.Screen name="Notfication" component={NotificationScreen} options={{
            headershown: false
        }} /> } 
         { <Stack.Screen name="Automated" component={AutomatedBooking} options={{
            headershown: false
        }} /> } 
          <Stack.Screen name="Order" component={OrderScreen} options={{
            headershown: false
        }} />
        <Stack.Screen name="Feedback" component={FeedbackComponent} options={{
            headershown: false
        }} />
         { <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{
            headershown: false
        }} /> } 
        { <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{
            headershown: false
        }} /> }
        { <Stack.Screen name="SignUp" component={SignupScreen} options={{
            headershown: false
        }} /> }
         {<Stack.Screen name="Payment" component={CheckoutComponent} options={{
            headershown: false
        }} /> } 
         <Stack.Screen name="OTP" component={OTPScreen} options={{
            headershown: false
        }} />
        <Stack.Screen name="Table" component={BookingComponent} options={{
            headershown: false
        }} />
        {/* { <Stack.Screen name="Foodpanda" component={FoodpandaScreen} options={{
            headershown: false
        }} /> } 
        { <Stack.Screen name="Cheezious" component={CheeziousScreen} options={{
            headershown: false
        }} /> }
        { <Stack.Screen name="KFC" component={KFCScreen} options={{
            headershown: false
        }} /> }
        { <Stack.Screen name="Macdonalds" component={MacdonaldsScreen} options={{
            headershown: false
        }} /> }
        {<Stack.Screen name="Crazybite" component={CrazybiteScreen} options={{
            headershown: false
        }} /> } */}
        
        
        
    </Stack.Navigator>
</NavigationContainer>
    );
};

export default App;