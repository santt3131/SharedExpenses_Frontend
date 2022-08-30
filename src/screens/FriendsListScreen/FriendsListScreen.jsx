import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import CustomFriendsItem from "../../components/CustomFriendsItem";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Global from "../../../global";

const FriendsListScreen = () => {
	const navigation = useNavigation();

	const [friends, setFriends] = useState([]);

	useEffect(() => {
		onPressList();
	}, []);

	const onPressAdd = async () => {
		navigation.navigate("FriendsAdd");
	};

	const onPressList = () => {
		axios
			.get(`${Global.server}/users/${Global.authUserId}/friends`, {})
			.then(function (response) {
				setFriends(response.data.results[0].friends);
			})
			.catch(function (error) {
				alert(error.message);
			});

		navigation.navigate("Friends");
	};

	return (
		<>
			<CustomTopbar
				screenTitle="Friends"
				onPressAdd={onPressAdd}
				onPressList={onPressList}
				addDisabled={false}
				listDisabled={true}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<Text style={styles.text}>My Friends</Text>
					<CustomFriendsItem friends={friends} />
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
	},
	text: {
		color: ColorPalette.primaryBlue,
		fontSize: Size.xl,
		margin: 10,
		fontWeight: "bold",
		alignSelf: "center",
	},
});

export default FriendsListScreen;
