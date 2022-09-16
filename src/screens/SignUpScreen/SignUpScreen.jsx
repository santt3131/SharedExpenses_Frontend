import React , { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as api from "../../api/api";


const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");
  const mail = watch("email");

  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] =   useState(null);
  const exist = (httpCode) => httpCode === 200 || httpCode === 201;*/

  const onRegisterPressed = async (data) => {
    const { success, result, error }  = await api.register(data);
    
    //console.log(result.status);

    if(success && (result.status == 'user_already_exist'))
    {
    console.log("user exist"); 
    Alert("User exist");
    }

    else if  (success && (result.status=="success")) {   
    console.log("Temporary user created");      
    alert("A temporary account created please validate your email with the code sent to you");
    navigation.navigate("ConfirmEmail", {mail});
    }

    else 
    {
    console.log(result.status,error);
    alert("Creation failed");
    }
    
    
  };

  const onPrivacyPolicyPressed = () => {
    alert("Privacy Policy");
  };

  const onTermsOfUsePressed = () => {
    alert("Terms of Use");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

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

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />

        <CustomInput
          name="passwordRepeat"
          placeholder="Repeat Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Repeat Password is required",
            validate: (value) => value === pwd || "Passwords do not match",
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign In"
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
    fontSize: Size.sm,
  },
  link: {
    color: ColorPalette.primaryOrange,
    fontWeight: "bold",
  },
});

export default SignUpScreen;