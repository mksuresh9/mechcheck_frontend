import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LiveTrackingScreen({ route }: any) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Mock live updates
    const id = setInterval(() => {
      setLocation((l) => ({ lat: l.lat + 0.001, lng: l.lng + 0.001 }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanic is on the way</Text>
      <Text>Latitude: {location.lat.toFixed(4)}</Text>
      <Text>Longitude: {location.lng.toFixed(4)}</Text>
      <Text style={styles.note}>Map integration and real-time sockets to be connected.</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 8 }, note: { marginTop: 12, color: '#666' } });
