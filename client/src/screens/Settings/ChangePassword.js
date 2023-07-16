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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  formHead2,
  formInput,
  formTextLinkRight,
  formbtn,
} from "../../commoncss/formcss";

const ChangePassword = ({ navigation }) => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = () => {
    if (oldpassword === "" || newpassword === "" || confirmNewPassword === "") {
      alert("Please fill all the fields");
    } else if (newpassword !== confirmNewPassword) {
      alert("New password and confirm new password must be same");
    } else {
      setLoading(true);
      AsyncStorage.getItem("user").then((value) => {
        fetch(`http://192.168.168.180:3000/changepassword`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(value).token,
          },
          body: JSON.stringify({
            email: JSON.parse(value).user.email,
            oldpassword: oldpassword,
            newpassword: newpassword,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message == "Password Changed Successfully") {
              setLoading(false);
              alert("Password Changed Successfully");
              AsyncStorage.removeItem("user");
              navigation.navigate("Login");
            } else {
              alert("Wrong Password");
              setLoading(false);
            }
          });
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
      <Text style={formHead2}>Choose a strong Password</Text>
      <TextInput
        placeholder="Enter old password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text) => setOldpassword(text)}
      />
      <TextInput
        placeholder="Choose a password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text) => setNewpassword(text)}
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmNewPassword(text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate("ForgotPassword_EnterEmail")}
      >
        Forgot Password ?
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePasswordChange()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
