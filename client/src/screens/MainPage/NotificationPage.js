import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Bottomnavbar from "../../components/Bottomnavbar";
import TopNavbar from "../../components/TopNavbar";
import { formHead } from "../../commoncss/formcss";
const NotificationPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={"NotificationPage"} />
      <View style={styles.c1}>
        <View style={styles.notificationbar}>
          <Text style={styles.notitext}>Some notifications</Text>
        </View>
        <View style={styles.notificationbar}>
          <Text style={styles.notitext}>Some notifications</Text>
        </View>
        <View style={styles.notificationbar}>
          <Text style={styles.notitext}>Some notifications</Text>
        </View>
        <View style={styles.notificationbar}>
          <Text style={styles.notitext}>Some notifications</Text>
        </View>
        <View style={styles.notificationbar}>
          <Text style={styles.notitext}>Some notifications</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationPage;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    paddingVertical: 50,
  },
  c1: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  notificationbar: {
    width: "95%",
    height: 50,
    backgroundColor: "#111111",
    margin: 10,
    justifyContent: "center",
    paddingLeft: 10,
  },
  notitext: {
    color: "white",
  },
});
