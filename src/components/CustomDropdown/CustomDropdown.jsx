import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { Picker } from "@react-native-picker/picker";

const CustomDropdown = ({ title, listdrop }) => {
	const [optionSelect, setoptionSelect] = useState("Unknown");

	return (
		<View style={styles.screen}>
			<Picker
				selectedValue={optionSelect}
				onValueChange={(value, index) => setoptionSelect(value)}
				mode="dropdown" // Android only
				style={styles.picker}
			>
				<Picker.Item label={title} value="Unknown" />
				{listdrop.map((objList, index) => (
					<Picker.Item key={index} label={objList} value={objList} />
				))}
			</Picker>
			<Text style={styles.text}>Your options selected is : {optionSelect}</Text>
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
