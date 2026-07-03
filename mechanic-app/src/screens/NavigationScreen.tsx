import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation</Text>
      <Text>Google Maps navigation should open here using Linking or react-native-maps + directions.</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
