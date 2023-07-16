import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { containerFull, goback, logo1 } from "../../commoncss/pagecss";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/logo.jpg";
import { formHead2, formbtn } from "../../commoncss/formcss";
import { firebase } from "../../Firebase/Config";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadProfilePicture = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result)
    if (!result.canceled) {
      const source = { uri: result.assets };
      setImage(source);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const filename = result.uri.substring(result.uri);
      const ref = firebase.storage().ref().child(filename);
      const snapshot = await ref.put(blob);
      const url = await snapshot.ref.getDownloadURL();
      // console.log(url)
      return url;
    } else {
      return null;
    }
  };
  const handlePicture = () => {
    AsyncStorage.getItem("user").then((data) => {
      setLoading(true);
      pickImage().then((url) => {
        if (url) {
          fetch(`http://192.168.168.180:3000/setprofilepic`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              profilepic: url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "Profile picture updated successfully") {
                setLoading(false);
                alert("Profile picture updated successfully");
                navigation.navigate("Settings1");
              } else if (data.error === "Invalid Credentials") {
                alert("Invalid Credentials");
                setLoading(false);
                navigation.navigate("Login");
              } else {
                setLoading(false);
                alert("Please Try Again");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Please select an image");
          setLoading(false);
        }
      });
    });
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
      <Text style={formHead2}>Choose profile picture</Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePicture()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default UploadProfilePicture;

const styles = StyleSheet.create({});
