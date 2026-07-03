import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import RequestCard from '../components/RequestCard';

const MOCK = [
  { id: 'r1', customerName: 'Anil', address: 'MG Road', time: 'In 10 mins' },
  { id: 'r2', customerName: 'Sita', address: 'Brigade Rd', time: 'In 30 mins' }
];

export default function BookingRequestsScreen({ navigation }: any) {
  const view = (request: any) => navigation.navigate('RequestDetail', { request });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Requests</Text>
      <FlatList data={MOCK} keyExtractor={(i) => i.id} renderItem={({ item }) => <RequestCard request={item} onView={view} />} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
