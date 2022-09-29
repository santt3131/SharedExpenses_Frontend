import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Global from "../../../global";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {Platform.OS == "ios" ? <StatusBar /> : null}
      <Text style={styles.welcomeText}>Welcome to Shared Expenses!</Text>
      <Text style={styles.authuserText}>{Global.authUserName}</Text>
      <Text style={[styles.explainText, { color: "black" }]}>
        Sharing expenses {"\n"}
        has never been so simple...
      </Text>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <View
          style={[
            styles.textGlobe,
            { backgroundColor: ColorPalette.governorBay },
          ]}
        >
          <Pressable onPress={() => navigation.navigate("FriendsAdd")}>
            <Text style={styles.explainText}>Invite Friends</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.textGlobe,
            { backgroundColor: ColorPalette.primaryBlue },
          ]}
        >
          <Pressable onPress={() => navigation.navigate("GroupsAdd")}>
            <Text style={styles.explainText}>Make groups</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.textGlobe, { backgroundColor: ColorPalette.irisBlue }]}
        >
          <Pressable onPress={() => navigation.navigate("Groups")}>
            <Text style={styles.explainText}>Share Expenses</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.textGlobe,
            { backgroundColor: ColorPalette.primaryGreen },
          ]}
        >
          <Pressable onPress={() => navigation.navigate("Expenses")}>
            <Text style={styles.explainText}>Manage Payments</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textGlobe: {
    width: "35%",
    height: 95,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: ColorPalette.veryLightGrey,
    borderWidth: 3,
  },
  welcomeText: {
    fontSize: Size.ml,
    color: ColorPalette.primaryBlue,
    fontWeight: "bold",
    marginBottom: 10,
  },
  authuserText: {
    fontSize: Size.ml,
    color: ColorPalette.primaryGreen,
    fontWeight: "bold",
    marginBottom: 10,
  },
  explainText: {
    color: ColorPalette.primaryWhite,
    fontSize: Size.xm,
    textAlign: "center",
    padding: 5,
  },
});

export default HomeScreen;
