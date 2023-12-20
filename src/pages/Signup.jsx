import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';

const Signup = props => {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30, alignSelf: 'center'}}>
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
      <View style={{alignSelf: 'center', marginBottom: 20}}>
        <Text style={styles.headerText}>Let's Get Started!</Text>
      </View>
      <View style={styles.InputContainer}>
        <View style={{marginBottom: 10}}>
          <FieldInput placeholder="Your First Name" imgFile="user.png" />
          <FieldInput placeholder="Your Last Name" imgFile="user.png" />
          <FieldInput placeholder="Your Meter Number" imgFile="user.png" />
          <FieldInput placeholder="New Password" imgFile="user.png" />
          <FieldInput placeholder="Confirm New Password" imgFile="user.png" />
        </View>
        <View style={styles.btnContainer}>
          <Btn
            bgColor="#030303"
            textColor="#FFF"
            btnLabel="Sign Up"
            press={() => {
              props.navigation.navigate('Home');
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 17}}>Existing User ? </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Login');
              }}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>Login</Text>
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
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 15,
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

export default Signup;
