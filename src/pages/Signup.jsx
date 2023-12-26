import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';
import auth from '@react-native-firebase/auth';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = email => {
    if (!email.includes('@')) {
      Alert.alert('Please Provide a valid email');
      return false;
    } else {
      return true;
    }
  };

  const validatePass = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      Alert.alert('Please give same password');
      return false;
    } else if (password === confirmPassword) {
      return true;
    }
  };

  // SignUp Function
  const handleSignup = async () => {
    const isEmailValid = validateEmail(email);
    const isPassValid = validatePass(password, confirmPassword);

    if (isEmailValid && isPassValid) {
      try {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log(isUserCreated);
      } catch (err) {
        console.log(err);
        setMessage(err.message);
      }
      props.navigation.navigate('Login');
    }
  };

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
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.h2Text}>Email</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/mail-inbox.png`)}
                />
                {/* Email */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Email"
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
              </View>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.h2Text}>Password</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/reset-password.png`)}
                />

                {/* Password */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password"
                  value={password}
                  onChangeText={value => setPassword(value)}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.h2Text}>Confirm Password</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/reset-password.png`)}
                />
                {/* Confirm Password */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password Again"
                  value={confirmPassword}
                  onChangeText={value => setConfirmPassword(value)}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
        </View>
        {/* Error Message Below  */}
        <Text style={{alignSelf: 'center'}}>{message}</Text>

        <View style={styles.btnContainer}>
          <Btn
            bgColor="#030303"
            textColor="#FFF"
            btnLabel="Sign Up"
            press={() => {
              // SignUp Function
              password.length >= 6
                ? handleSignup()
                : Alert.alert('Password Must be at least 6 char');
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
  input: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#424242',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0d50c',
    borderRadius: 50,
    height: 50,
    marginBottom: 7,
    backgroundColor: '#fff',
  },
  InputContainer: {
    marginLeft: 10,
    marginRight: 10,
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
