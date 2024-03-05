import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import images from "../constant/images";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constant/theme";

const Welcome = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  
  return (
    <SafeAreaView>
      <View>
        <Image source={images.logo} style={{ width: 530, 
              height: 400, marginTop: 240, alignItems: "center",}} />
      </View>
      <View
        style={{
          // backgroundColor: "red",
          // justifyContent: "center",
          alignItems: "center",
          height,
          paddingHorizontal: 15,
          // paddingVertical: 0,
          marginTop: -205,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: 90,
              marginBottom: 5,
              fontSize: 45,
              paddingRight: 11,
              fontWeight: "bold",
            
            }}
          >
            Schedler
          </Text>
          {/* <Text
            style={{ fontSize: 30, color: COLORS.yellow, fontWeight: "bold" }}
          >
            Ler
          </Text> */}
        </View>

        {/* <Text
          style={{
            // marginTop: 50,
              marginBottom: -40,
              fontSize: 35,
              paddingRight: 10,
              fontWeight: "bold",
          }}
        >
          Sched it!
        </Text> */}
        {/* <Text style={{ marginBottom: 25, fontWeight: "bold" }}>
          - Ben Casnocha
        </Text> */}

        <CustomButton
          matNameIcon="schedule-send"
          onPress={() => {
            navigation.navigate("Home");
          }}
          iconColor={COLORS.white}
        />

{/* <Text
          style={{
            marginTop: -50,
              // marginBottom: -40,
              fontSize: 35,
              paddingRight: 10,
              fontWeight: "bold",
          }}
        >
          Sched it!
        </Text> */}
        
      </View>
      
    </SafeAreaView>
  );
};

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CustomButton:{
    paddingRight: 10,
  }
});

export default Welcome;
