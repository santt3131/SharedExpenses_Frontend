import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: Size.xl,
          alignSelf: "center",
          marginTop: 20,
          color: ColorPalette.primaryBlue,
          fontWeight: "bold",
        }}
      >
        HOME
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
