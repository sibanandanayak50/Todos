import React from 'react';
import HomeScreen from './scr/Screens/HomeScreen';
import SingleUserDataScreen from './scr/Screens/SingleUserDataScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingleUserDataScreen" component={SingleUserDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}