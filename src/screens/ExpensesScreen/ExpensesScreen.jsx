import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomDropdown from "../../components/CustomDropdown";
import CustomModal from "../../components/CustomModal";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import Global from "../../../global";

const ExprensesScreen = () => {
	const TEXT_REGEX = /^[a-zA-Z0-9_ ]*$/;
	const NUMBER_REGEX = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

	const {
		control,
		handleSubmit,
		watch,
		trigger,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			categories: "",
			division: "",
			expenseTotal: "0",
		},
	});

	const expTotal = watch("expenseTotal");

	const onSubmit = (data) => {
		data.categories = selectCategories.category;
		data.division = selectDivision.division;
		console.log(data);
		//navigation.navigate("Debts");
		const dataSend = {
			categoryId: "62b9d9eb355700006d004aa2", // lo traerá la otra pantalla c
		};

		//LO QUE MANDARE
		/**
		 {
			"categoryId": "62b9d9eb355700006d004aa2",
			"date": "2001-02-01T08:00:00.000+00:00",
			"note": "Prueba de creacion de expense",
			"title": "Expense de prueba",
			"expenseTotal": 50,
			"users": [
				{
				"userId": "62b5e88ba6e78636d6488645",
				"debt": 15,
				"paid": 30
				},
				{
				"userId": "62b5e88ba6e78636d6488646",
				"debt": 5,
				"paid": 20
				}
			],
				"groupId": "62b7383f5163f4de8bc0c007" 
			}
		 */
	};

	//0.
	/*Viene recargado desde el groupId*/
	const groupId = "62b737d75163f4de8bc0c006";
	const [userByGroupId, setuserByGroupId] = useState(null);

	const loadUserByGroupId = async () => {
		const response = await fetch(`${Global.server}/groups/${groupId}`);
		const json = await response.json();
		setuserByGroupId(json.results[0]?.users);
	};

	useEffect(() => {
		loadUserByGroupId();
	}, [groupId]);

	//1.Categorias
	//1.1-Loading data
	const [loadCategorieList, setloadCategorieList] = useState(null);

	const loadCategories = async () => {
		const response = await fetch(`${Global.server}/categories/`);
		const json = await response.json();
		setloadCategorieList(json);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	//1.2-Select
	const [selectCategories, setselectCategories] = useState(null);
	const selectedCategories = (dataSelected) => {
		setselectCategories(dataSelected);
	};

	//Método de división
	const arrayDivision = {
		results: [
			{
				_id: "62e6f9f2d4bb142140b63c91",
				category: "Equal parts",
			},
			{
				_id: "62e6f9fc1375baa55c88354b",
				category: "Percentages",
			},
			{
				_id: "62e6fa0b6e2ff2ef0f87881d",
				category: "Different parts",
			},
		],
	};

	const [selectDivision, setselectDivision] = useState("");
	const [arrayDesiredPay, setarrayDesiredPay] = useState([]); //1.3-Pago deseado

	//Modal
	const [modalVisible, setmodalVisible] = useState(false);

	const cbSelectedDivision = (division) => {
		setselectDivision(division);

		if (division.category === "Equal parts") {
			let lengthUser = userByGroupId.length;
			if (!expTotal) {
				console.log("no ha puesto gasto total TRUE");
				setmodalVisible(true);
				trigger();
				//console.log("el estado del modal es ", modalVisible);

				// <CustomModal
				// 		title="Mensaje de error"
				// 		message="Tiene que haber rellenado el gasto total"
				// 	></CustomModal>
			} else {
				console.log("HA puesto gasto total FALSE");
				setmodalVisible(false);
			}

			let equalPartsAmount = expTotal / lengthUser;
			let equalPartsArray = [];
			userByGroupId.forEach((el) => {
				equalPartsArray = [...equalPartsArray, equalPartsAmount];
			});
			setarrayDesiredPay(equalPartsArray);
		}

		//console.log("arrayDesiredPay es", arrayDesiredPay);
	};

	//1.4 Set Debe (con input de paid)
	const [debt, setdebt] = useState("");
	if (debt) {
		console.log("debt es", debt);
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				<Text
					style={{
						fontSize: Size.xl,
						alignSelf: "center",
						marginTop: 20,
						color: ColorPalette.primaryBlue,
						fontWeight: "bold",
					}}
				>
					Expenses Screen
				</Text>

				<CustomInput
					name="title"
					placeholder="expense title"
					control={control}
					rules={{
						required: "Title is required",
						pattern: { value: TEXT_REGEX, message: "Title is invalid" },
					}}
				/>

				<CustomDropdown
					title="Categorias"
					listdrop={loadCategorieList}
					selected={selectedCategories}
				></CustomDropdown>

				<CustomInput
					name="expenseTotal"
					placeholder="total cost"
					control={control}
					//onChange={console.log("expenseTotal es : ", expTotal)}
					onChange={console.log(
						"expenseTotal es : ",
						getValues("expenseTotal")
					)}
					rules={{
						required: "Total cost is required",
						pattern: { value: NUMBER_REGEX, message: "Total cost  is invalid" },
					}}
				/>

				<CustomDropdown
					title="División"
					listdrop={arrayDivision}
					selected={cbSelectedDivision}
				></CustomDropdown>

				{/*Probando */}
				<Grid>
					<Col size={20}>
						<Row style={styles.cellHeader}>
							<Text key="user">USER</Text>
						</Row>
						{userByGroupId?.map((data, index) => {
							let key = `user_${index}`;
							return (
								<Row key={key} style={styles.cellHeader}>
									<Text>{data.name}</Text>
								</Row>
							);
						})}
					</Col>
					<Col size={20}>
						<Row key="paid" style={styles.cellHeader}>
							<Text>PAGO DESEADO</Text>
						</Row>
						{/* <h1>TODO</h1> */}
						{arrayDesiredPay?.map((pay, index) => {
							let key = `paid_deseado_${index}`;
							return (
								<Row key={key} style={styles.cellHeader}>
									<Text>{pay}</Text>
								</Row>
							);
						})}
						{/* <Row key="paid2" style={styles.cellHeader}>
              <Text>30</Text>
            </Row>
            <Row key="paid3" style={styles.cellHeader}>
              <Text>30</Text>
            </Row>
            <Row key="paid4" style={styles.cellHeader}>
              <Text>30</Text>
            </Row> */}
					</Col>
					<Col size={30}>
						<Row key="paid" style={styles.cellHeader}>
							<Text>PAID</Text>
						</Row>
						{userByGroupId?.map((data, index) => {
							let nameKey = `paid_${data._id}`;
							//console.log("name es: ", nameKey);
							return (
								<Row key={nameKey} style={styles.cellInput}>
									<CustomInput
										name={nameKey}
										placeholder="0"
										control={control}
										// onChange={alert("soy paid")}
										rules={{
											required: "paid is required",
											pattern: {
												value: NUMBER_REGEX,
												message: "paid is invalid",
											},
										}}
									/>
								</Row>
							);
						})}
					</Col>
					<Col size={30}>
						<Row key="debt" style={styles.cellHeader}>
							<Text>DEBT</Text>
						</Row>

						{userByGroupId?.map((data) => {
							let nameKey = `debt_${data._id}`;
							return (
								<Row key={nameKey} style={styles.cellInput}>
									<CustomInput
										name={nameKey}
										placeholder="0"
										control={control}
										rules={{
											required: "debt is required",
											pattern: {
												value: NUMBER_REGEX,
												message: "debt is invalid",
											},
										}}
									/>
								</Row>
							);
						})}
					</Col>
				</Grid>

				<CustomButton text="Add" onPress={handleSubmit(onSubmit)} />
				{modalVisible ? (
					<CustomModal
						title="Mensaje de error"
						message="Tiene que haber rellenado el gasto total"
						isShown={true}
					></CustomModal>
				) : null}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 16,
		paddingTop: 100,
		backgroundColor: "#fff",
	},
	cellHeader: {
		borderWidth: 1,
		borderColor: "#ddd",
		height: 100,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cell: {
		borderWidth: 1,
		borderColor: "#ddd",
		height: 100,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cellInput: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		height: 100,
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
});

export default ExprensesScreen;
