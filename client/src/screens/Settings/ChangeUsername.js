import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { containerFull, goback, logo1 } from "../../commoncss/pagecss";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/logo.jpg";
import { formHead2, formInput, formbtn } from "../../commoncss/formcss";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ChangeUsername = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsername = () => {
    if (username == "") {
      alert("Please Enter Username");
    } else {
      setLoading(true);
      AsyncStorage.getItem("user")
        .then((value) => {
          fetch(`http://192.168.168.180:3000/setusername`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: JSON.parse(value).user.email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "Username updated") {
                setLoading(false);
                alert("Username has been set successfully");
                navigation.navigate("Settings1");
              } else if (data.error === "Invalid Credentials") {
                alert("Invalid Credentials");
                setLoading(false);
                AsyncStorage.removeItem("user");
                navigation.navigate("Login");
              } else {
                setLoading(false);
                alert("Username already exists");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          alert("Serve error");
          setLoading(false);
        });
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings1")}
        style={goback}
      >
        <Ionicons name="arrow-back" size={24} color="gray" />
        <Text
          style={{
            color: "gray",
            fontSize: 16,
            marginLeft: 5,
            fontWeight: "bold",
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={logo} style={logo1} />
      <Text style={formHead2}>Choose Username</Text>
      <TextInput
        placeholder="Enter a username"
        style={formInput}
        onChangeText={(text) => setUsername(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({});
