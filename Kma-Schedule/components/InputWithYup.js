
import React from 'react';
import { View, Text } from 'react-native';
import {  Form, Item, Input, Label } from 'native-base';

export default InputWithYup = ({ label, formikKey, value, handleChange, handleBlur, error, touched }) => {
  const inputStyles = {
    borderBottomColor:'#272F5E',
    borderBottomWidth:1.5,
    marginTop:10
  };

  if (touched && error) {
    inputStyles.borderBottomColor = 'red';
  }

  return (
    <View >
      <Item stackedLabel style={inputStyles}>
      <Label>{label}</Label>
        <Input
          name={formikKey}
          value={value}
          onChangeText={handleChange(formikKey)}
          onBlur={handleBlur(formikKey)} />
        </Item>
      <Text style={{ color: 'red' }}>{ touched && error }</Text>
  </View>
  )
}