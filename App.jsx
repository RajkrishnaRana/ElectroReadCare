import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import SelectImg from './src/pages/SelectImg';
import ResultScreen from './src/pages/ResultScreen';
import Firebase22 from './src/pages/Firebase22';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SelectImg" component={SelectImg} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="firebase" component={Firebase22} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
