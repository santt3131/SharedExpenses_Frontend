import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const FriendsAddScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const name = watch("name");
  const email = watch("email");
  const message = `<h2>Shared Expenses Invitation</h2>
  <p>Hello, ${name}</p>
  <p>Your friend USUARIO AUTENTICADO has invited you to share expenses in an easy way through Shared Expenses, 
  for this you can:</p>
  <ol>
  <li>Download the application<br />
  <strong>Android: </strong>https://play.google.com/store/apps/details?id=com.SharedExpenses.SharedExpensesMobile<br />
  <strong>iOS: </strong>https://apps.apple.com/us/app/sharedexpenses/id512463895</li>
  <li>Register using this link<br />https://wwww.sharedexpenses.com/register?friend=Hg67TG</li>
  <ol>`;

  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Friends");
  };

  const onSendPressed = () => {
    axios
      .post("http://192.168.6.69:8080/email/invitation", {
        name: name,
        email: email,
        message: message,
      })
      .then(function (response) {
        // handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomTopbar
        screenTitle="Friends"
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

export default FriendsAddScreen;
