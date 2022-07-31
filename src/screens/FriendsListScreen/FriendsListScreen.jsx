import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import { useNavigation } from "@react-navigation/native";

const FriendsListScreen = () => {
  const navigation = useNavigation();

  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Friends");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopbar
        screenTitle="Friends"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={true}
      />

      <View style={styles.container}>
        <Text style={styles.text}>My Friends</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  text: {
    color: ColorPalette.primaryBlue,
    fontSize: Size.xl,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default FriendsListScreen;
