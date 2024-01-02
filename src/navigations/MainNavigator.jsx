import React from 'react';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SelectImg from '../pages/SelectImg';
import ResultScreen from '../pages/ResultScreen';
import HistoryScreen from '../pages/HistoryScreen';
import OfflinePages from '../pages/OfflinePages';
import SplashScreen from '../pages/SplashScreen';
import DetailsPage from '../pages/DetailsPage';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="SelectImg" component={SelectImg} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="History" component={HistoryScreen} />

      <Stack.Screen name="offline" component={OfflinePages} />
      <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
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

// const DrawerNav = () => {
//   const Drawer = createDrawerNavigator();
//   return (
//     <Drawer.Navigator screenOptions={{headerShown: false}}>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="History" component={HistoryScreen} />
//     </Drawer.Navigator>
//   );

// };
