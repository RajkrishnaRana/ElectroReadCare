import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';

let db = openDatabase({name: 'UserDatabase1.db'});

const SqlLite = ({navigation}) => {
  let userList = [];
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, [refreshing, isFocused]);

  const handleRefresh = prev => {
    setRefreshing(!prev);
  };

  const getData = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (tex, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          //console.log(res.rows.item(i));
          userList.push(res.rows.item(i));
        }
      });
    });
  };

  const deleteItem = id => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM table_user where user_id=?',
        [id],
        (tx, res) => {
          getData();
          handleRefresh();
        },
      );
    });
  };

  return (
    <View style={{flex: 1}}>
      <Text>SqlLite</Text>
      <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
            <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
              {/* <Text style={{fontSize: 50}}>{item.user_id}</Text>; */}
              <View>
                <Text>{'Name: ' + item.user_name}</Text>
                <Text>{'Mobile No: ' + item.user_contact}</Text>
                <Text>{'Email: ' + item.user_email}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteItem(item.user_id)}>
                <Text style={{fontSize: 20, color: '#555'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity>
        <Text
          style={{fontSize: 40}}
          onPress={() => navigation.navigate('TempEmail')}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SqlLite;
