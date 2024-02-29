import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import ip from '../Ip'

const BookingComponent = () => {
  const route = useRoute();
  const tableId = route.params?.tableId;
  const mId = route.params?.mId;
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const navigation = useNavigation();
  const handleConfirmBooking = () => {
    if (
      !customerName ||
      !phoneNumber ||
      !date ||
      !duration ||
      !startTime ||
      !endTime ||
      !tableId // Assuming tableId is available
    ) {
      Alert.alert('All fields must be filled');
      return;
    }
  
    const BookTable = {
      tableId,
      date,
      startTime,
      endTime,
    };
  
    axios
      .post(`http:/${ip}:8000/checkavailable`, BookTable)
      .then((response) => {
        if (response.data.message === 'This table is already booked for the specified time') {
          Alert.alert('This table is already booked for the specified time');
        }
        if(response.data.message === 'Tables not found for the given tableId'|| response.data.message === 'Table is available for booking' )
       {
          // If no conflict, proceed with booking
          const bookingData = {
            tableId,
            customerName,
            phoneNumber,
            date,
            duration,
            startTime,
            endTime,
          };
  
          // Make a separate request to actually book the table
          axios
            .post(`http:/${ip}:8000/booktable`, bookingData)
            .then(() => {
              Alert.alert('Your Table has been Booked successfully');
              navigation.navigate('Feedback', {mId: mId});
            })
            .catch((error) => {
              console.error('Error in Booking Table', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking table availability', error);
      });
  };
  

  // const handleConfirmBooking = () => {
  //   // Implement booking confirmation logic here
  //   if (
  //     !customerName ||
  //     !phoneNumber ||
  //     !date ||
  //     !duration ||
  //     !startTime ||
  //     !endTime
  //   ) {
  //     Alert.alert('All fields must be filled');
  //     return;
  //   }
  //   const BookTable = {
  //     customerName, 
  //     phoneNumber,
  //     date,
  //     duration,
  //     startTime,
  //     endTime
  
  //   };
  // axios
  // .post(`http:/${ip}:8000/booktable`, BookTable )
  // .then((response)=>{
    
    
  //   Alert.alert("Your Table has been Booked successfuly");
  //   navigation.navigate('Feedback'); 
    
  // })
  // .catch((error)=>{
  //   console.error("Error in Booking Table", error)
  // })
  //   // You can send this data to your backend or perform other actions
  // };

  const handleCancelBooking = () => {
    // Implement cancel booking logic here or reset the form
    navigation.goBack();
    // You can reset the input fields here if needed
  };
  // const handleDateChange = (selectedDate) => {
  //   setDate(selectedDate);
  // };
  // const BookTable = {
  //   customerName, 
  //   phoneNumber,
  //   date,
  //   duration,
  //   startTime,
  //   endTime,

  // };
   // Replace this with the actual ID


  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Your Details</Text>
  
     
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      {/* <TextInput
  style={styles.input}
  placeholder="Select Date"
  value={date ? date.toISOString().split('T')[0] : ''}
  editable={false}
/>
      <DatePicker
  style={{ width: 400, marginTop: 10 }}
  date={date}
  mode="date"
  placeholder="Select Date"
  format="YYYY-MM-DD"
  minDate="2023-01-01"
  maxDate="2030-12-31"
  onDateChange={handleDateChange}
/> */}
<TextInput
        style={styles.input}
        placeholder="enter Date"
        value={date}
        onChangeText={(text) => setDate(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (in hours)"
        value={duration}
        onChangeText={(text) => setDuration(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style = {styles.button}
        onPress={handleConfirmBooking}
        >
          <Text style = {styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity> 
          <TouchableOpacity
          style = {styles.button}
        onPress={handleCancelBooking}
        >
          <Text style = {styles.buttonText}>Cancel</Text>
          </TouchableOpacity> 
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'orange',
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor:'white',
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop:'10',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    paddingHorizontal: 10,
  },
  button:{
    backgroundColor:'white',
    width:100,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,

    
  }, 
  buttonText:{
    fontWeight:'bold'
  },
  text:{
    fontWeight:'bold',
    fontSize:20,
    color:'white',
    marginBottom:20
  }
  
});

export default BookingComponent;
