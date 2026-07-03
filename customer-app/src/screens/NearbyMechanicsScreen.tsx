import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MechanicCard from '../components/MechanicCard';

const MOCK = [
  { id: 'm1', name: 'Ravi Mechanics', distance: 1.2, rating: 4.7 },
  { id: 'm2', name: 'Asha Auto', distance: 2.1, rating: 4.5 }
];

export default function NearbyMechanicsScreen({ navigation, route }: any) {
  const select = (mechanic: any) => {
    // TODO: create booking with selected mechanic
    navigation.navigate('Live', { mechanicId: mechanic.id });
  };

  return (
    <View style={styles.container}>
      <FlatList data={MOCK} keyExtractor={(i) => i.id} renderItem={({ item }) => <MechanicCard mechanic={item} onSelect={select} />} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
