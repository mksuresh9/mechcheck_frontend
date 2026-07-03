import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RatingScreen({ navigation }: any) {
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the mechanic</Text>
      <Text>Selected: {rating}★</Text>
      <View style={{ height: 12 }} />
      <Button title="Submit Rating" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
