import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { containerFull, goback, logo1, row } from "../../../commoncss/pagecss";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../../assets/logo.jpg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formHead2, formbtn } from "../../../commoncss/formcss";

const Signup_AccountCreated = ({ navigation }) => {
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
      <View style={row}>
        <MaterialCommunityIcons
          name="check-decagram"
          size={30}
          color="#99B83C"
        />
        <Text style={formHead2}> Account Created Successfully</Text>
      </View>
      <Text style={formbtn} onPress={() => navigation.navigate("MainPage")}>
        Let's Roll
      </Text>
    </View>
  );
};

export default Signup_AccountCreated;

const styles = StyleSheet.create({});
