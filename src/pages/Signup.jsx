import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import Btn from '../components/Btn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [showconpass, setShowconpass] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const validateEmail = email => {
    if (!email.includes('@')) {
      return false;
    } else {
      return true;
    }
  };

  const validatePass = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    } else if (password === confirmPassword) {
      return true;
    }
  };

  const showpassword = () => {
    setShowpass(prev => !prev);
  };
  const showconpassword = () => {
    setShowconpass(prev => !prev);
  };

  //Signup conditation check
  const signuphandel = async () => {
    const isEmailValid = validateEmail(email);
    const isPassValid = validatePass(password, confirmPassword);
    //Email check
    if (
      password === '' &&
      confirmPassword === '' &&
      email === '' &&
      phone === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error !',
        text2: 'Please enter all details',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });
    }
    //Phone No. check
    else if (phone.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Error !',
        text2: 'please enter a 10 digit Mobile No. ',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });
    }
    // Email check
    else if (!isEmailValid) {
      Toast.show({
        type: 'error',
        text1: 'Error !',
        text2: 'please enter a valid email',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });
    }
    //Password check
    else if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error !',
        text2: 'password is too short',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error !',
        text2: 'password is incorrect',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });
    }

    //Firebase Enter
    //When Password are same then Enter Firebase
    else if (isEmailValid && isPassValid) {
      try {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        const userData = {
          id: isUserCreated.user.uid,
          name: name,
          email: email,
          phone: phone,
        };

        await firestore()
          .collection('users')
          .doc(isUserCreated.user.uid)
          .set(userData);

        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        console.log(isUserCreated);
        Toast.show({
          type: 'success',
          text1: 'Successful',
          text2: 'Please Check Your Email and Verify',
          autoHide: true,
          position: 'top',
          topOffset: 0,
        });
        navigation.navigate('Login');

        //erease all data
      } catch (err) {
        console.log(err);
        setMessage(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={{marginBottom: 10, alignSelf: 'center'}}>
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
          {/* Name of the User */}
          <View style={styles.InputContainer}>
            <View style={{marginBottom: 10}}>
              {/* <Text style={styles.h2Text}>Name</Text> */}
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
            <View style={{marginBottom: 10}}>
              {/* <Text style={styles.h2Text}>Phone Number</Text> */}
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
            <View style={{marginBottom: 10}}>
              {/* <Text style={styles.h2Text}>Email</Text> */}
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/mail-inbox.png`)}
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
            <View style={{marginBottom: 10}}>
              {/* <Text style={styles.h2Text}>Password</Text> */}
              <View style={styles.sectionStyle}>
                <Image
                  style={{height: 20, width: 20, marginLeft: 10}}
                  source={require(`../assets/reset-password.png`)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password Again"
                  value={password}
                  onChangeText={value => setPassword(value)}
                  secureTextEntry={showpass}
                />
                {/* show password icon */}
                {showpass ? (
                  <TouchableOpacity onPress={showpassword}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        display: 'flex',
                        position: 'relative',
                      }}
                      source={require(`../assets/showpass.png`)}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={showpassword}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        display: 'flex',
                        position: 'relative',
                      }}
                      source={require(`../assets/hidepass.png`)}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={{marginBottom: 10}}>
              {/* <Text style={styles.h2Text}>Confirm Password</Text> */}
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
                  secureTextEntry={showconpass}
                />
                {/* show password icon */}
                {showconpass ? (
                  <TouchableOpacity onPress={showconpassword}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        display: 'flex',
                        position: 'relative',
                      }}
                      source={require(`../assets/showpass.png`)}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={showconpassword}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        display: 'flex',
                        position: 'relative',
                      }}
                      source={require(`../assets/hidepass.png`)}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Error Message Below  */}
        <Text style={{alignSelf: 'center', fontWeight: '700'}}>{message}</Text>

        <View style={styles.btnContainer}>
          <Btn
            bgColor="#030303"
            textColor="#FFF"
            btnLabel="Sign Up"
            press={signuphandel}
          />

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 17}}>Existing User ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
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
    paddingTop: 25,
  },
  input: {
    width: '80%',
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#424242',
    paddingRight: 20,
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
    // pBottom: 10,
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
