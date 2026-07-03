import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MOCK_REPORT = {
  overall: 85,
  summary: 'Vehicle is in good condition with minor issues in brakes.'
};

export default function InspectionReportScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspection Report</Text>
      <Text style={styles.score}>Score: {MOCK_REPORT.overall}%</Text>
      <Text style={styles.summary}>{MOCK_REPORT.summary}</Text>
      <Button title="Rate Mechanic" onPress={() => navigation.navigate('Rating')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 8 }, score: { fontSize: 22, fontWeight: '700', marginBottom: 8 }, summary: { color: '#333', marginBottom: 12 } });
