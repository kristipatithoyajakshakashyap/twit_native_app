import {
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

const Signup_ChoosePassword = ({ navigation, route }) => {
  const { email, username } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const handlePassword = () => {
    // navigation.navigate("Signup_AccountCreated")
    if (password === "" || confirmPassword === "") {
      alert("Please enter password")
    } else if (password !== confirmPassword) {
      alert("Passwords do not match")
    } else {
      setLoading(true)
      fetch(`http://192.168.168.180:3000/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          alert(data.message);
          navigation.navigate("Signup_AccountCreated");
        });
    }
  }
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
      <Text style={formHead2}>Choose a strong Password</Text>
      <TextInput
        placeholder="Choose a password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text)=> setPassword(text)}
        />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text)=> setConfirmPassword(text)}
      />
      <Text style={formbtn} onPress={() => handlePassword()}>
        Next
      </Text>
    </View>
  );
};

export default Signup_ChoosePassword;

const styles = StyleSheet.create({});
