import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SelectImg from '../pages/SelectImg';
import ResultScreen from '../pages/ResultScreen';
import Firebase22 from '../pages/Firebase22';
import HistoryScreen from '../pages/HistoryScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SelectImg" component={SelectImg} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="firebase" component={Firebase22} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
    </Drawer.Navigator>
  );
};

function MainNavigator() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}

export default MainNavigator;
