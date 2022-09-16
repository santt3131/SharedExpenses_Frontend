import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const CustomGroupsItem = ({ groups }) => {
  const navigation = useNavigation();

  if (groups === null || groups === undefined) {
    return <CustomSpinner />;
  }

  if (groups.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.initialText}>Don't you have any groups yet?</Text>
      </View>
    );
  }

  const onEditPress = (groupId) => {
    axios
      .get(`${Global.server}/groups/${groupId}`, {})
      .then(function (response) {
        // handle success
        const groupName = response.data.results[0].groupName;
        const groupDescription = response.data.results[0].groupDescription;
        const users = response.data.results[0].users;
        navigation.navigate("GroupsUpdate", {
          groupId,
          groupName,
          groupDescription,
          users,
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.response.data.error);
      });
  };

  const onDeletePress = (groupId) => {
    axios
      .delete(`${Global.server}/groups/${groupId}`, {})
      .then(function (response) {
        // handle success
        alert("Group deleted successfully");
      })
      .catch(function (error) {
        // handle error
        alert(error.response.data.error);
      });
  };

  const onAddExpensePress = (groupId) => {
    Global.currentGroupId = groupId;
    navigation.navigate("ExpensesAdd", { groupId });
  };

  return (
    <View style={styles.container}>
      {groups?.map(({ _id, groupName, groupDescription, ownerId }) => (
        <View
          key={Math.random()}
          style={
            Platform.OS == "ios"
              ? [styles.groupContainer, { backgroundColor: "transparent" }]
              : styles.groupContainer
          }
        >
          {ownerId === Global.authUserId ? (
            <View
              style={
                Platform.OS == "ios" ? styles.groupDataIos : styles.groupData
              }
            >
              <Text style={styles.groupName}>{groupName}</Text>
              <Text style={styles.groupDesc}>{groupDescription}</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  marginTop: 10,
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => onDeletePress(_id)}
                >
                  <Text style={styles.groupButtonText}>Delete</Text>
                </Pressable>
                <Pressable
                  style={styles.editButton}
                  onPress={() => onEditPress(_id)}
                >
                  <Text style={styles.groupButtonText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.editButton,
                    { backgroundColor: ColorPalette.primaryBlue },
                  ]}
                  onPress={() => onAddExpensePress(_id)}
                >
                  <Text style={styles.groupButtonText}>+expense</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View
              style={
                Platform.OS == "ios"
                  ? [
                      styles.groupDataIos,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]
                  : [
                      styles.groupData,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]
              }
            >
              <View>
                <Text style={styles.groupName}>{groupName}</Text>
                <Text style={styles.groupDesc}>{groupDescription}</Text>
              </View>

              <View style={{ marginBottom: 5, marginTop: 10 }}>
                <Pressable
                  style={[
                    styles.editButton,
                    { backgroundColor: ColorPalette.primaryBlue },
                  ]}
                  onPress={() => onAddExpensePress(_id)}
                >
                  <Text style={styles.groupButtonText}>+expense</Text>
                </Pressable>
              </View>
            </View>
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
  groupContainer: {
    display: "flex",
    //flexDirection: "row",
    marginBottom: 10,
    backgroundColor: ColorPalette.background,
  },
  groupData: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderLeftColor: ColorPalette.primaryBlue,
    borderLeftWidth: 3,

    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    //marginRight: 2,
  },
  groupDataIos: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomColor: ColorPalette.primaryGray,
    borderBottomWidth: 1,

    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    //marginRight: 2,
  },
  groupName: {
    color: ColorPalette.primaryBlack,
    fontSize: Size.xm,
    fontWeight: "bold",
    //marginTop: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  groupDesc: {
    color: ColorPalette.primaryGray,
    fontSize: Size.ls,
  },
  editButton: {
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
    //width: 75,
  },
  groupButtonText: {
    color: ColorPalette.primaryWhite,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default CustomGroupsItem;
