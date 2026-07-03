import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BookingRequestDetailScreen({ route, navigation }: any) {
  const { request } = route.params;

  const accept = () => {
    // TODO: call API to accept
    navigation.navigate('Checklist', { bookingId: request.id });
  };

  const reject = () => {
    // TODO: call API to reject
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request from {request.customerName}</Text>
      <Text>Address: {request.address}</Text>
      <Text>Time: {request.time}</Text>
      <View style={{ height: 12 }} />
      <Button title="Accept" onPress={accept} />
      <View style={{ height: 8 }} />
      <Button title="Reject" onPress={reject} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
