// import React, { useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// const CartSlider = ({ Items, onAddToCart }) => {
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       {Items.map((item, index) => (
//         <View key={index} style={styles.foodItem}>
//           <Image source={item.image} style={styles.foodImage} />
//           <Text style={styles.foodPrice}>${item.price}</Text>
//           <TouchableOpacity onPress={() => onAddToCart(item)} style={styles.addButton}>
//             <Text style={styles.addButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   foodItem: {
//     margin: 10,
//     alignItems: 'center',
//   },
//   foodImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     borderRadius: 50,
//   },
//   foodPrice: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   addButton: {
//     backgroundColor: 'green',
//     padding: 5,
//     borderRadius: 20,
//     marginTop: 5,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default CartSlider;
