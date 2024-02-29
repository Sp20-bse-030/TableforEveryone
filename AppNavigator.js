// // import React from 'react';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import { NavigationContainer } from '@react-navigation/native';
// // import LandingScreen from './LandingScreen';
// // import Helloworld from './HelloWorld';
// // // import LoginScreen from './Screens/LoginScreen';
// // // import HomeScreen from './Screens/Foodpanda';
// // // import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
// // // import SignupScreen from './Screens/SignUpScreen';
// // // import OTPScreen from './Screens/OTPScreen';
// // // import RestaurantPage  from './Screens/Restaurant';
// // // import FoodpandaScreen from './Screens/Foodpanda'
// // // import RestaurantDetails from './Screens/RestaurantDetails'
// // // import BottomTabNavigator from './Components/BottomTab';



// // const Stack = createStackNavigator();

// // const AppNavigator = () => {
// //     return (
// //         <NavigationContainer>
// //             <Stack.Navigator>
// //             <Stack.Screen name="Landing" component={LandingScreen} options = {{
// //                     headershown: false
// //                 }} />
// //                 { <Stack.Screen name="World" component={Helloworld} options={{
// //                     headershown: false
// //                 }} /> }
// //                 {/* {<Stack.Screen name="Home" component={BottomTabNavigator} Screenoptions = {{
// //                     headershown: false
// //                 }} /> }
// //                  { <Stack.Screen name="Restaurant" component={RestaurantPage} options={{
// //                     headershown: false
// //                 }} /> } 
// //                 { <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                  { <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{
// //                     headershown: false
// //                 }} /> } 
// //                 { <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 { <Stack.Screen name="SignUp" component={SignupScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 {<Stack.Screen name="Drawer" component={CustomDrawerContent} options={{
// //                     headershown: false
// //                 }} /> }
// //                 /* <Stack.Screen name="OTP" component={OTPScreen} options={{
// //                     headershown: false
// //                 }} />
// //                 { <Stack.Screen name="Foodpanda" component={FoodpandaScreen} options={{
// //                     headershown: false
// //                 }} /> } 
// //                 { <Stack.Screen name="Cheezious" component={CheeziousScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 { <Stack.Screen name="KFC" component={KFCScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 { <Stack.Screen name="Macdonalds" component={MacdonaldsScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 {<Stack.Screen name="Crazybite" component={CrazybiteScreen} options={{
// //                     headershown: false
// //                 }} /> }
// //                 */}
                
                
// //             </Stack.Navigator>
// //         </NavigationContainer>
// //     );
// // };

// // export default AppNavigator;
// import React from 'react';
// import { View } from 'react-native';
// import { createAppContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// import Landing from './LandingScreen';
// import Helloworld from './HelloWorld';



// const StackNavigator = createStackNavigator({
//   LandingScreen: Landing,
//   HelloWorld: Helloworld,
  

// },
// {
//   defaultNavigationOptions: {
//     headerShown: false, // Hide the header for all screens
//   },
// });
// const AppContainer = createAppContainer(StackNavigator);

// const AppNav = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <NavigationContainer>
//         <AppContainer />
//       </NavigationContainer>
//     </View>
//   );
// };

// export default AppNav;