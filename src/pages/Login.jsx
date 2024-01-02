import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
// import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';
import auth from '@react-native-firebase/auth';
import {useNavigation, StackActions} from '@react-navigation/native';
import {color} from 'react-native-reanimated';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showpass, setShowpass] = useState(true);
  // const[showpassimg,setShowpassimg]=useState()

  // For Navigation
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await auth().signInWithEmailAndPassword(email, password);

        console.log(user);
        // replacing LoginScreen navigator postion with Home. So back btn won't take you to login screen again after Sign in.
        if (user.user.emailVerified) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'You are successfully Login',
            autoHide: true,
            position: 'top',
          topOffset: 0,
          });
          navigation.dispatch(StackActions.replace('Home'));
        } else {
          // Alert.alert('Please Verify Your Email Checkout Inbox');
          Toast.show({
            type: 'error',
            text1: '!  Failed',
            text2: 'Please Verify Your Email Checkout Inbox',
            autoHide: true,
            position: 'top',
          topOffset: 0,
          });
          await auth().currentUser.sendEmailVerification();
          await auth().signOut();
        }
      } else {
        // Alert.alert('Please Enter All Details');
        Toast.show({
          type: 'error',
          text1: '!  Alert',
          text2: 'Please enter all details',
          position: 'top',
          topOffset: 0,
          autoHide: true,
        });
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: '!  Failed',
        text2: 'invalied',
        autoHide: true,
        position: 'top',
        topOffset: 0,
      });

      setMessage(err.message);
    }
  };

  const showpassword = () => {
    setShowpass(p => !p);
  };

  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
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

      {/* Email */}
      <View style={styles.InputContainer}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.h2Text}>Email</Text>
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
              secureTextEntry={showpass}
            />
            {/* showpass img code */}
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

      {/* Error Message Below  */}
      {/* <Text style={{alignSelf: 'center', fontWeight: '700'}}>{message}</Text> */}

      <View style={styles.btnContainer}>
        {/* Login Btn */}
        <Btn
          bgColor="#f5ce0c"
          textColor="#030303"
          btnLabel="Log In"
          press={() => {
            handleLogin();
          }}
        />
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text style={styles.footerText}>New User ? </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Signup');
            }}>
            <Text style={[styles.footerText, {color: '#000'}]}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

{
  /* CSS */
}
const styles = StyleSheet.create({
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
    margin: 10,
    backgroundColor: '#fff',
  },
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
