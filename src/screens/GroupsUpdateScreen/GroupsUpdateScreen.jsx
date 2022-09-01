import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";
import { useRoute } from "@react-navigation/native";

const GroupsUpdateScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const groupId = route?.params?.groupId;
  const groupName = route?.params?.groupName;
  const groupDescription = route?.params?.groupDescription;
  const users = route?.params?.users;

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { name: groupName, description: groupDescription },
  });

  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);

  const openList = () => setOpen(true);
  const closeList = () => setOpen(false);
  const onUpdateValue = (index, value) => {
    friends[index].selected = value;
    return setFriends([...friends]);
  };

  const renderItem = ({ item, index }) => (
    <ItemRenderer
      key={index}
      index={index}
      selected={item.selected}
      label={item.friendName}
      onUpdateValue={onUpdateValue}
    />
  );

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    await axios
      .get(`${Global.server}/users/${Global.authUserId}/friends`, {})
      .then(function (response) {
        const friendsReceived = response.data.results[0].friends;
        let newFriends = [];
        const friendsIds = [
          "62b5e88ba6e78636d6488645",
          "62b5e88ba6e78636d6488647",
        ];
        friendsReceived.forEach(function (fr) {
          if (fr.friendId === "62b5e88ba6e78636d6488645") {
            fr.selected = true;
          } else {
            fr.selected = false;
          }
          newFriends.push(fr);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const name = watch("name");
  const description = watch("description");
  const authUser = Global.authUserId;

  const onPressAdd = () => {
    navigation.navigate("GroupsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Groups");
  };

  const onUpdatePressed = () => {
    axios
      .post(`${Global.server}/groups`, {
        groupName: name,
        groupDescription: description,
        ownerId: authUser,
        friends: friends,
      })
      .then(function (response) {
        // handle success
        alert("Group updated successfully");
        navigation.navigate("Groups");
      })
      .catch(function (error) {
        // handle error
        alert(error.response.data.error);
      });
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Groups"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={false}
        sectionIcon="users"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Updating Groups</Text>

          <CustomInput
            name="name"
            placeholder="Group Name"
            autoCapitalize="sentences"
            control={control}
            rules={{
              required: "Group Name is required",
              minLength: {
                value: 3,
                message: "Group Name should be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Group Name should be max 100 characters long",
              },
            }}
          />

          <CustomInput
            name="description"
            placeholder="Group Description"
            control={control}
            rules={{
              required: "Group Description is required",
              minLength: {
                value: 3,
                message:
                  "Group Description should be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Group Description should be max 100 characters long",
              },
            }}
          />

          <View
            style={{
              flex: 1,
              backgroundColor: ColorPalette.primaryWhite,
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity onPress={openList}>
              <View
                style={{
                  paddingTop: 11,
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: ColorPalette.veryLightGrey,
                  height: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: Size.xm,
                    color: ColorPalette.primaryGray,
                  }}
                >
                  Select Friends
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                padding: 0,
                paddingLeft: 10,
              }}
            >
              {friends
                .filter((item) => item.selected)
                .map((item) => (
                  <Text
                    key={item.friendEmail}
                    style={{
                      fontSize: Size.xm,
                      textTransform: "capitalize",
                    }}
                  >
                    - {item.friendName}
                  </Text>
                ))}
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={open === true}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeList}
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1, marginTop: 275, marginBottom: 50 }}>
                <View style={styles.listWrapper}>
                  <View style={styles.listContainer}>
                    <FlatList
                      data={friends}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.friendEmail}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <CustomButton text="Update" onPress={handleSubmit(onUpdatePressed)} />
        </View>
      </ScrollView>
    </>
  );
};

const ItemRenderer = ({ index, label, selected, onUpdateValue }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{label}</Text>
    <Switch
      value={selected}
      onValueChange={(value) => onUpdateValue(index, value)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    color: ColorPalette.primaryBlue,
    fontSize: Size.xl,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  listWrapper: {
    flex: 1,
    shadowColor: ColorPalette.primaryBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 10,
    shadowRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
  },
  listContainer: {
    flex: 1,
    backgroundColor: ColorPalette.primaryWhite,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.primaryGray,
  },
  title: {
    textTransform: "capitalize",
    color: ColorPalette.primaryGray,
  },
});

export default GroupsUpdateScreen;
