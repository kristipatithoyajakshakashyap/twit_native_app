import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Bottomnavbar from "../../components/Bottomnavbar";
import TopNavbar from "../../components/TopNavbar";
import { Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import nopic from "../../../assets/nopic.png";

const My_UserProfile = ({ navigation }) => {
  const [userdata, setUserdata] = useState(null);
  const loaddata = async () => {
    AsyncStorage.getItem("user")
      .then(async (value) => {
        fetch(`http://192.168.168.180:3000/userdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(value).token,
          },
          body: JSON.stringify({ email: JSON.parse(value).user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message == "User Found") {
              setUserdata(data.user);
            } else {
              alert("Login Again");
              navigation.navigate("Login");
            }
          })
          .catch((err) => {
            navigation.navigate("Login");
          });
      })
      .catch((err) => {
        navigation.navigate("Login");
      });
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={"My_UserProfile"} />
      <Bottomnavbar navigation={navigation} page={"My_UserProfile"} />
      <Foundation
        name="refresh"
        size={25}
        color="white"
        style={styles.refresh}
        onPress={()=> loaddata()}
      />
      {userdata ? (
        <ScrollView>
          <View style={styles.c1}>
            {userdata.profilepic.length > 0 ? (
              <Image
                source={{ uri: userdata.profilepic }}
                style={styles.profilepic}
              />
            ) : (
              <Image source={nopic} style={styles.profilepic} />
            )}
            <Text style={styles.txt}>@{userdata?.username}</Text>
            <View style={styles.c11}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Followers</Text>
                <Text style={styles.txt2}>{userdata?.followers.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{userdata?.following.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{userdata?.posts.length}</Text>
              </View>
            </View>
            {userdata.description.length > 0 && (
              <Text style={styles.description}>{userdata?.description}</Text>
            )}
          </View>
          {userdata.posts.length > 0 ? (
            <View style={styles.c1}>
              <Text style={styles.txt}>Your Posts</Text>
              <View style={styles.c13}>
                {userdata?.posts.map((item) => {
                  return (
                    <Image
                      key={item.post}
                      style={styles.postpic}
                      source={{ uri: item.post }}
                    />
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>No Posts </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
};

export default My_UserProfile;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    paddingVertical: 50,
  },
  c1: {
    width: "100%",
    alignItems: "center",
  },
  profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  txt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    backgroundColor: "#111111",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: "white",
    fontSize: 15,
  },
  txt2: {
    color: "white",
    fontSize: 20,
  },
  c11: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  c111: {
    alignItems: "center",
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: "white",
  },
  description: {
    color: "white",
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: "#111111",
    width: "100%",
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: "30%",
    height: 120,
    margin: 5,
  },
  c13: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  c2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  refresh: {
    position: "absolute",
    top: 50,
    right: 10,
    zIndex: 1,
  },
});
