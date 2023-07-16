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
import { containerFull, goback, logo1 } from "../../../commoncss/pagecss";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../../assets/logo.jpg";
import { formHead2, formInput, formbtn } from "../../../commoncss/formcss";
const Signup_ChooseUsername = ({ navigation, route }) => {
  const { email } = route.params;
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleUsername = () => {
    if (username == "") {
      alert("Please Enter Username");
    } else {
      setLoading(true);
      fetch(`http://192.168.168.180:3000/changeUsername`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Username Available") {
            setLoading(false);
            alert("Username has been set successfully");
            navigation.navigate("Signup_ChoosePassword", {
              email: email,
              username: username,
            });
          } else {
            setLoading(false);
            alert("Username already exists");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
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
      <Text style={formHead2}>Choose a Username</Text>
      <TextInput placeholder="Enter a username" style={formInput} onChangeText={(text)=> setUsername(text)}/>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_ChooseUsername;

const styles = StyleSheet.create({});
