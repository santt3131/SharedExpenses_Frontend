import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import * as api from "../../api/api";
import Global from "../../../global";

const NewPasswordScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  const onSubmitPressed = async (data) => {

  const { success, result, error } = await api.updatepassword(data);  

  if (success && (result.status == "success")) 
  {
    console.log(result.status);
    
    navigation.navigate("home");
    alert ("Passord reset successefully");
    
  } else if (result.status == "failed") 
  {
  alert ("Passord reset failed");
  console.log(error);
  }
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
          control={control}
        />


        <CustomInput
          name="code"
          placeholder="Code"
          keyboardType="number-pad"
          control={control}
          rules={{
            required: "Code is required",
            minLength: {
              value: 4,
              message: "Code should be of 4 characters long",
            },
            maxLength: {
              value: 4,
              message: "Code should be of 4 characters long",
            },
          }}
        />

        <CustomInput
          name="password"
          placeholder="New password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "New Password is required",
            minLength: {
              value: 8,
              message: "New Password should be at least 8 characters long",
            },
          }}
        />

        <CustomInput
          name="passwordRepeat"
          placeholder="New password repeat"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "New password repeat is required",
            validate: (value) =>
              value === pwd || "New password repeat do not match",
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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
    padding: 20,
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

export default NewPasswordScreen;
