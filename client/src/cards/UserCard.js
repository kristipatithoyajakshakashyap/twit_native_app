import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import nopic from "../../assets/nopic.png";
const UserCard = ({ user, navigation }) => {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Other_UserProfile',{user:user})
    }}>
      <View style={styles.chatCard}>
        {user.profilepic ? (
          <Image source={{ uri: user.profilepic }} style={styles.image} />
        ) : (
          <Image source={nopic} style={styles.image} />
        )}
        <View style={styles.c1}>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  chatCard: {
    width: "100%",
    backgroundColor: "#111111",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  c1: {
    marginLeft: 20,
  },
});
