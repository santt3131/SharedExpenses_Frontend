import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { ColorPalette, Size } from "../../appStyles";

const ListOfFeatures = ({ children }) => {
  return (
    <View styles={styles.listItem}>
      <AntDesign
        style={styles.icons}
        name="checkcircle"
        size={Size.xm}
        color={ColorPalette.irisBlue}
      />
      <Text style={styles.listText}>{children}</Text>
    </View>
  );
};

export default ListOfFeatures;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Size.lm,
    marginBottom: Size.lm,
  },
  listText: {
    fontSize: Size.xm,
    marginTop: 0,
    marginBottom: Size.mm,
    marginLeft: Size.xm,
    marginRight: Size.xm,
  },
  icons: {
    display: "inLine",
    marginTop: Size.xm,
  },
});
