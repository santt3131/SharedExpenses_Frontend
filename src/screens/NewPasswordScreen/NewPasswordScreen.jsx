import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as api from "../../api/api";

const NewPasswordScreen = (props) => {
  const navigation = useNavigation();

  const { control, handleSubmit, setValue } = useForm();

  console.log(props.route?.params?.email);

  setValue("email", props.route?.params?.email);

  const onConfirmPressed = async (data) => {
    
    const { success, result ,error}  = await api.updatepassword(data);

    if (success && (result.status=="success"))
    {
    console.log("Password updated successfully"); 
    alert("Password updated successfully");
    navigation.navigate("SignIn");
    }

    else {   
    console.log("failed updating pwd",error);      
    alert("failed to update your password");
    }
  };


  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>


        <View style={{display:"none"}}><CustomInput
          name="email"
          control={control}
        
        />
        </View>



        <CustomInput
          name="code"
          placeholder="Confirmation code"
          keyboardType="number-pad"
          control={control}
          rules={{
            required: "Confirmation code is required",
            minLength: {
              value: 4,
              message: "Confirmation code should be of 4 characters long",
            },
            maxLength: {
              value: 4,
              message: "Confirmation code should be of 4 characters long",
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


        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

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

export default NewPasswordScreen;
