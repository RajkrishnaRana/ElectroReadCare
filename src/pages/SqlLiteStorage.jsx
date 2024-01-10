import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Btn from '../components/Btn';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

let db = openDatabase({name: 'UserDatabase2.db'});

const SqlLiteStorage = ({navigation}) => {
  let dataList = [];
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [conncetionStatus, setConnectionStatus] = useState(false);

  const handleNetworkChange = state => {
    setConnectionStatus(state.isConnected);
  };

  useEffect(() => {
    getData();
  }, [refreshing]);

  useEffect(() => {
    NetInfo.addEventListener(handleNetworkChange);
  }, []);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM meter_reading_data', [], (tex, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          dataList.push(res.rows.item(i));
        }
        setData(dataList);
      });
    });
  };

  const upload = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM meter_reading_data',
        [],
        async (tex, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            const readingValue = {
              time: res.rows.item(i).time,
              MeterNumber: res.rows.item(i).MeterNumber,
              MeterReading: res.rows.item(i).MeterReading,
              base64Data: res.rows.item(i).imgUrl,
            };
            await firestore().collection('MeterData').doc().set(readingValue);
            console.log(readingValue);
          }
        },
      );
    });
    deleteFromData();
    Alert.alert('You have successfully uploaded the data');
    navigation.navigate('Home');
  };

  const deleteFromData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM meter_reading_data',
        [],
        async (tex, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            txn.executeSql(
              `DELETE FROM meter_reading_data WHERE time = '${
                res.rows.item(i).time
              }'`,
            );
          }
        },
      );
    });
    onRefresh();
  };

  const offlineOrOnline = () => {
    if (conncetionStatus) {
      upload();
    } else {
      Alert.alert('You are offline');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{flex: 1, margin: 10}}>
      <View style={styles.readingContainer}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#222'}}>
          Pending Data to upload : {data.length}
        </Text>
      </View>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({item, index}) => {
          return (
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
                  source={{uri: `data:image/jpeg;base64,${item.imgUrl}`}}
                />
              </View>
            </View>
          );
        }}
      />
      <View style={styles.btnContainer}>
        <Btn
          bgColor="#222"
          textColor="#f7ae02"
          btnLabel="Upload"
          customWidth={350}
          press={() => {
            offlineOrOnline();
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

export default SqlLiteStorage;
