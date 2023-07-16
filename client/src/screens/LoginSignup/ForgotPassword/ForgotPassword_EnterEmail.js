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

const ForgotPassword_EnterEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmail = () => {
    if (email === "") {
      alert("Please enter email")
    } else {
      setLoading(true)
     fetch(`http://192.168.168.180:3000/verifyfp`, {
       method: "post",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: email,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         if (data.error === "Invalid Credentials") {
           alert("Invalid Credentials");
           setLoading(false);
         } else if (data.message === "Verification Code Sent to your Email") {
           setLoading(false);
           alert(data.message);
           navigation.navigate("ForgotPassword_EnterVerificationCode", {
             useremail: data.email,
             userVerificationCode: data.VerificationCode,
           });
         }
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
      <Text style={formHead2}>verify your email</Text>
      <TextInput placeholder="Enter your Email" style={formInput} onChangeText={(text)=> setEmail(text)}/>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleEmail()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword_EnterEmail;

const styles = StyleSheet.create({});
