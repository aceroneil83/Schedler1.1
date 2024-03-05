import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/theme";

const MakeNote = ({ item, onPress }) => {
  const { noteTitle, note } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={makeNotesStyles.note}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "bold",
            color: COLORS.color4,
            fontSize: 30,
            paddingBottom: 5,
          }}
        >
          {noteTitle}
        </Text>
        <Text numberOfLines={3} style={{ fontSize: 20, color: COLORS.lightWhite }}>
          {note}
        </Text>
        <Text
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: COLORS.color5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            color: COLORS.color4,
          }}
        >
           
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MakeNote;

const makeNotesStyles = StyleSheet.create({
  note: {
    backgroundColor: COLORS.color5,
    paddingHorizontal: 25,
    paddingVertical: 30,
    marginTop: 10,
    // flex: 1,
    borderRadius: 15,
    // marginRight: 10,
  },
});
