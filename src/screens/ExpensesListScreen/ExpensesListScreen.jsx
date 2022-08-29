import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomTopbar from "../../components/CustomTopbar";
import axios from "axios";
import Moment from "moment";
import Global from "../../../global";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";

const ExpensesListScreen = () => {
	//TODO - A espera del login
	const personLoguin = {
		_id: "62b5e88ba6e78636d6488645",
		name: "Santiago Bruno",
		email: "santt31@gmail.com",
	};
	const navigation = useNavigation();
	const [expensesList, setExpensesList] = useState(null);
	useEffect(() => {
		onPressList();
	}, []);

	const onPressAdd = () => {
		navigation.navigate("ExpensesAdd");
	};

	const onPressList = () => {
		axios
			.get("http://localhost:8080/users/62b5e88ba6e78636d6488645/expenses", {})
			.then(function (response) {
				const expensesList = response.data.results;
				setExpensesList(expensesList);
			})
			.catch(function (error) {
				alert(error.message);
			});
		navigation.navigate("Expenses");
	};

	const [userPayment, setLoadUserPayment] = useState(null);

	let loadUserPayment = async (idUser) => {
		if (idUser) {
			const response = await fetch(`${Global.server}/users/${idUser}`);
			const json = await response.json();
			setLoadUserPayment(json.results[0]);
		}
	};

	useEffect(() => {
		loadUserPayment();
	}, []);

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
		const objFoundByUser = users.find((obj) => obj.userId === personLoguin._id);
		return objFoundByUser.paid.$numberDecimal;
	};

	const handlerLent = (users) => {
		let lent = 0;
		const objFoundByUser = users.find((obj) => obj.userId === personLoguin._id);
		lent =
			objFoundByUser.paid.$numberDecimal -
			objFoundByUser.amountShouldPay?.$numberDecimal;
		//Si es positivo es que PRESTO
		//Si es negativo es que DEBE
		return lent;
	};

	const handlerPayments = (payments) => {
		let objFoundPaymentByUser = payments.filter(
			(obj) => obj.userFromId === personLoguin._id
		);

		return objFoundPaymentByUser;
	};

	const handlerPeopleOweMe = (users) => {
		const peopleOweMe = users.filter(
			(obj) => obj.userId !== personLoguin._id && obj.debt.$numberDecimal > 0
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
			/>
			<View style={styles.container}>
				{expensesList.map(
					({ title, date, expenseTotal, users, payments }, index) => (
						<View key={index} style={styles.expenseContainer}>
							<View style={styles.expenseData}>
								<Text style={styles.bold}>{title}</Text>
								<Text>{Moment(date).format("DD/MM/YYYY")}</Text>
								<Text>Gasto total: {expenseTotal.$numberDecimal}€</Text>
								<Text style={styles.boldSmall}>Cuenta inicial:</Text>
								<Text>Pagaste: {handlerPaid(users)}€</Text>

								{handlerLent(users) > 0 ? (
									<Text>Prestaste: {handlerLent(users)}€</Text>
								) : (
									<Text>Debes: {Math.abs(handlerLent(users))}€</Text>
								)}
								<Text style={styles.boldSmall}>Detalle de Pagos:</Text>
								{handlerPayments(payments).length > 0 ? (
									handlerPayments(payments).map((objPayment, index) => {
										{
											loadUserPayment(objPayment?.userToId);
										}
										return (
											<>
												<Text key={`note_${index}`}>
													Nota: {objPayment.note}
												</Text>
												<Text key={`date_${index}`}>
													{Moment(objPayment.date).format("DD/MM/YYYY")}
												</Text>

												{userPayment !== null ? (
													<Text key={`payment_${index}`}>
														Haz realizado un pago a {userPayment.name}
													</Text>
												) : (
													<Text>nada para visualizar</Text>
												)}

												<Text key={`quantity_${index}`}>
													Cantidad: {objPayment.quantity.$numberDecimal}
												</Text>
											</>
										);
									})
								) : handlerLent(users) > 0 ? (
									<Text>Pago completado</Text>
								) : (
									<Text>No ha realizado ningún pago hasta al momento</Text>
								)}

								{handlerLent(users) > 0 ? (
									<Text style={styles.boldSmall}>Personas que te deben:</Text>
								) : null}

								{handlerLent(users) > 0
									? handlerPeopleOweMe(users).length > 0
										? handlerPeopleOweMe(users).map((objUser, index) => {
												return (
													<>
														<Text>{objUser.userId}</Text>
														<Text>Cantidad:{objUser.debt.$numberDecimal}</Text>
													</>
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
});

export default ExpensesListScreen;
