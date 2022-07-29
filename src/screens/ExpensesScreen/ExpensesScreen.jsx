import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomDropdown from "../../components/CustomDropdown";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const ExprensesScreen = () => {
	const TEXT_REGEX = /^[a-zA-Z0-9_ ]*$/;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			categories: "",
			division: "",
		},
	});

	const onSubmit = (data) => {
		data.categories = selectCategories;
		data.division = selectDivision;
		console.log(data);
		//navigation.navigate("Debts");
	};

	//Categorias
	const arrayCategorias = [
		"Entertainment(Games,Movies,others)",
		"Food and drink(Dining out, Super, Drinks, others)",
		"Home(Furniture,Electronics, Maintenance, Rent, others)",
		"Life(Education,Clothing,Medical ,Gifts, others)",
		"Transportation(Bus,Bicycle,Car, Taxi, Hotel, others)",
		"Utilities(Gas, Electricity, Cleaning, Water, others)",
	];

	const [selectCategories, setselectCategories] = useState("");
	const cbSelectedCategories = (childata) => {
		setselectCategories(childata);
	};

	//Método de división

	const arrayDivision = [
		"I pay",
		"Equal parts",
		"Percentages",
		"Different parts",
	];

	const [selectDivision, setselectDivision] = useState("");
	const cbSelectedDivision = (childata) => {
		setselectDivision(childata);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				<Text
					style={{
						fontSize: Size.xl,
						alignSelf: "center",
						marginTop: 20,
						color: ColorPalette.primaryBlue,
						fontWeight: "bold",
					}}
				>
					Expenses Screen
				</Text>

				<CustomInput
					name="title"
					placeholder="title"
					control={control}
					rules={{
						required: "Title is required",
						pattern: { value: TEXT_REGEX, message: "Title is invalid" },
					}}
				/>

				<Text>Seleccionado de Categorías: {selectCategories} </Text>
				<CustomDropdown
					title="Categorias"
					listdrop={arrayCategorias}
					selected={cbSelectedCategories}
				></CustomDropdown>

				<Text>Seleccionado - Método de división: {selectDivision} </Text>
				<CustomDropdown
					title="División"
					listdrop={arrayDivision}
					selected={cbSelectedDivision}
				></CustomDropdown>

				<CustomButton text="Add" onPress={handleSubmit(onSubmit)} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default ExprensesScreen;
