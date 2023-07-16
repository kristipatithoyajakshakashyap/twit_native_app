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
import { formHead3, formInput, formbtn } from "../../../commoncss/formcss";

const ForgotPassword_EnterVerificationCode = ({ navigation, route }) => {
  const { useremail, userVerificationCode } = route.params;
  const [verificationCode, setVerificationCode] = useState();
  const handleVerificationCode = () => {
     if (verificationCode != userVerificationCode) {
       alert("Invalid Verification Code");
     } else {
       alert("Verification Code Matched");
       navigation.navigate("ForgotPassword_ChoosePassword", {
         email: useremail,
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
      <Text style={formHead3}>A verification code is sent to your email</Text>
      <TextInput
        placeholder="Enter a 6-digit code here"
        style={formInput}
        onChangeText={(text) => setVerificationCode(text)}
      />
      <Text
        style={formbtn}
        onPress={() => handleVerificationCode()}
      >
        Next
      </Text>
    </View>
  );
};

export default ForgotPassword_EnterVerificationCode;

const styles = StyleSheet.create({});
