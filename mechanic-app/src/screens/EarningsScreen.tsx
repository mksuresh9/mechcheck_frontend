import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EarningsScreen() {
  const MOCK = { week: 12000, month: 48000 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earnings</Text>
      <Text>Last week: ₹{MOCK.week}</Text>
      <Text>Last month: ₹{MOCK.month}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
