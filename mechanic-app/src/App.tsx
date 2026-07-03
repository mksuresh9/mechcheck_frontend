import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import RequestsScreen from './screens/BookingRequestsScreen';
import RequestDetailScreen from './screens/BookingRequestDetailScreen';
import InspectionChecklistScreen from './screens/InspectionChecklistScreen';
import ReportSubmissionScreen from './screens/ReportSubmissionScreen';
import EarningsScreen from './screens/EarningsScreen';

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
            <Stack.Screen name="Requests" component={RequestsScreen} />
            <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
            <Stack.Screen name="Checklist" component={InspectionChecklistScreen} />
            <Stack.Screen name="SubmitReport" component={ReportSubmissionScreen} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
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
