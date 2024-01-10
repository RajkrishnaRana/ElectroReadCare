import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-toast-message';

const db = openDatabase({name: 'UserDatabase2.db'});

const ResultScreen = ({route}) => {
  const navigation = useNavigation();
  const {value, base64Data, imgUrl, setImgUrl, MeterInput} = route.params;
  const [data, setData] = useState([]);
  const [conncetionStatus, setConnectionStatus] = useState(false);
  const image = imgUrl;

  const handleNetworkChange = state => {
    setConnectionStatus(state.isConnected);
  };

  useEffect(() => {
    //Initialize the Sql table for storing the data
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='meter_reading_data'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS meter_reading_data', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS meter_reading_data(user_id INTEGER PRIMARY KEY AUTOINCREMENT, time VARCHAR(255), imgUrl VARCHAR(1000000), MeterNumber VARCHAR(20), MeterReading VARCHAR(10))',
              [],
            );
          } else {
            console.log('Already created table');
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    //AsyncStorage.clear();
    setImgUrl('');
    findValue();
    NetInfo.addEventListener(handleNetworkChange);
  }, []);

  //Save data to the SQL Lite storage
  const saveData = () => {
    const times = new Date();
    const time = times.toLocaleString();
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO meter_reading_data(time, MeterNumber, imgUrl, MeterReading) VALUES (?,?,?,?)',
        [time, value, base64Data, MeterInput],
        (tex, res) => {
          if (res.rowsAffected == 1) {
            navigation.navigate('SqlStorage');
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

  const findValue = async () => {
    //Getting Data from async storage
    const result = await AsyncStorage.getItem('value');
    if (result !== null) setData(JSON.parse(result));
  };

  // When ONLINE ###########
  const handleClickOnline = async () => {
    // UPLOAD TO FIREBASE
    const times = new Date();
    const readingValue = {
      id: auth().currentUser.uid,
      time: times.toLocaleString(),
      date: Date.now(),
      MeterNumber: value,
      base64Data: base64Data,
      MeterReading: MeterInput,
    };
    await firestore().collection('MeterData').doc().set(readingValue);
    navigation.navigate('Home');
  };

  // When OFFLINE ############
  const handleClickOffline = async () => {
    // UPLOAD TO LOCAL STORAGE
    const times = new Date();
    const note = {
      id: Date.now(),
      time: times.toLocaleString(),
      MeterNumber: value,
      base64Data: base64Data,
      MeterReading: MeterInput,
    };

    //setting the old value with new value
    const updatedValue = [note, ...data];
    setData(updatedValue);
    //console.log(updatedValue);
    await AsyncStorage.setItem('value', JSON.stringify(updatedValue));
    navigation.navigate('offline');
  };

  const offlineOrOnline = () => {
    if (conncetionStatus) {
      handleClickOnline();
      //navigation.navigate('Home');
    } else {
      Alert.alert('You are offline, please save the data offline');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222'}}>
          Confirm Meter Reading
        </Text>
      </View>
      <View style={styles.readingContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222'}}>
          Your {value} Reading is:
        </Text>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#222'}}>
          {MeterInput}
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222'}}>
          Your Meter Photo:
        </Text>
        <Image resizeMode="contain" style={styles.img} source={{uri: image}} />
      </View>
      <View style={styles.btnContainer}>
        <Text style={{fontSize: 12, color: '#222'}}>
          *After Confirm your data will upload to the database
        </Text>
        <Btn
          bgColor="#222"
          textColor="#f7ae02"
          btnLabel="Confirm"
          customWidth={350}
          press={() => {
            offlineOrOnline();
          }}
        />
        <Btn
          bgColor="#222"
          textColor="#f7ae02"
          btnLabel="Offline Save"
          customWidth={350}
          press={() => {
            //handleClickOffline();
            saveData();
            navigation.dispatch(StackActions.replace('Home'));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  readingContainer: {
    marginTop: 30,
    backgroundColor: '#f7ae02',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  imgContainer: {
    marginTop: 20,
    backgroundColor: '#f7ae02',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    height: 200,
    width: 200,
    marginTop: 10,
  },
});

export default ResultScreen;
