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
      const querySnapshot = await firestore().collection('MeterData').get();
      const dataArray = [];
      querySnapshot.forEach(doc => {
        // Access individual document data using doc.data() method
        dataArray.push({id: doc.id, ...doc.data()});
      });
      setMyData(dataArray); // Set state with the array of data
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {myData.length > 0 ? (
        myData.map(dataItem => (
          <View key={dataItem.id} style={styles.container}>
            <View style={{margin: 'auto', width: 260}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Meter No.: {dataItem.MeterNumber}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Meter Reading: {dataItem.MeterReading}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Time : {dataItem.time}
              </Text>

              {/* Render other data fields similarly */}
            </View>
            {/* If you want an image, add similar image rendering */}
          </View>
        ))
      ) : (
        <Text
          style={{
            fontSize: 50,
            textAlign: 'center',
            marginTop: '90%',
          }}>
          Empty...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#f7ae02',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});

export default HistoryScreen;
