import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function BookingScreen({ navigation }: any) {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const createBooking = () => {
    // TODO: call API to create booking and show mechanic options
    navigation.navigate('Nearby', { address, date });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address" />
      <Text style={styles.label}>Preferred date/time</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="e.g. Tomorrow 10:00" />
      <Button title="Find Mechanics" onPress={createBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 12 }
});
