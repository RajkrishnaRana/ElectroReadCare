import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';

const Login = props => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 30}}>
        <Image
          style={styles.imgContainer}
          source={require('../assets/Electro-Service-Logo-N.webp')}
        />
        <View style={styles.logoText}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#d65231'}}>
            Electro{' '}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#f5ce0c'}}>
            Care
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerText}>Welcome Back!</Text>
      </View>
      <View style={styles.InputContainer}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.h2Text}>Username</Text>
          <FieldInput placeholder="username" imgFile="user.png" />
        </View>
        <View>
          <Text style={styles.h2Text}>Password</Text>
          <FieldInput placeholder="password" imgFile="user.png" />
        </View>
        <View style={styles.btnContainer}>
          <Btn
            bgColor="#f5ce0c"
            textColor="#030303"
            btnLabel="Log In"
            press={() => {
              props.navigation.navigate('Home');
            }}
          />
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Text style={styles.footerText}>New User ? </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <Text style={styles.footerText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    justifyContent: 'center',
  },
  InputContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 20,
    color: '#0d0d0c',
  },
  h2Text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d0d0c',
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  imgContainer: {
    width: 100,
    height: 100,
  },
  logoText: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default Login;
