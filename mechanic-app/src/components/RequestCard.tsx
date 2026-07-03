import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RequestCard({ request, onView }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{request.customerName}</Text>
      <Text>{request.address}</Text>
      <Text>{request.time}</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Button title="View" onPress={() => onView(request)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 }, title: { fontWeight: '600' } });
