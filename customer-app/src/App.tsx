import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import NearbyMechanicsScreen from './screens/NearbyMechanicsScreen';
import LiveTrackingScreen from './screens/LiveTrackingScreen';
import InspectionReportScreen from './screens/InspectionReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import RatingScreen from './screens/RatingScreen';

const Stack = createNativeStackNavigator();

function Root() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Nearby" component={NearbyMechanicsScreen} />
            <Stack.Screen name="Live" component={LiveTrackingScreen} />
            <Stack.Screen name="Report" component={InspectionReportScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Rating" component={RatingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
