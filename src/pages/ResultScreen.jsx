import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Btn from '../components/Btn';

const ResultScreen = ({route, navigation}) => {
  const {value, imgUrl, MeterInput} = route.params;
  const handleClick = () => {};

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
        <Image resizeMode="contain" style={styles.img} source={{uri: imgUrl}} />
      </View>
      <View style={styles.btnContainer}>
        <Text style={{fontSize: 12, color: '#222'}}>
          *After Confirm your data will upload to the database
        </Text>
        <Btn
          bgColor="#222"
          textColor="#f5ce0c"
          btnLabel="Confirm"
          customWidth={350}
          press={() => {
            navigation.navigate('Home');
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
    marginTop: 100,
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  readingContainer: {
    marginTop: 30,
    backgroundColor: '#f5ce0c',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  imgContainer: {
    marginTop: 20,
    backgroundColor: '#f5ce0c',
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
