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
// import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Signup = props => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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

    if (isEmailValid && isPassValid && name.length > 0 && phone.length === 10) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        //Put User Data with their uid
        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
          phone: phone,
        };

        await firestore()
          .collection('users')
          .doc(response.user.uid)
          .set(userData);

        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        Alert.alert('Please Check Your Email and Verify');

        console.log(response);

        navigation.navigate('Login');
      } catch (err) {
        console.log(err);
        setMessage(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center'}}>
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
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.headerText}>Let's Get Started!</Text>
      </View>

      <View style={styles.InputContainer}>
        <View style={{marginBottom: 5}}>
          {/* Name of the User */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h2Text}>Name</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/user.png`)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Name"
                  value={name}
                  onChangeText={value => setName(value)}
                />
              </View>
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h2Text}>Phone Number</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require('../assets/phone.png')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Mobile No."
                  value={phone}
                  onChangeText={value => setPhone(value)}
                />
              </View>
            </View>
          </View>

          {/* Email */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h2Text}>Email</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require('../assets/mail-inbox.png')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Email"
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h2Text}>Password</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/reset-password.png`)}
                />
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

          {/* Confirm Password */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 5}}>
              <Text style={styles.h2Text}>Confirm Password</Text>
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/reset-password.png`)}
                />
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
        <Text style={{alignSelf: 'center', fontWeight: '700'}}>{message}</Text>

        {/* Existing User */}
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
