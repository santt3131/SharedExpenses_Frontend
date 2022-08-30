import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// fn clears the search box  ========================>
const clearSearchBar = () => {
	setSearch("");
	setFilteredDataSource(masterDataSource);
};

const CustomTopbar = ({
	screenTitle,
	onPressAdd,
	onPressList,
	addDisabled,
	listDisabled,
	sectionIcon,
}) => {
	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.topBar}>
				<FontAwesome5
					name="filter"
					size={Size.xm}
					color={ColorPalette.primaryWhite}
				/>
				<Text style={{ color: "white", flex: 1, fontSize: 22, margin: 5 }}>
					{screenTitle}
				</Text>
				<Text
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "bold",
						margin: 5,
					}}
				>
					x
				</Text>
			</View>
			<TouchableOpacity
				onPress={onPressAdd}
				style={styles.topBarButton}
				disabled={addDisabled}
			>
				<FontAwesome5
					name={sectionIcon}
					size={Size.xm}
					color={ColorPalette.primaryWhite}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onPressList}
				style={styles.topBarButton}
				disabled={listDisabled}
			>
				<FontAwesome5
					name="list"
					size={Size.xm}
					color={ColorPalette.primaryWhite}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		marginTop: Size.xm,
		marginBottom: Size.xs,
		marginHorizontal: 10,
		flexDirection: "row",
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
		alignItems: "center",
		backgroundColor: ColorPalette.primaryGreen,
		textTransform: "uppercase",
		paddingHorizontal: 5,
		marginRight: 5,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	topBarText: {
		margin: 5,
		color: ColorPalette.primaryWhite,
		fontSize: Size.lm,
		//fontWeight: "bold",
		//textTransform: "uppercase",
	},
	topBarButton: {
		width: 45,
		height: 45,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: ColorPalette.primaryGreen,
		marginLeft: 5,
	},
	topButtonText: {
		fontSize: Size.xs,
		//fontWeight: "bold",
		textTransform: "uppercase",
		color: ColorPalette.primaryWhite,
	},
});

export default CustomTopbar;
