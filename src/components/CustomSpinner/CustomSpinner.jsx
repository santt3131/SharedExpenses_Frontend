import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ColorPalette } from "../../../appStyles";

const CustomSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={ColorPalette.primaryBlue} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomSpinner;
