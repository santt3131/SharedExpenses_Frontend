import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const CustomTopbar = ({
  screenTitle,
  onPressAdd,
  onPressList,
  addDisabled,
  listDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topBarText}>{screenTitle}</Text>
      <TouchableOpacity
        onPress={onPressAdd}
        style={styles.topButtonAdd}
        disabled={addDisabled}
      >
        <Text style={styles.topButtonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressList}
        style={styles.topButtonList}
        disabled={listDisabled}
      >
        <Text style={styles.topButtonText}>List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  topBarText: {
    flex: 1,
    color: ColorPalette.primaryWhite,
    fontSize: Size.lm,
    fontWeight: "bold",
    backgroundColor: ColorPalette.primaryBlue,
    textTransform: "uppercase",
    paddingLeft: 10,
    textAlignVertical: "center",
    marginRight: 5,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  topButtonAdd: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: ColorPalette.primaryBlue,
    marginRight: 5,
  },
  topButtonList: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: ColorPalette.primaryBlue,
  },
  topButtonText: {
    color: ColorPalette.primaryWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default CustomTopbar;
