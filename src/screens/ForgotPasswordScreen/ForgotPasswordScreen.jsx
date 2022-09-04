import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import * as api from "../../api/api";
import Global from "../../../global";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: route?.params?.email },
  });

  const onSendPressed = async (data) => {

    const { success, result, error } = await api.resetpassword(data);

    if (success && (result.status == "good")) 
    {
      Global.resetPasswordCode = result.code;
      Global.authUserEmail = result.user;
      console.log(result.code);
      
      
    } else if (result.status == "bad") 
    {
    alert ("Passord reset failed");
    console.log(error);
    }

    navigation.navigate("NewPassword");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

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

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: Size.xl,
    fontWeight: "bold",
    color: ColorPalette.primaryBlue,
    margin: 10,
  },
  text: {
    color: ColorPalette.primaryGray,
    marginVertical: 10,
  },
});

export default ForgotPasswordScreen;
