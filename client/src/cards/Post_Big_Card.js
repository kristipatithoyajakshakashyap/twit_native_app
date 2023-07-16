import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { icon1 } from "../commoncss/pagecss";
import { FontAwesome } from "@expo/vector-icons";

const Post_Big_Card = ({
  username,
  post_image,
  profile_image,
  likes,
  comments,
}) => {
  // console.log(username, post_image, profile_pic, likes, comments);
  const [isLike, setIsLike] = useState(false);
  const [showcommented, setShowcommented] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{ uri: profile_image }} style={styles.profilepic} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{ uri: post_image }} style={styles.image} />
      <View style={styles.s2}>
        {isLike ? (
          <View style={styles.s21}>
            <AntDesign
              name="heart"
              size={24}
              style={styles.iconliked}
              onPress={() => {
                setIsLike(false);
              }}
            />
            <Text style={styles.liked}>{likes.length + 1}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <AntDesign
              name="hearto"
              size={24}
              color="black"
              style={icon1}
              onPress={() => {
                setIsLike(true);
              }}
            />
            <Text style={styles.notliked}>{likes.length}</Text>
          </View>
        )}
        <View style={styles.s22}>
          <FontAwesome
            name="comment-o"
            size={24}
            color="black"
            style={icon1}
            onPress={() => {
              setShowcommented(!showcommented);
            }}
          />
        </View>
      </View>
      {showcommented && (
        <View style={styles.s3}>
          {comments.map((item, index) => {
            return (
              <View style={styles.s31} key={item.id}>
                <Text style={styles.commentuser}>{item.username}</Text>
                <Text style={styles.commenttext}> {item.comment}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  c1: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
  },
  profilepic: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 1,
  },
  username: {
    color: "white",
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  s2: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
  },
  s21: {
    // width: "100%",
    flexDirection: "row",
  },
  notliked: {
    color: "gray",
    marginLeft: 10,
    fontSize: 25,
  },
  liked: {
    color: "#DC143C",
    marginLeft: 10,
    fontSize: 25,
  },
  iconliked: {
    color: "#DC143C",
    fontSize: 30,
  },
  s22: {
    marginLeft: 20,
  },
  s3: {
    width: "100%",
    backgroundColor: "#111111",
    padding: 10,
  },
  commentuser: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  commenttext: {
    color: "gray",
    fontSize: 17,
    marginLeft: 5,
  },
  s31: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
});
