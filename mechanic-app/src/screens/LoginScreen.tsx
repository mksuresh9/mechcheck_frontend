import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanic Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign in" onPress={() => signIn(email, password)} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 16 }, title: { fontSize: 20, marginBottom: 16, textAlign: 'center' }, input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 } });
