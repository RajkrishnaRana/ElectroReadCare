import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const SelectImg = ({navigation, route}) => {
  const {value, MeterInput} = route.params;
  const [imgUrl, setImgUrl] = useState(
    'https://cdn-icons-png.flaticon.com/512/8619/8619059.png',
  );

  const openCamera = async () => {
    const result = await launchCamera();
    setImgUrl(result?.assets[0]?.uri);
    console.log('Result ========>', result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.outContainer}>
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
            Upload Your Electricity Meter Reading
          </Text>
          <Text></Text>
        </View>
        <View style={styles.btnContainer}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{uri: imgUrl}}
          />
          <View style={{marginTop: 0, marginBottom: 25, alignItems: 'center'}}>
            <Text style={styles.imgText}>Take a clear image of your Meter</Text>
            <Text style={styles.imgText}>You can take a photo either</Text>
            <Text style={styles.imgText}>select photo from your gallery</Text>
          </View>
          <TouchableOpacity onPress={openCamera} style={styles.camButton}>
            <Text style={styles.camText}>📸 Take Photo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Result', {value, imgUrl, MeterInput});
          }}
          style={styles.galleryButton}>
          <Text style={{color: '#f5ce0c', fontWeight: 'bold', fontSize: 20}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  camButton: {
    backgroundColor: '#FFF',
    borderRadius: 100,
    alignItems: 'center',
    width: 200,
    marginBottom: 0,
    marginTop: 40,
    paddingVertical: 10,
  },
  camText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  img: {
    height: 200,
    width: 200,
  },
  imgText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
  galleryButton: {
    backgroundColor: '#030303',
    borderRadius: 100,
    alignItems: 'center',
    width: 200,
    marginBottom: 0,
    marginTop: 10,
    paddingVertical: 10,
  },
  btnContainer: {
    height: 450,
    width: 300,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
    marginBottom: 30,
    borderStyle: 'dashed',
  },
  outContainer: {
    height: 800,
    width: 385,
    backgroundColor: '#f5ce0c',
    marginTop: 50,
    borderRadius: 40,
    alignItems: 'center',
  },
});

export default SelectImg;
