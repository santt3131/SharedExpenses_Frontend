import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const CustomGroupsItem = ({ groups }) => {
	const navigation = useNavigation();

	if (groups === null || groups === undefined) {
		return <CustomSpinner />;
	}

	if (groups.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.initialText}>Don't you have any groups yet?</Text>
			</View>
		);
	}

	const onEditPress = (groupId) => {
		axios
			.get(`${Global.server}/groups/${groupId}`, {})
			.then(function (response) {
				// handle success
				const groupName = response.data.results[0].groupName;
				const groupDescription = response.data.results[0].groupDescription;
				const users = response.data.results[0].users;
				navigation.navigate("GroupsUpdate", {
					groupId,
					groupName,
					groupDescription,
					users,
				});
			})
			.catch(function (error) {
				// handle error
				alert(error.response.data.error);
			});
	};

	const onDeletePress = (groupId) => {
		axios
			.delete(`${Global.server}/groups/${groupId}`, {})
			.then(function (response) {
				// handle success
				alert("Group deleted successfully");
			})
			.catch(function (error) {
				// handle error
				alert(error.response.data.error);
			});
	};

	return (
		<View style={styles.container}>
			{groups.map(({ _id, groupName, groupDescription, ownerId }) => (
				<View key={_id} style={styles.groupContainer}>
					<View style={styles.groupData}>
						<Text style={styles.groupName}>{groupName}</Text>
						<Text style={styles.groupEmail}>{groupDescription}</Text>
					</View>
					<View>
						{ownerId === Global.authUserId && (
							<>
								<Pressable
									style={styles.editButton}
									onPress={() => onEditPress(_id)}
								>
									<Text style={styles.groupButtonText}>Edit</Text>
								</Pressable>
								<Pressable
									style={styles.deleteButton}
									onPress={() => onDeletePress(_id)}
								>
									<Text style={styles.groupButtonText}>Delete</Text>
								</Pressable>
							</>
						)}
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	initialText: {
		flex: 1,
		color: ColorPalette.primaryGray,
		fontSize: Size.lm,
		textAlign: "center",
		fontWeight: "bold",
	},
	container: {
		display: "flex",
		alignSelf: "stretch",
		paddingLeft: 10,
		paddingRight: 10,
	},
	groupContainer: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
	groupData: {
		flex: 1,
		flexDirection: "column",
		paddingLeft: 10,
		paddingTop: 3,
		paddingBottom: 3,
		borderLeftColor: ColorPalette.primaryBlue,
		borderLeftWidth: 6,
		backgroundColor: ColorPalette.veryLightGrey,
		borderTopEndRadius: 4,
		borderBottomEndRadius: 4,
		marginRight: 2,
	},
	groupName: {
		color: ColorPalette.primaryBlack,
		fontSize: Size.xm,
		fontWeight: "bold",
	},
	groupEmail: {
		color: ColorPalette.primaryGray,
		fontSize: Size.ls,
	},
	editButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: ColorPalette.primaryBlue,
		borderRadius: 4,
		marginBottom: 2,
	},
	groupButtonText: {
		color: ColorPalette.primaryWhite,
		padding: 5,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	deleteButton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: ColorPalette.primaryRed,
		borderRadius: 4,
		width: 75,
	},
});

export default CustomGroupsItem;
