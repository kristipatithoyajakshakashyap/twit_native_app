import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Bottomnavbar from "../../components/Bottomnavbar";
import TopNavbar from "../../components/TopNavbar";
import { searchbar } from "../../commoncss/pagecss";
import UserCard from "../../cards/UserCard";
import { formHead } from "../../commoncss/formcss";
const SearchUserPage = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const getalluser = async () => {
    if (keyword.length > 0) {
      setLoading(true);
      fetch(`http://192.168.168.180:3000/searchuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: keyword }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setData([]);
            setError(data.error);
            setLoading(false);
          } else if (data.message === "User found") {
            setError(null);
            setData(data.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
        });
    } else {
      setData([])
      setError(null)
    }
  };
  useEffect(() => {
    getalluser();
  }, [keyword]);
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={"SearchUserPage"} />
      <TextInput
        placeholder="Search by username.."
        style={searchbar}
        onChangeText={(text) => setKeyword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {error ? (
            <Text style={formHead}>{error}</Text>
          ) : (
            <ScrollView style={styles.userlists}>
              {data.map((item, index) => {
                return <UserCard key={item.username} user={item} navigation={navigation} />;
              })}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default SearchUserPage;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    paddingVertical: 50,
  },
  userlists: {
    width: "100%",
    marginTop: 20,
  },
});
