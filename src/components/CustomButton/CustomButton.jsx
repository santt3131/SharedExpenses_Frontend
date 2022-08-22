import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 13,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: ColorPalette.primaryGreen,
  },

  container_SECONDARY: {
    borderColor: ColorPalette.primaryBlue,
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: ColorPalette.primaryWhite,
    fontSize: Size.xm,
  },

  text_SECONDARY: {
    color: ColorPalette.primaryBlue,
  },

  text_TERTIARY: {
    color: ColorPalette.primaryGray,
  },
});

export default CustomButton;
