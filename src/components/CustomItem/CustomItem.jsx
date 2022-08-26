import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const CustomItem = ({ index, label }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{label}</Text>
    <Switch />
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.primaryGray,
  },
  title: {
    textTransform: "capitalize",
  },
});

export default CustomItem;
