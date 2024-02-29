import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import ip from '../Ip'

const AutomatedBooking = () => {
  const route = useRoute();
  const tableId = route.params?.tableId;
  const [tableType, setTableType] = useState('party-table');
  const [capacity, setCapacity] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [table, setTable] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const navigation = useNavigation();


  const handleBooking = () =>{
    if(
       !capacity || !duration || !startTime || !endTime
    ){
      Alert.alert("All fields Required");
      return;
    }
    const AutomatedTable= {
      tableType,
      capacity,
      duration,
      startTime,
      endTime
    }
    axios
    .post(`http:/${ip}:8000/AutomatedTableBook`, AutomatedTable)
    .then((response)=>{
      setTable(response.data);
      console.log(response.data)
      if(response.data === null){
        Alert.alert("Sorry there is no table for your interests, you can just go for the manual booking")
      }
      else{
        setSelectedTable(response.data);
        setModalVisible(true);
      }

    })
    .catch((error) =>{
      console.log("Error booking Table", error)

    })


  };
  const handleAgree = ()=>{
    navigation.navigate("Table",  { tableId: selectedTable._id })
  }

  return (
    <View style={{ flex: 1,  backgroundColor:'orange' }}>
        <View style = {styles.container}>
      <Text style = {styles.text}>Select Table Type:</Text>
      
      <Picker
        selectedValue={tableType}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setTableType(itemValue)}
      >
        <Picker.Item label="party-table" value="party-table" />
        <Picker.Item label="couple-table" value="couple-table" />
        {/* Add other table types */}
      </Picker>
      

      <Text style = {styles.text}>Capacity:</Text>
      <TextInput
         style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, borderRadius:15, backgroundColor:'white', paddingLeft:10, height: 50}}
        onChangeText={(text) => setCapacity(text)}
        value={capacity}
      />
      <Text  style = {styles.text} >Date</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, borderRadius:15, backgroundColor:'white', paddingLeft:10, height: 50}}
        onChangeText={(text) => setDate(text)}
        value={date}
      />

      <Text  style = {styles.text} >Duration:</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, borderRadius:15, backgroundColor:'white', paddingLeft:10, height: 50}}
        onChangeText={(text) => setDuration(text)}
        value={duration}
      />

      <Text style = {styles.text}>Start Time:</Text>
      {/* Implement your component for selecting start time, e.g., DateTimePicker */}
      {/* For simplicity, using text input for demonstration */}
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, borderRadius:15, backgroundColor:'white', paddingLeft:10, height: 50}}
        onChangeText={(text) => setStartTime(text)}
        value={startTime}
      />

      <Text style = {styles.text}>End Time:</Text>
      {/* Implement your component for selecting end time, e.g., DateTimePicker */}
      {/* For simplicity, using text input for demonstration */}
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, borderRadius:15, backgroundColor:'white', paddingLeft:10, height: 50}}
        onChangeText={(text) => setEndTime(text)}
        value={endTime}
      />

      
      <TouchableOpacity style = {styles.booknow}
      onPress = {handleBooking}
      >
        <Text style = {styles.buttontext}>Book Now</Text>
      </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Display table details here */}
            {selectedTable && (
              <View>
                
                <Text>Name: {selectedTable.name}</Text>
                <Text>Capacity: {selectedTable.capacity}</Text>
                <Text>Type: {selectedTable.brand}</Text>
                <Text>price {selectedTable.price}</Text>
                {/* Display other details as needed */}
                <Text>Location: {selectedTable.location}</Text>
               
                {/* Display images or other information */}
              </View>
            )}

            {/* Close button */}
            <View style = {styles.buttoncontaimer}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAgree}>
              <Text style={styles.closeButton}>Agree</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        padding:30,

    },
    text:{
        fontSize:15,
        fontWeight:'bold', 
        marginTop:10,
        marginBottom:10

    },
    booknow:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        margin:40,
        borderRadius:20

    },
    buttontext:{
        fontSize:15,
        fontWeight:'bold', 
    },
    textinput:{
        borderRadius:20
    },
    modalContainer: {

      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      height:300,
      width:400,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent:'center'
    },
    closeButton: {
      marginTop: 10,
      backgroundColor:'orange',
      height:40,
      width:60,
      color: 'blue',
      borderRadius:10,
      
      padding:10,
    },
    buttontext:{

    },
    buttoncontaimer:{

      flexDirection:'row',
      width:200,
      justifyContent:'space-between'
    }

})

export default AutomatedBooking;
