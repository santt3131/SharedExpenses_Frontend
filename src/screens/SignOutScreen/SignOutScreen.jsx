import React, { useState } from "react";
import * as api from "../../api/api";
import Global from "../../../global";
import * as token from "../../token";


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



const SignOutScreen = () => {

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm();

  const [tk, setToken] = useState(token.readToken);

  const onSignOutPressed = async (data) => 
  {
    const temptoken = token.readToken;
  console.log(temptoken);

    token.deleteToken();  
    setToken(null);

    console.log(token.readToken());

    navigation.navigate("SignIn");
  };


  const onStayPressed = () => {
    navigation.navigate("Home");
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



        <CustomButton
          text={loading ? "Loading..." : "Sign Out"}
          onPress={handleSubmit(onSignOutPressed)}
          type="SECONDARY"
        />

        <CustomButton
          text={loading ? "Loading..." : "Stay"}
          onPress={handleSubmit(onStayPressed)}
        />

        <Text style={styles.text}>
          <Text style={styles.link}>
            Are you sure you want to logout !!!
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

export default SignOutScreen;
