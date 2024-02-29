import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ip from '../Ip';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [conversationStep, setConversationStep] = useState(0);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [isTextInputDisabled, setIsTextInputDisabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate the initial message from the chatbot
    setTimeout(() => {
      addMessage('Chatbot: Welcome to the chatbot! What can I do for you?', false);
    }, 1000);
  }, []);

  const addMessage = (message, isUser = false) => {
    setMessages((prevMessages) => {
      const newMessage = { text: message, isUser };
      return [...prevMessages, newMessage];
    });
  };

  const handleSend = () => {
    if (userMessage.trim() === '') {
      return;
    }

    // Display the user's message immediately
    addMessage(`You: ${userMessage}`, true);

    if (conversationStep === 0) {
      // Simulate typing animation for the chatbot
      setIsChatbotTyping(true);

      // Simulate a delayed response from the chatbot
      setTimeout(() => {
        setIsChatbotTyping(false);
        addMessage('Chatbot: What is your name?', false);
        setConversationStep(1);
      }, 2000);
    } else if (conversationStep === 1) {
      setName(userMessage);
      setIsChatbotTyping(true);

      setTimeout(() => {
        setIsChatbotTyping(false);
        addMessage('Chatbot: What is your email?', false);
        setConversationStep(2);
      }, 2000);
    } else if (conversationStep === 2) {
      setEmail(userMessage);
      setIsChatbotTyping(true);

      setTimeout(() => {
        setIsChatbotTyping(false);
        addMessage('Chatbot: Please provide details of the problem.', false);
        setConversationStep(3);
      }, 2000);
    } else if (conversationStep === 3) {
      // Set the complaint state
      setComplaint(userMessage);
      setIsChatbotTyping(true);

      setTimeout(() => {
        setIsChatbotTyping(false);
        addMessage('Chatbot: Anything else left?', false);
        setConversationStep(4);
      }, 2000);
    } else if (conversationStep === 4) {
      // You can add any additional conversation logic here before sending to the backend.
      // In this example, we don't save the user's last message.
      setIsChatbotTyping(true);

      setTimeout(() => {
        setIsChatbotTyping(false);
        // Send the data to the backend
        handleSendDataToBackend();
      }, 2000);
    }

    setUserMessage('');
  };

  const handleSendDataToBackend = async () => {
    setIsTextInputDisabled(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const customerId = decodedToken.customerId;
      //console.log(customerId);

      // Include the current date
      const currentDate = new Date();

      // Log the user data for debugging
      // console.log('Name:', name);
      // console.log('Email:', email);
      // console.log('Complaint:', complaint);

      // Replace this with your actual API endpoint
      await axios.post(`http://${ip}:8000/complaints`, {
        //customerId,
        name,
        email,
        complaint,
        chatDate: currentDate,
      });

      addMessage('Chatbot: Thank you for your cooperation. We will notify you shortly.', false);
      addMessage('Chatbot: Chat ended.', false);
      setIsChatEnded(true);
    } catch (error) {
      console.error(error);
      addMessage('Chatbot: An error occurred. Please try again later.', false);
    } finally {
      setIsTextInputDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.chatbotName}>Chatbot</Text>
      </View>
      <ScrollView>
        {messages.map((message, index) => (
          <View
            key={index}
            style={message.isUser ? styles.userMessageContainer : styles.chatbotMessageContainer}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {isChatbotTyping && (
          <View style={styles.chatbotMessageContainer}>
            <Text style={[styles.messageText, { color: 'green' } ]}>
              Chatbot: Typing...
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={userMessage}
          onChangeText={(text) => setUserMessage(text)}
          editable={!isChatEnded && !isTextInputDisabled} // Disable text input when the chat ends or during processing
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isChatEnded || isTextInputDisabled} // Disable send button when the chat ends or during processing
        >
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chatbotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
  },
  chatbotMessageContainer: {
    backgroundColor: 'lightgray',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    backgroundColor: 'lightblue',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  messageInput: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default ChatBot;