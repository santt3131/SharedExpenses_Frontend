import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { ColorPalette, Size } from "../../../appStyles";
import ListOfFeatures from "../../components/listOfFeatures";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Share expenses!</Text>
            <Image
              style={styles.logo}
              source={require("../../../assets/images/SharedExpenses.png")}
            />

            <Text style={styles.bodyTitle}>
              Boom! {"\n"}Ya no tienes que preocuparte de llevar las cuentas...
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.bodyText}>ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.bodyText}>
        Selecciona una categoría y empieza a gestionar los gastos
      </Text>
    </View>
  );
};

/*
<Text styles={styles.bodyText}>Por fin una forma fácil {"\n"} 
						de compartir gastos {"\n"}
						con tus amig@s.</Text>
<listOfFeatures>Agrupa los gastos por categorías</listOfFeatures>
<listOfFeatures>Añade tus amig@s</listOfFeatures>
<listOfFeatures>Decide cómo repartir los gastos</listOfFeatures> */

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Size.mm,
    backgroundColor: ColorPalette.background,
  },
  modalView: {
    margin: Size.xm,
    backgroundColor: "white",
    borderRadius: Size.mm,
    padding: Size.xxl,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color: "white",
    borderRadius: 30,
    paddingRight: Size.xss,
    paddingLeft: Size.xss,
    elevation: 0,
    backgroundColor: ColorPalette.eggBlue,
    paddingTop: 0,
    paddingBottom: 0,
  },
  bodyTitle: {
    fontSize: Size.xm,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    color: ColorPalette.primaryRouge,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: Size.xm,
    textAlign: "center",
    marginTop: Size.ls,
    marginBottom: Size.ls,
    margin: Size.xm,
    marginRight: Size.xm,
    color: ColorPalette.primaryBlack,
    fontWeight: "bold",
  },
  logo: {
    width: 66,
    height: 66,
    marginTop: Size.xm,
    marginBottom: Size.xm,
  },
});

export default HomeScreen;
