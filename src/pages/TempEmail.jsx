import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase1.db'});

const TempEmail = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 1-query 2 - values inside array 3 - callback method for response
  // callback method is optional
  // if values inside arr isn't present then we have to give empty array
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact VARCHAR(10), user_email VARCHAR(255))',
              [],
            );
          } else {
            console.log('Already created table');
          }
        },
      );
    });
  }, []);

  const saveData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO table_user(user_name, user_contact, user_email) VALUES (?,?,?)',
        [name, phone, email],
        (tex, res) => {
          if (res.rowsAffected == 1) {
            props.navigation.navigate('SqlLite');
            console.log(res);
          } else {
            console.log('some err happened');
          }
        },
        err => {
          console.log(err);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center', marginBottom: 20}}>
        <Text style={styles.headerText}>Temp Email!</Text>
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
        </View>

        <View style={styles.btnContainer}>
          {/* <Btn
            bgColor="#030303"
            textColor="#FFF"
            btnLabel="Sign Up"
            press={props.navigation.navigate('SqlLite')}
          /> */}

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => {
                saveData();
                //props.navigation.navigate('SqlLite');
              }}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>Save</Text>
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

export default TempEmail;
