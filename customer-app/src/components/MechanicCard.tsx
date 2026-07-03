import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MechanicCard({ mechanic, onSelect }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{mechanic.name}</Text>
      <Text>{mechanic.distance} km away • {mechanic.rating}★</Text>
      <Button title="Book" onPress={() => onSelect(mechanic)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: '600' }
});
