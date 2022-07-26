import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 1,
    marginVertical: 5,
    alignItems: "center",
  },

  button: {
    borderRadius: 5,
    width: "100%",
    padding: 13,
    marginVertical: 5,
    alignItems: "center",
  },

  container_PRIMARY: {
    backgroundColor: ColorPalette.primaryBlue,
  },

  container_SECONDARY: {
    backgroundColor: ColorPalette.primarySeance,
    borderColor: ColorPalette.primarySeance,
  },

  container_TERTIARY: {
    backgroundColor: ColorPalette.veryLightGrey,
    borderColor: ColorPalette.veryLightGrey,
  },

  text: {
    fontWeight: "bold",
    color: ColorPalette.primaryWhite,
    fontSize: Size.xm,
  },

  text_SECONDARY: {
    color: ColorPalette.primaryBlue,
  },

  text_TERTIARY: {
    color: ColorPalette.primaryWhite,
  },
});

export default CustomButton;
