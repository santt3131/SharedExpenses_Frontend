import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Button,
} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import axios from "axios";
import Moment from "moment";
import Global from "../../../global";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";

const DetailPayment = ({ objPayment }) => {
	const [userPayment, setLoadUserPayment] = useState(null);

	if (objPayment === null || objPayment === undefined) {
		return <CustomSpinner />;
	}

	let loadUserPayment = async (userId) => {
		if (userId) {
			const response = await fetch(`${Global.server}/users/${userId}`);
			const json = await response.json();
			setLoadUserPayment(json.results[0]);
		}
	};

	if (objPayment.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.initialText}>Don't you have any payment yet?</Text>
			</View>
		);
	}

	useEffect(() => {
		loadUserPayment(objPayment?.userToId);
	}, []);

	return (
		<>
			{objPayment?.userToId !== null ? (
				<>
					<View style={styles.expenseRow}>
						<Text>Note: {objPayment.note}</Text>
						<Text>{Moment(objPayment.date).format("DD/MM/YYYY")}</Text>
					</View>
					<View style={styles.expenseRow}>
						{userPayment !== null ? (
							<Text>You have made a payment to {userPayment.name}</Text>
						) : (
							<Text>Nothing to display</Text>
						)}
						<Text>Amount: {objPayment.quantity.$numberDecimal}€</Text>
					</View>
				</>
			) : (
				<Text>Nothing to display</Text>
			)}
		</>
	);
};

const ExpensesListScreenOwe = ({ userId, amount }) => {
	const [userOwe, setUserOwe] = useState(null);

	let loadUserOwe = async (userId) => {
		if (userId) {
			const response = await fetch(`${Global.server}/users/${userId}`);
			const json = await response.json();
			setUserOwe(json.results[0]);
		}
	};

	useEffect(() => {
		loadUserOwe(userId);
	}, []);

	if (userOwe === null || userOwe === undefined) {
		return <CustomSpinner />;
	}

	if (userOwe.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.initialText}>No one owes you?</Text>
			</View>
		);
	}

	return (
		<>
			{userOwe !== null ? (
				<>
					<Text style={styles.boldSmallLight}>
						<Image
							source={require("../../../assets/icons/check.png")}
							fadeDuration={0}
							style={{ width: 20, height: 20 }}
						/>
						{userOwe.name} : {amount}€
					</Text>
				</>
			) : (
				<Text>Nothing to display</Text>
			)}
		</>
	);
};

