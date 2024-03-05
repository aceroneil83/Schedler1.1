import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constant/theme";
import { MaterialIcons } from '@expo/vector-icons';
export default function CustomButton({
  antNameIcon,
  matNameIcon,
  iconSize,
  iconColor,
  style,
  onPress,
}) {
  return (
    <AntDesign
      style={[CustomButtonStyles.icon, { ...style }]}
      name={antNameIcon}
      size={iconSize || 35}
      color={iconColor || COLORS.lightWhite}
      onPress={onPress}
    />
  );
}

CustomButtonStyles = StyleSheet.create({
  icon: {
    backgroundColor: COLORS.color5,
    marginTop: 10,
    paddingHorizontal: 125,
    paddingVertical: 15,
    borderRadius: 50,
    // elevation: 8,
  },
});
