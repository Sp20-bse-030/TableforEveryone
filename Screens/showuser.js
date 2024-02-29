import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId; // Replace with the actual user ID
      console.log(userId);
        const response = await axios.get(`http://${ip}:8000/users/${userId}`); // Replace with your API endpoint
      
        setUsers(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error retrieving users', err);
      setError('Error retrieving users');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Fetch Users" onPress={fetchUsers} />
      {error && <Text>{error}</Text>}
      {users.length > 0 && (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Text>{item.username}</Text>
          )}
        />
      )}
    </View>
  );
};

export default ShowUser;