const ExpensesListScreen = () => {
	const navigation = useNavigation();
	const [expensesList, setExpensesList] = useState(null);
	//const [userPayment, setLoadUserPayment] = useState(null);
	// const [userOwe, setUserOwe] = useState(null);

	useEffect(() => {
		onPressList();
	}, []);

	const onPressAdd = () => {
		navigation.navigate("ExpensesAdd");
	};

	const onPressList = () => {
		axios
			.get(`${Global.server}/users/${Global.authUserId}/expenses`, {})
			.then(function (response) {
				const expensesList = response.data.results;
				setExpensesList(expensesList);
			})
			.catch(function (error) {
				alert(error.message);
			});
		navigation.navigate("Expenses");
	};

	if (expensesList === null || expensesList === undefined) {
		return <CustomSpinner />;
	}

	if (expensesList.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.initialText}>Don't you have any expenses yet?</Text>
			</View>
		);
	}

	const handlerPaid = (users) => {
		const objFoundByUser = users.find(
			(obj) => obj.userId === Global.authUserId
		);
		return objFoundByUser.paid.$numberDecimal;
	};

	const handlerLent = (users) => {
		let lent = 0;
		const objFoundByUser = users.find(
			(obj) => obj.userId === Global.authUserId
		);
		lent =
			objFoundByUser.paid.$numberDecimal -
			objFoundByUser.amountShouldPay?.$numberDecimal;
		//Si es positivo es que PRESTO
		//Si es negativo es que DEBE
		return lent;
	};

	const handlerPayments = (payments) => {
		if(payments) {
			let objFoundPaymentByUser = payments.filter(
				(obj) => obj.userFromId === Global.authUserId
			);
			return objFoundPaymentByUser;
		}
	};
	

	const handlerPeopleOweMe = (users) => {
		const peopleOweMe = users.filter(
			(obj) => obj.userId !== Global.authUserId && obj.debt.$numberDecimal > 0
		);

		return peopleOweMe;
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<CustomTopbar
				screenTitle="Expenses"
				onPressAdd={onPressAdd}
				onPressList={onPressList}
				addDisabled={false}
				listDisabled={true}
				sectionIcon="wallet"
				leftIcon="plus"
				rightIcon="list"
			/>
			<View style={styles.container}>
				{expensesList.map(
					({ title, date, expenseTotal, users, payments }, index) => (
						<View key={index} style={styles.expenseContainer}>
							<View style={styles.expenseData}>
								<Text style={styles.bold}>{title}</Text>

								<View style={styles.expenseRow}>
									<Text style={styles.subtitle}>
										Total Payment: {expenseTotal.$numberDecimal}€
									</Text>
									<Text style={styles.subtitle}>
										{Moment(date).format("DD/MM/YYYY")}
									</Text>
								</View>

								<Text style={styles.boldSmall}>Initial account:</Text>
								<View style={styles.expenseRow}>
									<Text>You paid: {handlerPaid(users)}€</Text>

									{handlerLent(users) > 0 ? (
										<Text style={styles.lent}>
											You lent: {handlerLent(users)}€
										</Text>
									) : (
										<Text style={styles.owe}>
											You Owe: {Math.abs(handlerLent(users))}€
										</Text>
									)}
								</View>

								<Text style={styles.boldSmall}>Payment Detail:</Text>
								{handlerPayments(payments).length > 0 ? (
									handlerPayments(payments).map((objPayment, index) => {
										return (
											<View key={index}>
												<DetailPayment objPayment={objPayment}></DetailPayment>
											</View>
										);
									})
								) : handlerLent(users) > 0 ? (
									<Text style={[styles.alert, styles.center]}>
										Payment completed
									</Text>
								) : (
									<Text style={styles.center}>
										You have not made any payment so far
									</Text>
								)}

								{handlerLent(users) > 0 ? (
									<Text style={styles.boldSmall}>People who owe you:</Text>
								) : null}

								{handlerLent(users) > 0
									? handlerPeopleOweMe(users).length > 0
										? handlerPeopleOweMe(users).map((objUser, index) => {
												return (
													<View key={index}>
														<ExpensesListScreenOwe
															userId={objUser?.userId}
															amount={objUser?.debt.$numberDecimal}
														></ExpensesListScreenOwe>
													</View>
												);
										  })
										: null
									: null}
							</View>
						</View>
					)
				)}
			</View>
		</ScrollView>
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
	expenseContainer: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
	expenseData: {
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
	expenseRow: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "space-around",
		padding: 2,
	},
	subtitle: {
		color: ColorPalette.primaryBlue,
		fontSize: Size.ls,
		fontWeight: "600",
	},
	center: {
		textAlign: "center",
		padding: 3,
	},
	bold: {
		color: ColorPalette.primaryBlue,
		fontSize: Size.xm,
		fontWeight: "bold",
	},
	boldSmall: {
		color: ColorPalette.primaryBlack,
		fontSize: Size.ls,
		fontWeight: "bold",
	},
	boldSmallLight: {
		color: ColorPalette.primaryBlack,
		fontSize: Size.ms,
		fontWeight: "500",
	},
	lent: {
		color: ColorPalette.secondaryGreen,
		fontSize: Size.ms,
		fontWeight: "500",
	},
	owe: {
		color: ColorPalette.primaryRed,
		fontSize: Size.ms,
		fontWeight: "500",
	},
	alert: {
		color: ColorPalette.primaryRed,
	},
});

export default ExpensesListScreen;
