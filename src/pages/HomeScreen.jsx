import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Btn from '../components/Btn';
// import {TextInput} from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';

const data = [
  {label: 'Meter 1 [22123A]', value: '1'},
  {label: 'Meter 2 [22124B]', value: '2'},
  {label: 'Meter 3 [22125C]', value: '3'},
  {label: 'Meter 4 [22126D]', value: '4'},
  {label: 'Meter 5 [22127E]', value: '5'},
  {label: 'Meter 6 [22128F]', value: '6'},
  {label: 'Meter 7 [22129G]', value: '7'},
];

const HomeScreen = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [MeterInput, setMeterInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 30}}>
        <Image
          style={styles.imgContainer}
          source={require('../assets/Electro-Service-Logo-N.webp')}
        />
        <View style={styles.logoText}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#d65231'}}>
            Select Your Meter &
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#f7ae02'}}>
            Enter Your Meter Reading
          </Text>
        </View>
      </View>
      <View style={styles.dropdownAround}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Meter No.' : '...'}
          searchPlaceholder="Search..."
          Label={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.label);
            setIsFocus(false);
          }}
        />

        <TextInput
          style={styles.input}
          value={MeterInput}
          keyboardType="numeric"
          onChangeText={setMeterInput}
          placeholder="Enter Meter Reading..."></TextInput>

        <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 50,
            alignItems: 'center',
            borderWidth: 3,
            borderColor: 'yellow',
          }}
          onPress={() => {
            MeterInput.length === 6
              ? props.navigation.navigate('SelectImg', {value, MeterInput})
              : Alert.alert('Please Enter a valid Meter Input of 6 digit');
          }}>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
              fontSize: 20,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyContainer}>
        <Btn
          bgColor="#0F3460"
          textColor="#fff"
          btnLabel="HISTORY"
          customWidth={300}
          press={() => {
            props.navigation.navigate('History');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  dropdownAround: {
    backgroundColor: '#f7ae02',
    padding: 20,
    borderRadius: 50,
    marginTop: '10%',
  },
  historyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    height: 50,
    padding: 10,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 35,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  dropdown: {
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 35,
    marginTop: 25,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imgContainer: {
    width: 100,
    height: 100,
  },
  logoText: {
    marginTop: 30,
    alignItems: 'center',
  },
});
