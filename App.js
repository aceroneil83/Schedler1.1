import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDetails from "./components/NoteDetails";
import NotesProvider from "./provider/NotesProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NotesProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NoteDetails"
            component={NoteDetails}
            options={{ headerTitle: "", headerTransparent: true }}
          />
        </Stack.Navigator>
      </NotesProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
