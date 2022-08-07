import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import axios from "axios";

const CustomFriendsItem = ({ friends }) => {
  if (friends === null || friends === undefined) {
    return <CustomSpinner />;
  }

  if (friends.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.initialText}>Don't you have any friends yet?</Text>
      </View>
    );
  }

  const onSendPress = (fm) => {
    const email = fm;
    const authUser = "62b5e88ba6e78636d6488646";

    axios
      .post("http://192.168.6.69:8080/email/reinvitation", {
        email: email,
        authUser: authUser,
      })
      .then(function (response) {
        // handle success
        alert("Invitation resent successfully");
      })
      .catch(function (error) {
        // handle error
        alert(error.response.data.error);
      });
  };

  return (
    <View style={styles.container}>
      {friends.map(({ friendName, friendEmail, invitationId }) => (
        <View key={friendEmail} style={styles.friendContainer}>
          <View style={styles.friendData}>
            <Text style={styles.friendName}>{friendName}</Text>
            <Text style={styles.friendEmail}>{friendEmail}</Text>
          </View>
          {invitationId !== "" && (
            <Pressable
              style={styles.friendButton}
              onPress={() => onSendPress(friendEmail)}
            >
              <Text style={styles.friendButtonText}>Reinvite</Text>
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  initialText: {
    flex: 1,
    color: ColorPalette.primaryGray,
    fontSize: Size.lm,
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  friendContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  friendData: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderLeftColor: ColorPalette.primaryBlue,
    borderLeftWidth: 6,
    backgroundColor: ColorPalette.veryLightGrey,
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    marginRight: 2,
  },
  friendName: {
    color: ColorPalette.primaryBlack,
    fontSize: Size.xm,
    fontWeight: "bold",
  },
  friendEmail: {
    color: ColorPalette.primaryGray,
    fontSize: Size.ls,
  },
  friendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.primaryBlue,
    borderRadius: 4,
  },
  friendButtonText: {
    color: ColorPalette.primaryWhite,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default CustomFriendsItem;
