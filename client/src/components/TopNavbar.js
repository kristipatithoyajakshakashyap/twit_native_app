import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import logo from "../../assets/logo.jpg";
import { icon1, logo2 } from "../commoncss/pagecss";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const TopNavbar = ({ navigation, page }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="add-a-photo"
        size={24}
        style={icon1}
        onPress={() => navigation.navigate("AddPost")}
      />
      <Image source={logo} style={logo2} />
      {page == "MainPage" && (
        <MaterialCommunityIcons
          name="chat-outline"
          size={24}
          style={icon1}
          onPress={() => navigation.navigate("All_Chats")}
        />
      )}
      {page == "My_UserProfile" && (
        <Ionicons
          name="settings-sharp"
          size={24}
          style={icon1}
          onPress={() => navigation.navigate("Settings1")}
        />
      )}
    </View>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    position: "absolute",
    top: 0,
    zIndex: 100,
    backgroundColor: "#111111",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
