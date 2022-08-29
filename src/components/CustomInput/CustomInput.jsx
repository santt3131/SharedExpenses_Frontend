import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { ColorPalette, Size } from "../../../appStyles";

const CustomInput = ({
	control,
	name,
	rules = {},
	placeholder,
	secureTextEntry,
	keyboardType,
	autoCapitalize
}) => {
	return (
		<View style={styles.container}>
			
			<Controller
				control={control}
				name={name}
				rules={rules}
				keyboardType={keyboardType}
				autoCapitalize={autoCapitalize}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error },
				}) => (
					
					<View
						style={[
							styles.container,
							{
								borderColor: error
									? ColorPalette.primaryRed
									: ColorPalette.veryLightGrey,
							},
						]}
					>
						<TextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
							placeholder={placeholder}
							placeholderTextColor={ColorPalette.primaryGray}
							style={styles.input}
							secureTextEntry={secureTextEntry}
							keyboardType={keyboardType}
						/>
					{error && (
						<Text
						style={{ color: ColorPalette.primaryRed, alignSelf: "stretch" }}
						>
							{error.message || "Error"}
						</Text>
					)}
					</View>
					
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: "center",
		//borderColor: 'red',
    	//borderWidth: 2
	},
	input: {
		width: '100%',
		height: 40,
		fontSize: Size.xm,
		color: ColorPalette.primaryBlack,
		backgroundColor: ColorPalette.primaryWhite,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: ColorPalette.veryLightGrey,
		paddingHorizontal: 10,
		marginVertical: 5,
	},
});

export default CustomInput;
