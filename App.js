import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/Page/StartPage';
import MainPage from './src/Page/MainPage';
import MyPage from './src/Page/MyPage';
import AddKeywordsPage from './src/Page/AddKeywordsPage';
import SignUpPage from './src/Page/SignUpPage';
import InformationPage from './src/Page/InformationPage';
import PolicyPage from './src/Page/PolicyPage';
import DetailKeywordPage from './src/Page/DetailKeywordPage'
import AsyncStorage from '@react-native-async-storage/async-storage';

// ios Remote debugger 방지
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);

// NativeNavigator 객체
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({}); 
  useEffect(() => {
    AsyncStorage.getItem('user', (err, result) => {
      if(result === undefined) {
        setUser({});
      }
      else{
        setUser(JSON.parse(result));
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={(user === {}) ? "Main" : "Start"} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={StartPage}/>
        <Stack.Screen name="Main" component={MainPage}/>
        <Stack.Screen name="My" component={MyPage}/>
        <Stack.Screen name="AddKeywords" component={AddKeywordsPage}/>
        <Stack.Screen name="SignUp" component={SignUpPage}/>
        <Stack.Screen name="Policy" component={PolicyPage}/>
        <Stack.Screen name="Information" component={InformationPage}/>
        <Stack.Screen name="DetailKeyword" component={DetailKeywordPage}/>
      </Stack.Navigator>
      <StatusBar style="invert" />
    </NavigationContainer> 
  );
}
