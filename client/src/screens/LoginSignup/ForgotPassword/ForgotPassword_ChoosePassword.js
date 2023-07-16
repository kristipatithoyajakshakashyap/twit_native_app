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

const ForgotPassword_ChoosePassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = () => {
    if (password === "" || confirmPassword === "") {
      alert("Please enter password");
    } else if (password !== confirmPassword) {
      alert("Password does not match");
    } else {
      setLoading(true);
      fetch(`http://192.168.168.180:3000/resetPassword`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Password Changes Successfully") {
            setLoading(false);
            alert(data.message);
            navigation.navigate("ForgotPassword_AccountRecovered");
          } else {
            setLoading(false);
            alert(data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
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
      <Text style={formHead2}>Choose a strong Password</Text>
      <TextInput
        placeholder="Choose a password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePassword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword_ChoosePassword;

const styles = StyleSheet.create({});
