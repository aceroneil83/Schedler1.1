import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NoteContext = createContext();
const NotesProvider = ({ children }) => {
  const [noteLists, setnoteLists] = useState([]);

  const getNotes = async () => {
    const result = await AsyncStorage.getItem("noteLists");
    if (result !== null) {
      setnoteLists(JSON.parse(result));
    } else {
      setnoteLists([]);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ noteLists, setnoteLists, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
export default NotesProvider;
