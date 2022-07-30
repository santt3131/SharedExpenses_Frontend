import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const FriendsAddScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("FriendsList");
  };

  const onSendPressed = () => {
    console.log("Send");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopbar
        screenTitle="My Friends"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={true}
        listDisabled={false}
      />

      <View style={styles.container}>
        <Text style={styles.text}>Adding New Friends</Text>

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
        />

        <CustomButton
          text="Send invitation"
          onPress={handleSubmit(onSendPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: ColorPalette.primaryBlue,
    fontSize: Size.xl,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default FriendsAddScreen;
