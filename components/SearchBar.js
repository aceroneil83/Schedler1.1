import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/theme";
import { AntDesign } from "@expo/vector-icons";
const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View>
      <TextInput
        placeholder="Enter keyword"
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={COLORS.primary}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: 500,
    borderWidth: 1,
    marginLeft: 5,
    // paddingRight: 20,
    borderColor: COLORS.color4,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 35,
    fontSize: 20,
  },
  clearIcon: {
    position: "absolute",
    fontSize: 21,
    right: 18,
    top: 15,
  },
});
export default SearchBar;
