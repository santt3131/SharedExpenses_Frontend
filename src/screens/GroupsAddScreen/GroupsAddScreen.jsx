import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
  SafeAreaView,
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

const GroupsAddScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

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
        setFriends(response.data.results[0].friends);
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

  const onCreatePressed = () => {
    axios
      .post(`${Global.server}/groups`, {
        groupName: name,
        groupDescription: description,
        ownerId: authUser,
        friends: friends,
      })
      .then(function (response) {
        // handle success
        alert("Group created successfully");
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
        addDisabled={true}
        listDisabled={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Adding New Groups</Text>

          <CustomInput
            name="name"
            placeholder="Group Name"
            autoCapitalize="words"
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

          <SafeAreaView style={styles.container}>
            <View
              style={{
                flex: 1,
                backgroundColor: ColorPalette.primaryWhite,
                borderColor: ColorPalette.primaryGray,
                borderRadius: 5,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <TouchableOpacity onPress={openList}>
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: ColorPalette.primaryGray,
                    height: 48,
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
                  padding: 10,
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
                <View style={{ flex: 1, marginTop: 250 }}>
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
          </SafeAreaView>

          <CustomButton text="Create" onPress={handleSubmit(onCreatePressed)} />
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
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    shadowColor: ColorPalette.primaryBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 10,
    shadowRadius: 5,
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

export default GroupsAddScreen;
