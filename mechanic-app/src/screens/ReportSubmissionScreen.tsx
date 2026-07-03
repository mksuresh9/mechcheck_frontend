import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function ReportSubmissionScreen({ route, navigation }: any) {
  const { checklist } = route.params || {};
  const [photo, setPhoto] = useState<string | null>(null);

  const pickPhoto = async () => {
    // Placeholder: integrate expo-image-picker
    setPhoto('https://via.placeholder.com/400');
  };

  const submit = () => {
    // TODO: upload photos and submit report via API
    navigation.navigate('Requests');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Report</Text>
      <Text>Checklist summary:</Text>
      <Text>{JSON.stringify(checklist)}</Text>
      {photo ? <Image source={{ uri: photo }} style={{ width: 200, height: 200, marginVertical: 12 }} /> : null}
      <Button title="Take/Upload Photo" onPress={pickPhoto} />
      <View style={{ height: 8 }} />
      <Button title="Submit Report" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 } });
