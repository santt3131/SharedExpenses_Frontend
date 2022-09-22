import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { ColorPalette, Size } from "../../../appStyles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  // navigation
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {Platform.OS == "ios" ? <StatusBar /> : null}
      <Text style={[styles.welcomeText, { color: ColorPalette.primaryGreen }]}>
        Welcome to
      </Text>
      <Text style={styles.welcomeText}>Shared Expenses!</Text>
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
    //borderTopRightRadius: 40,
    //borderBottomLeftRadius: 40,
    borderRadius: 10,
    borderColor: ColorPalette.veryLightGrey,
    borderWidth: 3,
  },
  welcomeText: {
    fontSize: Size.xxl,
    color: ColorPalette.primaryBlue,
    fontWeight: "bold",
    marginBottom: 10,
  },
  explainText: {
    color: ColorPalette.primaryWhite,
    fontSize: Size.xm,
    textAlign: "center",
    padding: 5,
  },
  toEvalutate: {
    //borderTopLeftRadius: 40, borderTopRightRadius: 0, borderBottomRightRadius: 40, borderBottomLeftRadius: 0, share expenses
    //borderTopLeftRadius: 40, borderTopRightRadius: 0, borderBottomRightRadius: 40, borderBottomLeftRadius: 0, manage payments
  },
});

export default HomeScreen;
