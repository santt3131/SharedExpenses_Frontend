import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
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
		<View style={styles.container}>
		
		
			<StatusBar/>
			<View style={{borderBottomWidth: 1, borderBottomColor: ColorPalette.veryLightGrey, marginBottom: 15}}>
				<Text style={styles.header1}>Expenses</Text>
			</View>
			<Text style={styles.header2}># Friends</Text>
			<Text style={styles.header2}># Groups</Text>
			<Text style={styles.header2}># Shared expenses</Text>
			<Text style={styles.header2}># in debs</Text>
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
	container: {
    flex: 1,
    justifyContent: "center",
    padding: Size.mm,
	//backgroundColor: ColorPalette.background
  },
  
  header1: {
	fontSize: Size.xxl*1.2,
    textAlign: "center",
	marginTop: 40,
    marginBottom: 0,
	color: ColorPalette.primaryGreen,
	//fontWeight: "bold"
	
  },
  header2: {
	fontSize: Size.ml,
    paddingLeft: Size.ll,
	marginTop: 10,
    marginBottom: 10,
	color: ColorPalette.primarySeance,
	//fontWeight: "bold"
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
