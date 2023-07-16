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
import { firebase } from "../../Firebase/Config";
import * as ImagePicker from "expo-image-picker";

const AddPost = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [post, setPost] = useState("");
  const pickImage = async () => {
    setLoading1(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result)

    if (!result.canceled) {
      const source = { uri: result.uri };

      const response = await fetch(result.uri);
      const blob = await response.blob();
      const filename = result.uri.substring(result.uri);

      const ref = firebase.storage().ref().child(filename);
      const snapshot = await ref.put(blob);
      const url = await snapshot.ref.getDownloadURL();

      setLoading1(false);
      setPost(url);
      // console.log(url)
    } else {
      setLoading1(false);
      setPost(null);
    }
  };

  const handleUpload = () => {
    if (post != null) {
      AsyncStorage.getItem("user").then((data) => {
        setLoading2(true);
        fetch(`http://192.168.168.180:3000/addpost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            postdescription: description,
            post: post,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message == "Post added successfully") {
              alert("Post added successfully");
              setLoading2(false);
              navigation.navigate("My_UserProfile");
            } else {
              alert("Something went wrong, please try again");
              setLoading2(false);
            }
          });
      });
    } else {
      Alert('Please select an image ')
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MainPage")}
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
      {loading1 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Text style={formHead2}>Add New Post</Text>
          {post ? (
            <>
              <TouchableOpacity onPress={() => pickImage()}>
                <Image
                  source={{ uri: post }}
                  style={{
                    width: 200,
                    height: 200,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Text
              style={styles.addpost}
              onPress={() => {
                pickImage();
              }}
            >
              Click here to select a new post
            </Text>
          )}
        </>
      )}
      <Text style={formHead2}>Change Description</Text>
      <TextInput
        placeholder="Enter a description"
        style={formInput}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4}
      />
      {loading2 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  addpost: {
    fontSize: 20,
    fontWeight: "100",
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 50,
    width: "80%",
    textAlign: "center",
    marginVertical: 20,
  },
});
