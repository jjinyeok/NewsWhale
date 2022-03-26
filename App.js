import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/StartPage';
import MainPage from './src/MainPage';
import MyPage from './src/MyPage';
import AddKeywordsPage from './src/AddKeywordsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartPage} options={{
          title: '로그인/로그아웃', 
          headerStyle:{
            backgroundColor: '#42C2FF',
          }, 
          headerTintColor: '#EFFFFD',
        }}/>
        <Stack.Screen name="Main" component={MainPage} options={({route})=>({ title: route.params.userID + '님의 메인페이지' })}/>
        <Stack.Screen name="My" component={MyPage} options={({route})=>({ title: route.params.name + '님의 메인페이지' })}/>
        <Stack.Screen name="AddKeywords" component={AddKeywordsPage} options={{title: '키워드 추가하기'}}/>
      </Stack.Navigator>
      <StatusBar style="invert" />
    </NavigationContainer>
  );
}
