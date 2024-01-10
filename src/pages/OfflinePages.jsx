import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Btn from '../components/Btn';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';

const OfflinePages = ({}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    storageData();
    isOnline();
  }, [refreshing]);

  //Get Stored data
  const storageData = async () => {
    const result = await AsyncStorage.getItem('value');
    if (result) {
      setData(JSON.parse(result)); // Parse stringified data if necessary
    } else {
      setData([]); // Handle missing data
    }
  };

  const isOnline = () => {
    netInfo.then(connectionInfo => {
      if (connectionInfo.isConnected) {
        Alert.alert('You are online');
      } else {
        Alert.alert('you are offline');
      }
    });
  };

  const netInfo = NetInfo.fetch();

  const upload = () => {
    netInfo.then(connectionInfo => {
      if (connectionInfo.isConnected) {
        data.map(async item => {
          //console.log(item);
          await firestore().collection('MeterData').doc().set(item);
        });
        AsyncStorage.clear();
        setData([]);
      } else {
        Alert.alert('you are offline');
      }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{margin: 10, flex: 1}}>
      <View style={styles.readingContainer}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#222'}}>
          Pending Data to upload : {data.length}
        </Text>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {data.map(item => (
          <View key={item.id} style={styles.container}>
            <View style={{margin: 'auto', width: 260}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                TimeStamp: {item.time}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Meter Number : {item.MeterNumber}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Meter Value: {item.MeterReading}
              </Text>
            </View>
            <View style={{}}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={{
                  uri: `data:image/jpeg;base64,${item.base64Data}`,
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.btnContainer}>
        <Btn
          bgColor="#222"
          textColor="#f7ae02"
          btnLabel="Upload"
          customWidth={350}
          press={() => {
            upload();
          }}
        />
      </View>
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
  readingContainer: {
    backgroundColor: '#f7ae02',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    position: 'relative',
    zIndex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    zIndex: 0,
  },
});

export default OfflinePages;
