import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Btn = ({bgColor, btnLabel, textColor, press, customWidth}) => {
  return (
    <TouchableOpacity
      onPress={press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: customWidth ? customWidth : 200,
        marginBottom: 0,
        marginTop: 10,
        paddingVertical: 10,
      }}>
      <Text style={{color: textColor, fontSize: 22, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
