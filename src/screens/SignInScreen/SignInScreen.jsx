import React, { useState } from "react";
import * as api from "../../api/api";
import Global from "../../../global";
import * as token from "../../token";
import { Alert } from "react-native";

import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
} from "react-native";
import Logo from "../../../assets/images/SharedExpenses.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignInScreen = () => {
  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm();

  const email = watch("email");

  //const [message, setMessage] =   useState(null);

  const onSignInPressed = async (data) => {
    const { success, result, error } = await api.login(data);

    if (success && result.loginResult == "good") {
      Global.authUserId = result.userId;
      Global.authUserGroups = result.userGroups;
      Global.authUserName = result.userName;
      token.saveToken(result.userToken.accessToken);

      navigation.navigate("Home");
    } else {
      alert("login failed: Wrong email or password");
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword", { email });
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={styles.apptitle}>Shared Expenses</Text>

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

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be at least 3 characters long",
            },
          }}
        />

        <CustomButton
          text={loading ? "Loading..." : "Sign In"}
          onPress={handleSubmit(onSignInPressed)}
        />

        <Text style={styles.text}>
          <Text style={styles.link} onPress={onForgotPasswordPressed}>
            Recover password
          </Text>
          {"  "}|{"  "}
          <Text style={styles.link} onPress={onSignUpPressed}>
            Create an account
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 30,
  },
  text: {
    color: ColorPalette.primaryGray,
    marginVertical: 10,
  },
  link: {
    color: ColorPalette.primaryGray,
    fontWeight: "bold",
    fontSize: Size.xm,
  },
  apptitle: {
    color: ColorPalette.primaryBlue,
    fontSize: Size.xxl,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default SignInScreen;
