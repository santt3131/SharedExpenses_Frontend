import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomFriendsItem from "../../components/CustomFriendsItem";
import CustomSpinner from "../../components/CustomSpinner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const FriendsListScreen = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(true);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      onPressList();
    });

    return focusHandler;
  }, [navigation]);

  const onPressAdd = async () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    axios
      .get(`${Global.server}/users/${Global.authUserId}/friends`, {})
      .then(function (response) {
        setRefreshing(false);
        let newFriends = response.data.results[0].friends;
        setFriends(newFriends);
      })
      .catch(function (error) {
        Alert.alert("Error!", error.message, [
          {
            text: "OK",
            onPress: () => null,
          },
        ]);
      });

    navigation.navigate("Friends");
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Friends"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={true}
        sectionIcon="user-alt"
        leftIcon="plus"
        rightIcon="list"
      />

      {refreshing ? <CustomSpinner /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPressList} />
        }
      >
        <View style={styles.container}>
          <CustomFriendsItem friends={friends} />
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

export default FriendsListScreen;
