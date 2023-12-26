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
      const data = await firestore().collection('meterReading').doc('1').get();
      console.log(data);
      setMyData(data._data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text> Name: {myData ? myData.reading : 'Loading...'} </Text>
      <Text> Name: {myData ? myData.name : 'Loading...'} </Text>
      {/* <Text> Name: {myData ? myData.age : 'Loading...'} </Text> */}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
