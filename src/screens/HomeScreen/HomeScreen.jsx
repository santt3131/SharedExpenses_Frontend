import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ColorPalette, Size } from "../../../appStyles";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Shared Expenses App!</Text>
      <Text style={styles.explainText}>
        the place where sharing expenses between friends has never been so
        simple...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: Size.lm,
    color: ColorPalette.primaryBlue,
    fontWeight: "bold",
  },
  explainText: {
    fontSize: Size.xm,
    textAlign: "center",
    padding: 5,
  },
});

export default HomeScreen;
