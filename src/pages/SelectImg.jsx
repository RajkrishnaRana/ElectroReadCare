import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import ImageResizer from 'react-native-image-resizer'; // Import the library

const SelectImg = ({navigation, route}) => {
  const {value, MeterInput} = route.params;
  const [base64Data, setBase64Data] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const imageToBase64 = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, async result => {
      if (result?.assets && result.assets.length > 0) {
        // Resize the image before setting the base64 data
        const resizedImage = await resizeImage(result.assets[0].uri);
        console.log(result.assets[0].base64.length);
        const base64new = await imageToBase64(resizedImage.uri);
        console.log(base64new.length);
        setBase64Data(base64new);
        setImgUrl(result.assets[0]?.uri);
      }
    });
  };

  const resizeImage = async uri => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        400,
        400,
        'JPEG',
        80,
      );
      return {uri: resizedImage.uri};
    } catch (error) {
      console.error('Error resizing image:', error);
      return {uri, base64: ''};
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Result', {
      value,
      base64Data,
      MeterInput,
      imgUrl,
      setImgUrl,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.outContainer}>
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
            Upload Your Electricity Meter Reading
          </Text>
          <Toast ref={ref => Toast.setRef(ref)} />
        </View>
        <View style={styles.btnContainer}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{
              uri: imgUrl
                ? imgUrl
                : 'https://cdn-icons-png.flaticon.com/512/8619/8619059.png',
            }}
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
            if (base64Data.length === 0) {
              Toast.show({
                type: 'error',
                text1: '!  Alert',
                text2: 'Take a photo and try again',
                autoHide: true,
                position: 'top',
                topOffset: 0,
              });
            } else {
              handleSubmit();
            }
          }}
          style={styles.galleryButton}>
          <Text style={{color: '#f7a602', fontWeight: 'bold', fontSize: 20}}>
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
    backgroundColor: '#f7ae02',
    marginTop: 50,
    borderRadius: 40,
    alignItems: 'center',
  },
});

export default SelectImg;
