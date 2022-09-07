import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { useNavigation } from "@react-navigation/native";
import CustomTopbar from "../../components/CustomTopbar";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import RadioGroup from "react-native-radio-buttons-group";
import { useForm } from "react-hook-form";
import axios from "axios";
import Global from "../../../global";

const ExpensesPaymentScreen = () => {
  const navigation = useNavigation();

  const expenseId = "62b9ec1e3b031c174dc38fd6";
  const expenseTitle = "Compra de maleta";
  const owe = "10";
  const radioButtonsData = [
    {
      id: "62b5e88ba6e78636d6488647", // acts as primary key, should be unique and non-empty string
      label: "Maria Perez",
      value: "62b5e88ba6e78636d6488647",
    },
    {
      id: "62b5e88ba6e78636d6488645",
      label: "Santiago Bruno",
      value: "62b5e88ba6e78636d6488645",
    },
  ];

  const { control, handleSubmit, watch } = useForm();

  const topay = watch("topay");
  const note = watch("note");
  const authUser = Global.authUserId;

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  useEffect(() => {
    onPressList();
  }, []);

  const onPressAdd = async () => {
    // onPressAdd
  };

  const onPressList = () => {
    // onPressList
  };

  const onPayPressed = () => {
    axios
      .put(`${Global.server}/expenses/${expenseId}/payments`, {
        date: new Date(),
        note: note,
        userFromId: authUser,
        userToId: "62b5e88ba6e78636d6488645",
        quantity: topay,
      })
      .then(function (response) {
        alert("Payment OK");
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  };

  return (
    <>
      <CustomTopbar
        screenTitle="Expenses"
        onPressAdd={onPressAdd}
        onPressList={onPressList}
        addDisabled={false}
        listDisabled={true}
        sectionIcon="money-bill"
        leftIcon="plus"
        rightIcon="list"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>Make a Payment</Text>
          <View style={styles.paymentContainer}>
            <Text style={styles.textPaymentDataTitle}>» Expense Title: </Text>
            <Text style={styles.textPaymentDataContent}>{expenseTitle}</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.textPaymentDataTitle}>» You Owe: </Text>
            <Text style={styles.textPaymentDataContent}>€ {owe}.00</Text>
          </View>
          <View style={styles.inputsContainer}>
            <CustomInput
              name="topay"
              placeholder="Quantity to Pay"
              keyboardType="numeric"
              control={control}
              rules={{
                required: "Quantity to Pay is required",
                minLength: {
                  value: 1,
                  message:
                    "Quantity to Pay should be at least 1 characters long",
                },
                maxLength: {
                  value: 25,
                  message: "Quantity to Pay should be max 25 characters long",
                },
              }}
            />
            <CustomInput
              name="note"
              placeholder="Note"
              keyboardType="default"
              autoCapitalize="sentences"
              control={control}
              rules={{
                required: "Quantity to Pay is required",
                minLength: {
                  value: 1,
                  message:
                    "Quantity to Pay should be at least 1 characters long",
                },
                maxLength: {
                  value: 25,
                  message: "Quantity to Pay should be max 25 characters long",
                },
              }}
            />
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              containerStyle={styles.radioButtons}
            />
            <CustomButton text="Pay" onPress={handleSubmit(onPayPressed)} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  paymentContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    display: "flex",
    flexDirection: "row",
  },
  inputsContainer: {
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
  textPaymentDataTitle: {
    fontWeight: "bold",
    fontSize: Size.ls,
  },
  textPaymentDataContent: {
    fontSize: Size.ls,
  },
  radioButtons: {
    fontSize: Size.ls,
    display: "flex",
    alignItems: "flex-start",
  },
});

export default ExpensesPaymentScreen;
