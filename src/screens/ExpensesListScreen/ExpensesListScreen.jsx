import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import CustomTopbar from "../../components/CustomTopbar";
import React, { useEffect } from "react";

const ExpensesListScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		onPressList();
	}, []);

	const onPressAdd = () => {
		navigation.navigate("ExpensesAdd");
	};

	const onPressList = () => {
		navigation.navigate("Expenses");
	};
	return (
		<>
			<CustomTopbar
				screenTitle="Expenses"
				onPressAdd={onPressAdd}
				onPressList={onPressList}
				addDisabled={false}
				listDisabled={true}
			/>
			<Text>Lista de expenses</Text>
		</>
	);
};

export default ExpensesListScreen;
