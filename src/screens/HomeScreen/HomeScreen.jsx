import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ColorPalette, Size } from "../../../appStyles";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.welcomeText, {color:ColorPalette.primaryGreen}]}>Welcome to</Text>
      <Text style={styles.welcomeText}>Shared Expenses!</Text>
      <Text style={styles.explainText}>
        Sharing expenses {'\n'}
        has never been so
        simple...
      </Text>
    </View>
 
  );
  <CustomButton
  text="Sign Out"
  onPress={handleSubmit(onSignOutPressed)}
/>
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
    marginBottom:10
  },
  explainText: {
    fontSize: Size.xm,
    textAlign: "center",
    padding: 5,
  },
});

export default HomeScreen;
