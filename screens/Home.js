import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MakeNote from "../components/MakeNote";
import NoteModal from "../components/NoteModal";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/CustomButton";
import FontLoader from "../components/FontLoader";
import { COLORS } from "../constant/theme";
import animations from "../constant/animations";
import { useNotes } from "../provider/NotesProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import CustomButtonIcon from "../components/CustomButtonIcon";
import NotFound from "../components/NotFound";

export default function Home({ navigation }) {
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const { noteLists, setnoteLists, getNotes } = useNotes();
  const [searchQuery, setsearchQuery] = useState("");
  const [searchNotFound, setsearchNotFound] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = date.toLocaleDateString();
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };
    
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const dynamicWelcomeMsg = () => {
    const currentHour = new Date().getHours();
    if (currentHour === 0 || currentHour < 12) return setWelcomeMsg("Morning");
    if (currentHour === 13 || currentHour < 18)
      return setWelcomeMsg("Afternoon");

    setWelcomeMsg("Evening");
  };

  const handleOnSubmit = async (noteTitle, note) => {
    const eachNote = { id: Date.now(), noteTitle, note, time: Date.now() };
    const updatedNoteLists = [...noteLists, eachNote];
    setnoteLists(updatedNoteLists);
    await AsyncStorage.setItem("noteLists", JSON.stringify(updatedNoteLists));
  };

  useEffect(() => {
    dynamicWelcomeMsg();
  }, []);

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };

  const handleOnSearchInput = async (text) => {
    setsearchQuery(text);
    if (!text.trim()) {
      setsearchQuery("");
      setsearchNotFound(false);
      return await getNotes();
    }
    console.log(text);
    console.log(noteLists);
    const filteredNotes = noteLists.filter((note) => {
      if (note.noteTitle.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setnoteLists([...filteredNotes]);
    } else {
      setsearchNotFound(true);
    }
  };

  const handleClear = async () => {
    setsearchQuery("");
    setsearchNotFound(false);
    await getNotes();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FontLoader>
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 20,
            // backgroundColor: "green",
          }}
        >
           <Text style={homeStyles.currentTime}>{currentTime}</Text>
          <Text style={homeStyles.currentDate}>{currentDate}</Text>
          
          <Text
            style={{
              marginTop: -5,
              marginBottom: 10,
              fontSize: 38,
              color: COLORS.color4,
              fontFamily: "LeagueSpartan_700Bold",
            }}
          >
            {`Good ${welcomeMsg}! `}
          </Text>
          
          <View style={homeStyles.underline} />
          {/* <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 30,
              color: COLORS.color4,
              fontFamily: "LeagueSpartan_700Bold",
            }}
          >
            {`Good ${welcomeMsg}! `}
          </Text> */}
            <View style={{ paddingTop: 20 }}></View>
          <SearchBar
            value={searchQuery}
            onChangeText={handleOnSearchInput}
            onClear={handleClear}
          />
          <Text
            style={{
              marginTop: 1,
              marginBottom: 10,
              fontSize: 38,
              color: COLORS.color4,
              fontFamily: "LeagueSpartan_700Bold",
            }}
          >
           Schedule:
          </Text>

          {searchNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={noteLists}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MakeNote onPress={() => openNote(item)} item={item} />
              )}
            />
          )}
          {!noteLists.length ? (
            <LottieView
              source={animations.empty}
              loop
              style={homeStyles.emptyNoteAnimation}
              resizeMode="center"
              autoPlay
            />
          ) : null}

          <View style={homeStyles.noNoteContainer}>
            <CustomButtonIcon
              onPress={() => {
                setmodalVisible(true);
              }}
              antNameIcon="plus"
              style={homeStyles.addNote}
            />
          </View>
          <NoteModal
            visible={modalVisible}
            onClose={() => {
              setmodalVisible(false);
            }}
            onSubmit={handleOnSubmit}
          />
        </SafeAreaView>
      </FontLoader>
    </TouchableWithoutFeedback>
  );
}

const homeStyles = StyleSheet.create({
  noNoteContainer: {
    flex: 1,
  },
  emptyNoteAnimation: {
    flex: 1,
    paddingVertical: 20,
    marginBottom: 110,
  },
  addNote: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    position: "absolute",
    left: 207.5,
    bottom: 0,
    // borderTopLeftRadius: 50,
    borderRadius: 50,
  },
  currentTime: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: -20, 
    paddingRight: 410,
    fontFamily: "LeagueSpartan_400Regular",
    color: COLORS.color4,
  },
  currentDate: {
    marginTop: -8,
    fontSize: 35, 
    color: COLORS.color4,
    paddingRight: 380,
    fontFamily: "LeagueSpartan_700Bold",
  },
  underline: {
    borderBottomWidth: 2,
    borderColor: COLORS.color4, // Adjust color as needed
    width: 510, // Adjust width as needed
    marginTop: 0, // Adjust spacing as needed
  },
});
