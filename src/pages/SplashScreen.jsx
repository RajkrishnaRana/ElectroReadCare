import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
  const navigation = useNavigation();

  //   Auth State Manage(if user Verified then Home otherwise Login)
  useEffect(() => {
    setTimeout(async () => {
      const unsubscribe = await Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';
        unsubscribe();
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);

    //return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          height: 600,
          width: 600,
        }}
        source={require('../assets/Splash-bolt.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '30%',
  },
});
