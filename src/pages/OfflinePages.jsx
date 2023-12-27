import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfflinePages = () => {
  const [data, setData] = useState([]);

  //Get Stored data
  const storageData = async () => {
    const result = await AsyncStorage.getItem('value');
    if (result) {
      setData(JSON.parse(result)); // Parse stringified data if necessary
    } else {
      setData([]); // Handle missing data
    }
  };

  //Delete Items
  const handleDelete = async time => {
    const result = await AsyncStorage.getItem('value');
    let values = [];
    if (result !== null) values = JSON.parse(result);

    const newValue = values.filter(n => n.time !== time);
    await AsyncStorage.setItem('value', JSON.stringify(newValue));
    console.log(newValue);
  };

  useEffect(() => {
    storageData();
  }, [handleDelete]);

  return (
    <ScrollView style={{margin: 10}}>
      <View>
        <Text>Your Records</Text>
      </View>
      {data.map(item => (
        <View key={item.id} style={styles.container}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              TimeStamp: {item.time}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Meter Number : {item.value}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Meter Value: {item.MeterReading}
            </Text>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={{uri: item.imageUrl}}
            />
          </View>
          <View style={styles.delContainer}>
            <TouchableOpacity style={styles.btnStyle} onPress={handleDelete}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
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
  },
  img: {
    height: 100,
    width: 100,
    marginTop: 10,
  },
  btnStyle: {
    height: 60,
    width: 60,
    backgroundColor: '#f50707',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
});

export default OfflinePages;
