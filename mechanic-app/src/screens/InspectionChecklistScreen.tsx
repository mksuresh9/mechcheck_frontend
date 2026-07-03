import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';

const ITEMS = [
  'Brakes',
  'Lights',
  'Engine',
  'Tires',
  'Fluids'
];

export default function InspectionChecklistScreen({ route, navigation }: any) {
  const [state, setState] = useState(() => ITEMS.reduce((acc, i) => ({ ...acc, [i]: false }), {} as Record<string, boolean>));

  const toggle = (k: string) => setState((s) => ({ ...s, [k]: !s[k] }));

  const submit = () => navigation.navigate('SubmitReport', { checklist: state });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspection Checklist</Text>
      {ITEMS.map((it) => (
        <View key={it} style={styles.row}>
          <Text>{it}</Text>
          <Switch value={!!state[it]} onValueChange={() => toggle(it)} />
        </View>
      ))}
      <Button title="Next: Upload & Submit" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 18, marginBottom: 12 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 } });
