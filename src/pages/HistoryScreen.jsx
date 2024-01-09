import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HistoryScreen = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const querySnapshot = await firestore().collection('MeterData').get();
      const dataArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyData(dataArray); // Set state with the array of data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.heading}>History</Text>
      {myData.length > 0 ? (
        myData.map(dataItem => (
          <View key={dataItem.id} style={styles.container}>
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Meter No.:</Text>
                <Text style={styles.value}>{dataItem.MeterNumber}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Meter Reading:</Text>
                <Text style={styles.value}>{dataItem.MeterReading}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>{dataItem.time}</Text>
              </View>
            </View>
            {dataItem.base64Data && (
              <Image
                style={styles.image}
                source={{
                  uri: `data:image/jpeg;base64,${dataItem.base64Data}`,
                }}
              />
            )}
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Empty...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  container: {
    marginTop: 10,
    backgroundColor: '#99d466',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5,
  },
  value: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '40%',
  },
});

export default HistoryScreen;
