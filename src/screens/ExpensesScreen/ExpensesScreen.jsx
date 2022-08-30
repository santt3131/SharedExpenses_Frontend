import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity } from "react-native";
import Collapsible from 'react-native-collapsible';
import { StatusBar } from "expo-status-bar";
import { ColorPalette, Size } from "../../../appStyles";
import CustomDropdown from "../../components/CustomDropdown";
import CustomModal from "../../components/CustomModal";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import Global from "../../../global";
import { FontAwesome5  } from '@expo/vector-icons'; 
import CustomTopbar from "../../components/CustomTopbar/CustomTopbar";
//import numbro from 'numbro'
import PaymentDistributionSection from "../../components/PaymentDistribution/PaymentDistributionSection";


const screenTitle = "Expenses";

const ExprensesScreen = () => {
	const TEXT_REGEX = /^[a-zA-Z0-9_ ]*$/;
	const NUMBER_REGEX = /^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/;
	const [collapsCategory, setcollapsCategory] = useState(true);
	const [collapsTitle, setcollapsTitle] = useState(true);
	const [collapsShareMethod, setcollapsShareMethod] = useState(true);

	const toggleCategory = () => {
		setcollapsCategory(!collapsCategory);
  	};
	const toggleTitle = () => {
		setcollapsTitle(!collapsTitle);
  	};
	const toggleShareMethod = () => {
		setcollapsShareMethod(!collapsShareMethod);
  	};

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
			expenseTotal: 0,
		},
	});
	
	const [expTotal, setExpTotal] = useState(null)
	useEffect(() => {
	  distributePayments();
	}, [expTotal])
	
	console.log('\n\nTotal spending: ', expTotal);
	//const expTotal = watch("expenseTotal");
	
	const [arrayDesiredPay, setarrayDesiredPay] = useState([]); //Pago deseado
	console.log('shares: ', arrayDesiredPay)

	const distributePayments = () => {
		let shareArray = [];
		let userShareArray = [];
		let userShare = 0;

		if (expTotal === null) {
			console.log("Introduce the amount spended in the field 'How Much' ");
			setmodalVisible(true);
			trigger();
		} 
		if(userByGroupId && expTotal) {
			setmodalVisible(false);
			let numberOfUser = userByGroupId.length
			if(userByGroupId) {
				userShare = expTotal / numberOfUser;
			} 

			for(let i = 0; i < numberOfUser; i++) {
				let roundedShare = Math.round((userShare + Number.EPSILON) * 100) / 100
				shareArray.push(roundedShare.toString())
			}
			userShareArray = userByGroupId.map(function(item, index) {
				return(
					{ id: item._id, userName: item.name, toPay: shareArray[index]}
					);
			})
			setarrayDesiredPay(userShareArray);
		}
	};
	
	//console.log('user Share array: ', userShareArray)

	const onSubmit = (data) => {
		data.categories = selectCategories.category;
		data.division = selectDivision.division;
		console.log('aqui', data);
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
	const [CategoryList, setCategoryList] = useState(null);

	const loadCategories = async () => {
		const response = await fetch(`${Global.server}/categories/`);
		const json = await response.json();
		setCategoryList(json);
	};
	//console.log(CategoryList)
	useEffect(() => {
		loadCategories();
	}, []);


	//1.2-Select
	const [selectCategories, setselectCategories] = useState(null);
	const selectedCategories = (dataSelected) => {
		setselectCategories(dataSelected);
	};
	console.log('category: ', selectCategories)
	//Método de división
	const arraySharingMethod = {
		results: [
			{
				_id: "62e6f9f2d4bb142140b63c91",
				category: "Even (equal parts)",
			},
			{
				_id: "62e6f9fc1375baa55c88354b",
				category: "Not even",
			},
			
		],
	};

	const [selectDivision, setSelectDivision] = useState(undefined);
	
	//Modal
	const [modalVisible, setmodalVisible] = useState(false);


	//1.4 Set Debe (con input de paid)
	const [debt, setdebt] = useState("");
	if (debt) {
		console.log("debt es", debt);
	}

	//PRUEBA
	const [paidArrayValues, setpaidArrayValues] = useState([]);
	const [debtArrayValues, setdebtArrayValues] = useState([]);

	const handleChangePaid = (index, name, value) => {
		setpaidArrayValues([...paidArrayValues, { [name]: +value }]);
		let debtValue = arrayDesiredPay[index] / value;
		setdebtArrayValues([...debtArrayValues, { [name]: +debtValue }]);
	};

	//console.log("todos los valores de PAID son ", paidArrayValues);
	//console.log("todos los valores de DEBT son ", debtArrayValues);

	let timestamp = Date.now();	
	let date = new Date(timestamp*1000);
	let formatedDay = "Date: "+date.getDate()+
			"/"+(date.getMonth()+1)+
			"/"+date.getFullYear()+
			" "+date.getHours()+
			":"+date.getMinutes()+
			":"+date.getSeconds();


	return (
		<View style={{flex:1}}>
			<StatusBar/>
			<CustomTopbar screenTitle={screenTitle} sectionIcon='euro-sign'/>

			<View style={styles.totalCostContainer}>
				<Text style={styles.categoryTitle}>How much?</Text>
				<TextInput
					name="expenseTotal"
					placeholder="total cost"
					control={control}
                    onChangeText={(text) => { setExpTotal(text) }}
					onEndEditing={(text) => { distributePayments(text) }}
					
					//onChange={console.log("expenseTotal es : ", expTotal)}
					// onChange={console.log(
						// 	"expenseTotal es : ",
					// 	getValues("expenseTotal")
					// )}
					keyboardType='number-pad'
					rules={{
						required: "Total cost must be a valid number",
						pattern: { value: NUMBER_REGEX, message: "Total cost is invalid" },
					}}
					style={[styles.totalTextInput, {paddingVertical:0,}]}
				/>
			</View>
				
			<ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
				
				
				<TouchableOpacity onPress={toggleCategory}>
					<View style={{flexDirection:'row'}}>
						<Text style={styles.categoryTitle}>Select a Category</Text>
						<FontAwesome5  name={ selectCategories === undefined ? "question" : "check"}
						size={Size.ls} color={ColorPalette.primarySeance} style={{marginTop: 13, marginLeft:0}}/>
					</View>
				</TouchableOpacity>
				<Collapsible collapsed={collapsCategory} align="center">
					<CustomDropdown
					title="Categorias"
					listdrop={CategoryList}
					selected={obj => selectedCategories(obj.category)}
					onValueChange={(_id, category) =>
							setselectCategories(category)							
						}
					></CustomDropdown>
				</Collapsible>

				<TouchableOpacity onPress={toggleTitle}> 
					<View style={{flexDirection:'row'}}>
						<Text style={styles.categoryTitle}>A name for this expense</Text>
						<FontAwesome5  name="question" size={Size.ls} color={ColorPalette.primarySeance} style={{marginTop: 13, marginLeft:0}}/>
					</View>
				</TouchableOpacity>
				<Collapsible collapsed={collapsTitle} align="center"> 
					<TextInput
						name="title"
						value={`We spend on ${selectedCategories} the ${formatedDay}`}
						control={control}
						//style={styles.inputControll}
						rules={{
							required: "Title is required",
							pattern: { value: TEXT_REGEX, message: "Title is invalid" },
						}}
						style={styles.totalTextInput}
					/>
				</Collapsible>	
				
				
				<PaymentDistributionSection dataArray={arrayDesiredPay}/>
					

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
						{arrayDesiredPay?.map((item, index) => {
							let key = `paid_deseado_${index}`;
							return (
								<Row key={key} style={styles.cellHeader}>
									<Text>{item.toPay}</Text>
								</Row>
							);
						})}
					</Col>
					<Col size={30}>
						<Row key="paid" style={styles.cellHeader}>
							<Text>PAID</Text>
						</Row>
						{userByGroupId?.map((data, index) => {
							let nameKey = `paid_${data._id}`;
							return (
								<Row key={nameKey} style={styles.cellInput}>
									<TextInput
										onChangeText={(text) =>
											handleChangePaid(index, data._id, text)
										}
										control={control}
										name={nameKey}
										label={nameKey}
									/>
								</Row>
							);
						})}

						{/* {userByGroupId?.map((data, index) => {
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
						})} */}
					</Col>
					<Col size={30}>
						<Row key="debt" style={styles.cellHeader}>
							<Text>DEBT</Text>
						</Row>
						{debtArrayValues?.map((data, index) => {
							let key = Object.keys(data)[0];
							let keyTotal = `user_${key}`;
							return (
								<Row key={keyTotal} style={styles.cellHeader}>
									<Text>{data[key]}</Text>
								</Row>
							);
						})}
						{/* {userByGroupId?.map((data) => {
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
						})} */}
					</Col>
				</Grid>

				<CustomButton text="Add" onPress={handleSubmit(onSubmit)} />
				{modalVisible ? (
					<CustomModal
						title="Data needed"
						message="Please introduce a total in the field   'How much'"
						isShown={true}
					></CustomModal>
				) : null}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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
	
	inputControll: {
		width:'40%',
	},
	categoryTitle: {
        fontSize: Size.mm,
        marginVertical: 10,
        marginLeft: 10,
		marginRight: 5,
        color: ColorPalette.primaryBlack
    },
	item: {
		width: 280,
		opacity: 1,
		height: 40,
		marginTop: 5,
		marginLeft: 10,
		marginBottom: 15
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'end',
		alignItems: 'center',
		height: 40,
		marginTop: 5,
		marginBottom: 0,
	},
	totalCostContainer: {
		flexDirection: 'row',
		marginBottom: 10,
		minWidth:'40%',
	},
	totalTextInput: {
		fontSize: 20, 
		borderColor: ColorPalette.primaryGray, 
		borderWidth: 1, 
		borderRadius: 5, 
		marginHorizontal: 5,
		marginVertical: 0,
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: ColorPalette.primaryWhite
	},
	otherTextInput: {
		minWidth: '20%',
		fontSize: 18, 
		borderColor: ColorPalette.primaryGray, 
		borderWidth: 1, 
		borderRadius: 5, 
		marginLeft: 5,
		marginVertical: 0,
		paddingHorizontal: 10,
		paddingVertical: 7,
		backgroundColor: ColorPalette.primaryWhite
	},
	plainTextInput: {
		minWidth: '20%',
		fontSize: 18, 
		borderColor: ColorPalette.primaryGray, 
		borderWidth: 1, 
		borderRadius: 5, 
		marginLeft: 5,
		marginVertical: 0,
		paddingHorizontal: 10,
		paddingVertical: 10,

	},
	userName: {
		width:'70%',
		fontSize: Size.mm,
		textAlign: 'right',
		marginLeft: 5,
		marginBottom:0
	},
	paymentConcepts: {
		width:'70%',
		fontSize: Size.xm,
		textAlign: 'right',
		marginBottom:0,
		marginLeft: 5
	},
	debValue: {
		fontSize: Size.lm,
		fontWeight: 'bold',
		marginBottom: 0,
		color: ColorPalette.primaryBlue
	}
});

export default ExprensesScreen;
