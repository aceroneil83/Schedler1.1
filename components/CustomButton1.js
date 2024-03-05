// CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constant/theme';

const CustomButton1 = ({ onPress, antNameIcon, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {antNameIcon && <AntDesign name={antNameIcon} size={30} color={COLORS.color4} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue', // Adjust the background color as needed
    borderRadius: 10,
    padding: 10,
  },
});

export default CustomButton1;
