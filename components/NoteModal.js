import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonIcon from "./CustomButtonIcon";
import { COLORS } from "../constant/theme";
const NoteModal = ({
  visible,
  onClose,
  onSubmit,
  notes,
  isEdit,
  navigation,
}) => {
  const [noteTitle, setnoteTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isEdit) {
      setnoteTitle(notes.noteTitle);
      setNote(notes.note);
    }
  }, [isEdit]);

  const handleCloseModal = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setnoteTitle(text);
    if (valueFor === "note") setNote(text);
  };

  //   console.log(noteTitle);
  //   console.log(note);

  const handleSubmit = () => {
    if (!noteTitle.trim() && !note.trim()) return onClose();
    if (isEdit) {
      // for editing note
      onSubmit(noteTitle, note, Date.now());
    } else {
      onSubmit(noteTitle, note);
      setnoteTitle("");
      setNote("");
    }

    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setnoteTitle("");
      setNote("");
    }
    onClose();
  };

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomButtonIcon
              antNameIcon="arrowleft"
              iconSize={25}
              iconColor={COLORS.primary}
              style={{
                backgroundColor: COLORS.white,
                // backgroundColor: "red",
                paddingVertical: 15,
                paddingHorizontal: 5,
                width: 50,
                elevation: 0,
                marginBottom: 10,
              }}
              onPress={onClose}
            />
            {noteTitle.trim() && note.trim() ? (
              <TouchableOpacity onPress={handleSubmit}>
                <Text
                  style={{
                    fontSize: 25,
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    //   backgroundColor: "red",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={closeModal}>
                <Text
                  style={{
                    fontSize: 25,
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    //   backgroundColor: "red",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{ borderTopWidth: 1, paddingVertical: 15, marginBottom: 15 }}
          >
            <Text
            style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    paddingVertical: 15,
                    //   backgroundColor: "red",
                  }}
                  >
                  Add Agenda</Text>
          </View>
          <TextInput
            value={noteTitle}
            placeholder="Your title"
            style={[styles.modalInput, styles.noteTitle]}
            onChangeText={(text) => {
              handleOnChangeText(text, "title");
            }}
          />
          <TextInput
            value={note}
            multiline
            placeholder="Description"
            style={[styles.modalInput, styles.note]}
            onChangeText={(text) => {
              handleOnChangeText(text, "note");
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View
            style={[styles.invisibleButton, StyleSheet.absoluteFillObject]}
          ></View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default NoteModal;

const styles = StyleSheet.create({
  modalInput: {
    // borderBottomWidth: 1,
    fontSize: 100,
    
  },
  noteTitle: {
    height: 40,
    // borderTopWidth: 1,
    marginTop: -25,
    marginBottom: 15,
    fontSize: 27,
    fontWeight: "bold",
  },
  note: {
  height: 860, // Adjust the height based on your needs
  fontSize: 22,
  paddingVertical: 10,
  paddingTop: 15, // Adjust this value to move the placeholder text up or down
  textAlignVertical: 'top',
  },
  invisibleButton: {
    flex: 1,
    zIndex: -1,
    // backgroundColor: "red",
  }
});
