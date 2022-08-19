import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { ColorPalette, Size } from "../../../appStyles";
//import ListOfFeatures from "../../components/listOfFeatures";
import CustomModal from "../../components/CustomModal/CustomModal";
import appLogo from "../../../assets/images/SharedExpenses.png";

const title = "Share expenses!";
const message = 'Boom! \n Ya no tienes que preocuparte de llevar las cuentas...'; 
const logoOrIcon = appLogo;
const isShown = true;

const HomeScreen = () => {
	return (
		<>
			<CustomModal // modal de bienvenida...
				title = {title}
				message = {message}
				logoOrIcon = {logoOrIcon}
				isShown = {isShown}
			/>
		</>
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
	backgroundColor: ColorPalette.background
  },
  
  bodyTitle: {
	fontSize: Size.xl,
    textAlign: "center",
	marginTop: 20,
    marginBottom: 15,
	color: ColorPalette.primaryRouge,
	fontWeight: "bold"
  },
  bodyText: {
	fontSize: Size.xm,
    textAlign: "center",
	marginTop: Size.ls,
    marginBottom: Size.ls,
	margin: Size.xm,
	marginRight: Size.xm,
	color: ColorPalette.primaryBlack,
	fontWeight: "bold"
  },



});

export default HomeScreen;
