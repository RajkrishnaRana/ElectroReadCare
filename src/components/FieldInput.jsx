import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React, {useState} from 'react';

const FieldInput = ({placeholder, keyboard, customValue}) => {
  return (
    <View style={styles.sectionStyle}>
      <Image
        style={{height: 20, width: 20, marginLeft: 10}}
        source={require(`../assets/user.png`)}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboard}
        value={customValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#424242',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0d50c',
    borderRadius: 50,
    height: 50,
    margin: 10,
    backgroundColor: '#fff',
  },
});

export default FieldInput;
