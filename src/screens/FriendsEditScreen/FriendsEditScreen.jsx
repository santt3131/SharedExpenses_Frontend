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
import { useRoute } from "@react-navigation/native";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const FriendsEditScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  let userName = route?.params?.name;
  let userEmail = route?.params?.email;
  console.log('from route => user: ', userName, ' email: ', userEmail)  
  

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { name: userName, email: userEmail },
  });

  const name = watch("name");
  const email = watch("email");
  //const authUser = Global.authUserId;


  const onPressAdd = () => {
    navigation.navigate("FriendsAdd");
  };

  const onPressList = () => {
    navigation.navigate("Friends");
  };

  const onSendPressed = (name, email) => {
    let userId = ''
    axios
      .get(`${Global.server}/email/${email}`)
      .then((response) => {
        userId = response.data.results[0]._id
      })
      .catch((error) => {
          // handle error
          alert(error.response.data.error);
        });
    
    axios
      .patch(`${Global.server}/users/${userId}`, {
        name: name,
        email: email,
      })
      .then( (response) => {
        // handle success
        console.log('it went ok: ', response)
        alert("successfully edited");
      })
      .catch(function (error) {
        // handle error
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
          <Text style={styles.text}>Edit Friend data</Text>

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
            text="Update"
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

export default FriendsEditScreen;
