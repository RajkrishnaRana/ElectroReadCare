import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const HistoryScreen = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await firestore().collection('MeterData').doc('1').get();
      console.log(data);
      setMyData(data._data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text> Meter No.: {myData ? myData.MeterReading : 'Loading...'} </Text>
      <Text> Reading: {myData ? myData.MeterReading : 'Loading...'} </Text>
      {/* <Text> Name: {myData ? myData.age : 'Loading...'} </Text> */}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
