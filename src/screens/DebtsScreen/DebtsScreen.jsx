import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import CustomTopbar from "../../components/CustomTopbar";
import axios from "axios";
import Global from "../../../global";

const DebtsScreen = () => {
  const navigation = useNavigation();

  const [debts, setDebts] = useState([]);

  useEffect(() => {
    onPressList();
  }, []);

  const onPressAdd = async () => {
    navigation.navigate("debtsAdd");
  };

  const onPressList = () => {
    axios
      .get(`${Global.server}/users/${Global.authUserId}/friends`, {})
      .then(function (response) {
        //setFriends(response.data.results[0].friends);
      })
      .catch(function (error) {
        alert(error.message);
      });

    navigation.navigate("Debts");
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Debts"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={true}
        sectionIcon="money-bill"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>My Debts</Text>
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

export default DebtsScreen;
