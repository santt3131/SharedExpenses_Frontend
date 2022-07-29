import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomDropdown from "../../components/CustomDropdown";

const HomeScreen = () => {
	const arrayCategorias = [
		"Entertainment(Games,Movies,others)",
		"Food and drink(Dining out, Super, Drinks, others)",
		"Home(Furniture,Electronics, Maintenance, Rent, others)",
		"Life(Education,Clothing,Medical ,Gifts, others)",
		"Transportation(Bus,Bicycle,Car, Taxi, Hotel, others)",
		"Utilities(Gas, Electricity, Cleaning, Water, others)",
	];

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				{/* EJEMPLOS-- APLICACIÓN DE NUEVOS COMPONENTES*/}
				<CustomDropdown
					title="Categories"
					listdrop={arrayCategorias}
				></CustomDropdown>
			</View>
		</ScrollView>

		// <View>
		// 	<Text
		// 		style={{
		// 			fontSize: Size.xl,
		// 			alignSelf: "center",
		// 			marginTop: 20,
		// 			color: ColorPalette.primaryBlue,
		// 			fontWeight: "bold",
		// 		}}
		// 	>
		// 		Home, sweet home
		// 	</Text>
		// </View>
	);
};

const styles = StyleSheet.create({});

export default HomeScreen;
