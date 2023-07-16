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

const ChangeDescription = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDescription = () => {
    if (description == "") {
      alert("Please Enter Username");
    } else {
      setLoading(true);
      AsyncStorage.getItem("user")
        .then((value) => {
          fetch(`http://192.168.168.180:3000/setdescription`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: description,
              email: JSON.parse(value).user.email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "description updated") {
                setLoading(false);
                alert("Description has be set successfully");
                navigation.navigate("Settings1");
              } else if (data.error === "Invalid Credentials") {
                alert("Invalid Credentials");
                setLoading(false);
                navigation.navigate("Login");
              } else {
                setLoading(false);
                alert("Please try again");
              }
            })
            .catch((err) => {
              alert("Something went wrong");
              setLoading(false);
            });
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
      <Text style={formHead2}>Change Description</Text>
      <TextInput
        placeholder="Enter a description"
        style={formInput}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleDescription()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeDescription;

const styles = StyleSheet.create({});
