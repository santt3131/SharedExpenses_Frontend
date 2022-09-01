import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomGroupsItem from "../../components/CustomGroupsItem";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const GroupsListScreen = () => {
  const navigation = useNavigation();

  const [groups, setGroups] = useState("");

  useEffect(() => {
    onPressList();
  }, []);

  const onPressAdd = async () => {
    navigation.navigate("GroupsAdd");
  };

  const onPressList = () => {
    axios
      .get(`${Global.server}/users/${Global.authUserId}/groups`, {})
      .then(function (response) {
        const allGroups = response.data.results[0].groups;
        setGroups(allGroups);
      })
      .catch(function (error) {
        alert(error.message);
      });

    navigation.navigate("Groups");
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Groups"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={true}
        sectionIcon="users"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>My Groups</Text>
          <CustomGroupsItem groups={groups} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  text: {
    color: ColorPalette.primaryBlue,
    fontSize: Size.xl,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default GroupsListScreen;
