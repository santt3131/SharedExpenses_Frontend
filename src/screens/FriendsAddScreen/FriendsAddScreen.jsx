import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function invitationIdGenerator() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const FriendsAddScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const name = watch("name");
  const email = watch("email");
  const invitationId = invitationIdGenerator();
  const authUser = Global.authUserId;

  const message = `<h2>Shared Expenses Invitation</h2>
  <p>Hello, ${name}</p>
  <p>Your friend ${Global.authUserName} has invited you to share expenses in an easy way through Shared Expenses, 
  for this you can:</p>
  <ol>
  <li>Download the application<br />
  <strong>Android: </strong>https://play.google.com/store/apps/details?id=com.SharedExpenses.SharedExpensesMobile<br />
  <strong>iOS: </strong>https://apps.apple.com/us/app/sharedexpenses/id512463895</li>
  <li>Register using this link<br />https://wwww.sharedexpenses.com/register?friend=${invitationId}</li>
  <ol>`;

  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Friends");
  };

  const onSendPressed = () => {
    axios
      .post(`${Global.server}/email/invitation`, {
        name: name,
        email: email,
        message: message,
        authUser: authUser,
        invitationId: invitationId,
      })
      .then(function (response) {
        alert("Invitation sent successfully");
        navigation.navigate("Friends");
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Friends"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={true}
        listDisabled={false}
        sectionIcon="user-alt"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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

export default FriendsAddScreen;
