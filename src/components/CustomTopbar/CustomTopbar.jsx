import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ColorPalette, Size } from "../../../appStyles";
import { FontAwesome5 } from "@expo/vector-icons/";

const CustomTopbar = ({
  screenTitle,
  onPressAdd,
  onPressList,
  addDisabled,
  listDisabled,
  sectionIcon,
  leftIcon,
  rightIcon,
}) => {
  return Platform.OS == "ios" ? (
    <>
      <StatusBar />
      <View style={[styles.container, { marginTop: 0 }]}>
        <View
          style={[
            styles.topBar,
            { backgroundColor: ColorPalette.primaryGreen },
          ]}
        >
          <FontAwesome5
            name={sectionIcon}
            size={Size.xm}
            color={ColorPalette.primaryWhite}
          />
          <Text style={[styles.topBarText, { fontWeight: "normal" }]}>
            {screenTitle}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressAdd}
          style={[
            styles.topBarButton,
            { backgroundColor: ColorPalette.primaryGreen },
          ]}
          disabled={addDisabled}
        >
          <FontAwesome5
            name={leftIcon}
            size={Size.xm}
            color={ColorPalette.primaryWhite}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressList}
          style={[
            styles.topBarButton,
            { backgroundColor: ColorPalette.primaryGreen },
          ]}
          disabled={listDisabled}
        >
          <FontAwesome5
            name={rightIcon}
            size={Size.xm}
            color={ColorPalette.primaryWhite}
          />
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FontAwesome5
          name={sectionIcon}
          size={Size.xm}
          color={ColorPalette.primaryWhite}
        />
        <Text style={styles.topBarText}>{screenTitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressAdd}
        style={styles.topBarButton}
        disabled={addDisabled}
      >
        <FontAwesome5
          name={leftIcon}
          size={Size.xm}
          color={ColorPalette.primaryWhite}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressList}
        style={styles.topBarButton}
        disabled={listDisabled}
      >
        <FontAwesome5
          name={rightIcon}
          size={Size.xm}
          color={ColorPalette.primaryWhite}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  topBar: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: ColorPalette.primaryBlue,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  topBarText: {
    margin: 5,
    color: ColorPalette.primaryWhite,
    fontSize: Size.lm,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  topBarButton: {
    width: 45,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.primaryBlue,
    marginLeft: 5,
  },
});

export default CustomTopbar;
