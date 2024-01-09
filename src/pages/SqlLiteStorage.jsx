import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Btn from '../components/Btn';

let db = openDatabase({name: 'UserDatabase2.db'});

const SqlLiteStorage = ({navigation}) => {
  let dataList = [];
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, [refreshing]);

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM meter_reading_data', [], (tex, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i));
          dataList.push(res.rows.item(i));
        }
        setData(dataList);
      });
    });
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
                  source={{uri: item.imgUrl}}
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

export default SqlLiteStorage;
