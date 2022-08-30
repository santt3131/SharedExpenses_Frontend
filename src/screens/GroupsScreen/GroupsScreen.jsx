import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	Modal,
} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { StatusBar } from "expo-status-bar";
import Global from "../../../global";
//import CustomSearch from "../../components/CustomSearch";
const axios = require("axios");
//import RetrievedItem, { checked } from "../../components/CustomSearch/RetrievedItem";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const axiosInstance = axios.create({
	baseURL: Global.baseUrl,
	//timeout: 1000,
	headers: {
		Accept: "application/json",
		//'Authorization': 'token <your-token-here>'
	},
	withCredentials: false, // hasta que no hayamos implementado el acceso con token
});

const GroupsScreen = () => {
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [checked, setChecked] = useState([]);

	//main function: gets the data from th API =======================>
	const getItems = async () => {
		try {
			const response = await axiosInstance({
				method: "get",
				url: "/groups",
				/*params: {
          id: ######
        }*/
			});

			const json = await response.data;
			//console.log("{\n\n\n} Response from the backend ==========================> {\n\n\n\n}", json.results);
			setMasterDataSource(json.results);
			setFilteredDataSource(json.results);
			setLoading(false);
		} catch (error) {
			setMasterDataSource([]);
			setFilteredDataSource([]);
			setLoading(true);
			console.error(error);
		}
	}; // end of getItems

	useEffect(() => {
		getItems();
	}, []);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<StatusBar />
				<View style={styles.searchWrapperStyle}>
					<FontAwesome
						name="search"
						size={Size.xm}
						color={ColorPalette.primaryRouge}
						style={styles.iconStyle}
					/>
					<TextInput
						placeholder="Search"
						placeholderTextColor={ColorPalette.primaryRouge}
						style={styles.searchInputStyle}
						value={search}
						onChangeText={(filterTerm) => {
							searchFilterFunction(filterTerm);
						}}
					/>

					<FontAwesome
						name="close"
						sise={Size.lm}
						color={ColorPalette.primaryRouge}
						style={styles.iconStyle}
					/>
				</View>
				<ActivityIndicator style={styles.loadingStyle} />
			</View>
		);
	} // end of loading

	// // filter or search on screen =======================>
	const searchFilterFunction = (filterTerm) => {
		if (filterTerm) {
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				let titleandDescription = item.groupName + " " + item.groupDescription;
				const itemData = titleandDescription
					? titleandDescription.toUpperCase()
					: "";
				const filterData = filterTerm.toUpperCase();
				return itemData.indexOf(filterData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(filterTerm);
		} else {
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(filterTerm);
		}
	}; // end of filter

	// callback of the render function ========================>
	const onValueChange = (item) => {
		const newIds = [...checked];
		const index = newIds.indexOf(item._id);
		if (index > -1) {
			newIds.splice(index, 1);
		} else {
			newIds.push(item._id);
		}
		setChecked(newIds);
	};

	// view of each record composing the list =====================>
	const renderItem = ({ item }) => {
		return (
			<View style={styles.itemList}>
				<View>
					<Text style={styles.itemTitle}>{item.groupName}</Text>
					<Text style={styles.itemText}>{item.groupDescription}</Text>
				</View>
				<View>
					<Checkbox
						style={styles.checkbox}
						value={checked.includes(item._id)}
						onValueChange={() => {
							const newIds = [...checked];
							const index = newIds.indexOf(item._id);
							if (index > -1) {
								newIds.splice(index, 1);
							} else {
								newIds.push(item._id);
							}
							setChecked(newIds);
						}}
						color={
							checked ? ColorPalette.primaryGreen : ColorPalette.primaryGray
						}
					/>
				</View>
			</View>
		);
	};

	const clearSearchBar = () => {
		setSearch("");
		setFilteredDataSource(masterDataSource);
	};

	return (
		// the view
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.searchWrapperStyle}>
				<View style={styles.searchBarStyle}>
					<FontAwesome
						name="search"
						size={Size.xm}
						color={ColorPalette.primaryWhite}
						style={styles.iconStyle}
					/>
					<TextInput
						placeholder="Search"
						placeholderTextColor={ColorPalette.primaryWhite}
						style={styles.searchInputStyle}
						value={search}
						onChangeText={(filterTerm) => {
							searchFilterFunction(filterTerm);
						}}
					/>
					<FontAwesome
						name="close"
						sise={24}
						color={ColorPalette.primaryWhite}
						style={styles.iconStyle}
						onPress={() => clearSearchBar()}
					/>
				</View>
				<TouchableOpacity
					style={styles.addButtonStyle}
					onPress={() => showCreateGroup()}
					accessibilityLabel={"Add a new group"}
				>
					<Text style={styles.buttonTitle}>Add</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.listWrapper}>
				<FlatList
					data={filteredDataSource}
					renderItem={renderItem}
					extraData={checked}
					keyExtractor={(item) => item._id}
				/>
			</View>
		</View>
	); // end of the view
};

const styles = StyleSheet.create({
	// containers
	container: {
		flex: 1,
		justifyContent: "start",
		marginTop: Size.xl,
	},
	listWrapper: {
		padding: Size.xs,
	},

	screenTitle: {
		paddingTop: Size.xl * 5,
		fontSize: Size.xl,
		alignSelf: "center",
		marginTop: 20,
		color: ColorPalette.primaryBlue,
		fontWeight: "bold",
	},

	itemTitle: {
		fontSize: Size.xm,
		fontWeight: "bold",
		marginBottom: Size.xxs,
	},
	itemText: {
		fontSize: Size.xm,
		marginBottom: Size.xs,
	},

	// search component
	searchWrapperStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	searchBarStyle: {
		flexDirection: "row",
		flex: 1,
		backgroundColor: ColorPalette.primaryGreen,
		marginRight: Size.xss,
		borderRadius: 10,
		marginLeft: Size.xss,
	},
	searchInputStyle: {
		flex: 1,
		fontSize: Size.mm,
		paddingVertical: Size.xss,
		paddingHorizontal: 0,
		margin: 0,
		backgroundColor: ColorPalette.primaryGreen,
		color: ColorPalette.primaryWhite,
	},

	iconStyle: {
		margin: Size.xs,
	},
	addButtonStyle: {
		marginRight: Size.xss,
		backgroundColor: ColorPalette.primaryGreen,
		justifyContent: "center",
		alignItems: "center",
		height: 45,
		width: 60,
		borderRadius: 10,
	},
	buttonTitle: {
		fontSize: Size.mm,
		color: ColorPalette.primaryWhite,
	},
	loadingStyle: {
		flex: 1,
		marginTop: Size.xl * 7,
		alignItems: "center",
		size: Size.xxl,
	},

	// list components
	itemList: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: Size.xs,
		borderBottomWidth: 1,
		borderColor: ColorPalette.veryLightGrey,
	},
	itemTitle: {
		fontSize: Size.xm,
		fontWeight: "bold",
		marginBottom: Size.xxs,
	},
	itemText: {
		fontSize: Size.xm,
		marginBottom: Size.xs,
	},
	checkbox: {
		marginRight: Size.xss,
		borderColor: ColorPalette.primaryGray,
	},

	// modal styles
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
});

export default GroupsScreen;
