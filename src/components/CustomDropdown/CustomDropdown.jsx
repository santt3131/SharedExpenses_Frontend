import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { Picker } from "@react-native-picker/picker";

const CustomDropdown = ({ title, listdrop, selected }) => {
	const [optionSelect, setoptionSelect] = useState("Unknown");
	if (listdrop === null || listdrop === undefined) {
		return <Text>Cargando...</Text>;
	}

	if (listdrop.length === 0) {
		return <Text>No resultados en {title}</Text>;
	}

	return (
		<View style={styles.screen}>
			<Picker
				selectedValue={optionSelect}
				onValueChange={(value, index) => {
					let objTotal = listdrop.results.find(
						(obj) => obj[Object.keys(obj)[1]] === value
					);
					if (!objTotal) {
						objTotal = {
							_id: "Unknown",
							category: "Unknown",
						};
					}
					let property = Object.keys(objTotal)[1];

					selected({
						_id: objTotal._id,
						category: objTotal.category,
					});
					setoptionSelect(objTotal[property]);
				}}
				mode="dropdown" // Android only
				style={styles.picker}
			>
				<Picker.Item label={title} value="Unknown" />
				{listdrop.results.map((objList, index) => (
					<Picker.Item
						key={index}
						label={objList[Object.keys(objList)[1]]}
						value={objList[Object.keys(objList)[1]]}
					/>
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: Size.xl,
	},
	picker: {
		marginVertical: Size.xxl,
		width: 300,
		padding: Size.xss,
		borderColor: ColorPalette.primaryPurple,
	},
});

export default CustomDropdown;
