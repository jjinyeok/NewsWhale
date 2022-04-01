import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/StartPage';
import MainPage from './src/MainPage';
import MyPage from './src/MyPage';
import AddKeywordsPage from './src/AddKeywordsPage';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={StartPage}/>
        <Stack.Screen name="Main" component={MainPage}/>
        <Stack.Screen name="My" component={MyPage}/>
        <Stack.Screen name="AddKeywords" component={AddKeywordsPage}/>
      </Stack.Navigator>
      <StatusBar style="invert" />
    </NavigationContainer>
  );
}
