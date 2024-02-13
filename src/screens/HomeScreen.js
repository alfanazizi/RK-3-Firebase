import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import db from '../config/firebaseConfig';

const HomeScreen = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notes').onSnapshot((snapshot) => {
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    });
    return () => unsubscribe();
  }, []);

  const addNote = () => {
    db.collection('notes').add({ text: note });
    setNote('');
  };

  const deleteNote = (id) => {
    db.collection('notes').doc(id).delete();
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Note"
        value={note}
        onChangeText={(text) => setNote(text)} // Use onChangeText properly
      />
      <Button title="Add note" onPress={addNote} />
      <FlatList
        data={notes} // Use 'notes' array instead of 'note'
        renderItem={({ item }) => (
          <Text onPress={() => deleteNote(item.id)}> {item.text}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;