import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, FlatList } from 'react-native';

export default function ChatClient() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const findMessages = async () => {
      const response = await fetch('http://cpsc345final.jayshaffstall.com/get_chats.php', {
        method: 'post',
      });
      const result = await response.json();

      if (result.status === 'okay') {
        setMessages(result.messages);
      } else {
        Alert.alert('Error', 'there was an error');
      }
  };

  const sendMessage = async () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('message', message);

      const response = await fetch('http://cpsc345final.jayshaffstall.com/add_chat.php', {
        method: 'post',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'okay') {
        Alert.alert('Message Sent', 'Message was sent successfully');
        findMessages();
      } else {
        Alert.alert('Error','there was an error');
      } 
  };

  useEffect(() => {
    findMessages();
  }, []);

  return (
    <View>
      <TextInput placeholder="Your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
     <Button title="Send Message" onPress={sendMessage} />
      <Text>MMessages:</Text>
      <FlatList data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.name} says: ${item.message}`}</Text>
        )} />
    </View>
  );
}
