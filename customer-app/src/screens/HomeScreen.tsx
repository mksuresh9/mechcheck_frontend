import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a mechanic near you</Text>
      <Button title="New Booking" onPress={() => navigation.navigate('Booking')} />
      <Button title="Nearby Mechanics" onPress={() => navigation.navigate('Nearby')} />
      <Button title="Live Tracking" onPress={() => navigation.navigate('Live')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
