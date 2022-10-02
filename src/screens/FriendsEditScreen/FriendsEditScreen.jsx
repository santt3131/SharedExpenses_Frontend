import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";
import { useRoute } from "@react-navigation/native";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const FriendsEditScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: route?.params?.name,
      email: route?.params?.email,
    },
  });

  const nameInput = watch("name");
  const emailInput = watch("email");

  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Friends");
  };

  const onSendPressed = (name, email) => {
    axios
      .put(`${Global.server}/users/${Global.authUserId}/friends`, {
        name: nameInput,
        email: emailInput,
      })
      .then((response) => {
        Alert.alert("Great!", "Your friend data was successfully edited", [
          {
            text: "OK",
            onPress: () => {
              //reset({ name: "", email: "" });
              navigation.navigate("Friends");
            },
          },
        ]);
      })
      .catch(function (error) {
        Alert.alert("Error!", error.response.data.error, [
          {
            text: "OK",
            onPress: () => navigation.navigate("Friends"),
          },
        ]);
      });
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Friends"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={false}
        sectionIcon="user-alt"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Edit Friend Data</Text>

          <CustomInput
            name="name"
            placeholder="Full name"
            autoCapitalize="words"
            control={control}
            rules={{
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name should be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Full name should be max 100 characters long",
              },
            }}
          />

          <CustomInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
            editable={false}
          />

          <CustomButton text="Update" onPress={handleSubmit(onSendPressed)} />
        </View>
      </ScrollView>
    </>
  );
};

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
});

export default FriendsEditScreen;
