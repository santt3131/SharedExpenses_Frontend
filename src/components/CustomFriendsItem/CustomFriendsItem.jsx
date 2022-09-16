import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import axios from "axios";
import Global from "../../../global";
import { useNavigation } from "@react-navigation/native";

const CustomFriendsItem = ({ friends }) => {
  const navigation = useNavigation();
  console.log("the friend object: ", friends);

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

    axios
      .post(`${Global.server}/email/reinvitation`, {
        email: email,
        authUser: Global.authUserId,
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

  const onDeletePress = (fm) => {
    const email = fm;
    const authUser = Global.authUserId;

    axios
      .delete(`${Global.server}/users/${authUser}/friends`, {
        data: { email: email },
      })
      .then(function (response) {
        // handle success
        alert("Friend deleted successfully");
      })
      .catch(function (error) {
        // handle error
        alert(error.response.data.error);
      });
  };

  const onEditPress = (userName, userEmail) => {
    console.log("recieving this name: ", userName, " and email: ", userEmail);
    navigation.navigate("FriendsEdit", { name: userName, email: userEmail });
  };

  return (
    <View style={styles.container}>
      {friends.map(({ friendName, friendEmail, invitationId }) => (
        <View key={friendEmail} style={styles.friendContainer}>
          <View style={styles.friendData}>
            <Text style={styles.friendName}>{friendName}</Text>
            <Text style={styles.friendEmail}>{friendEmail}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              marginTop: 5,
              justifyContent: "space-around",
            }}
          >
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDeletePress(friendEmail)}
            >
              <Text style={styles.friendButtonText}>Delete</Text>
            </Pressable>
            <Pressable
              style={styles.reinviteButton}
              onPress={() => onEditPress(friendName, friendEmail)}
            >
              <Text style={styles.friendButtonText}>Edit</Text>
            </Pressable>
            {invitationId === "" ? (
              <Pressable
                style={[
                  styles.reinviteButton,
                  { backgroundColor: ColorPalette.background },
                ]}
              >
                <Text style={styles.friendButtonText}>Reinvite</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[
                  styles.reinviteButton,
                  { backgroundColor: ColorPalette.primaryBlue },
                ]}
                onPress={() => onSendPress(friendEmail)}
              >
                <Text style={styles.friendButtonText}>Reinvite</Text>
              </Pressable>
            )}
          </View>
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
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderLeftColor: ColorPalette.primaryBlue,
    borderLeftWidth: 3,

    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    backgroundColor: ColorPalette.background,
    marginBottom: 10,
  },
  friendData: {
    flex: 5,
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,

    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    marginRight: 0,
  },
  friendName: {
    color: ColorPalette.primaryBlack,
    fontSize: Size.xm,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  friendEmail: {
    color: ColorPalette.primaryGray,
    fontSize: Size.ls,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 2,
  },
  reinviteButton: {
    flex: 1 / 3,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.primaryGreen,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 2,
  },
  deleteButton: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.primaryRouge,
    borderRadius: 5,
    marginHorizontal: 3,
    marginBottom: 2,
  },
  friendButtonText: {
    color: ColorPalette.primaryWhite,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default CustomFriendsItem;
