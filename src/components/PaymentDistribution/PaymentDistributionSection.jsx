import { StyleSheet, Text, View, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ColorPalette, Size } from '../../../appStyles'


const PaymentDistributionSection = ({
    expTotal,
    usersArray,
}) => {
    
    console.log('total inside component: ', expTotal);
    console.log('users array: ', usersArray);
    const [newUserData, setNewUserData] = useState(null);
    useEffect(() => {
        distributePayments()
    }, [expTotal])


    const [defaultShareArray, setDefaultShareArray] = useState(); //Pago deseado

	const distributePayments = () => {
		let shareArray = [];
		let sharesArray = [];
		let userShare = 0;

		if (usersArray && expTotal) {
			let numberOfUser = usersArray.length;
            userShare = expTotal / numberOfUser;

			for (let i = 0; i < numberOfUser; i++) {
				let roundedShare = Math.round((userShare + Number.EPSILON) * 100) / 100;
				shareArray.push({toPay: roundedShare.toString(), alreadyPaid: '0', settleSharing: roundedShare.toString()});
			}
			sharesArray = usersArray.map(function (item, index) {
				return (
                    { id: item._id, userName: item.name, ...shareArray[index]}
                    );
			});
			setDefaultShareArray(sharesArray);
		}
	};
    console.log("default shares: ", defaultShareArray);
    
     

    const handleToPayChange = (name, value, id) => {
        
        const newToPayArray = [...defaultShareArray];
        for(let i; i < newToPayArray.length; i++) {
            if(newToPayArray[i].id === id)
                newToPayArray[i] = {
                    ...newToPayArray[i],
                    [name]: value
            };
        }
        setDefaultShareArray(newToPayArray);
    };
    console.log('new data: ', defaultShareArray);



    //Debts (only if already paid < user share)
	const [debt, setdebt] = useState("");

    const checkDebts= () => {
        let takeAction = ''
        if(userShare === null || userShare === undefined || userShare === 0) {
            takeAction = 'you pay'
        }

    }
    
    if (defaultShareArray === null || defaultShareArray === undefined || defaultShareArray.length === 0) {
        return (
            <View>
                <Text>Testing the component</Text>
            </View>
        );
    }

    

  return (
        
    defaultShareArray.map(({id, userName, toPay, alreadyPaid, settleSharing}, index) => {
        return(
            <View key={index} style={styles.container}>
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.userName]}> {userName}'s share </Text>
                    <TextInput
                        name='toPay'
                        style={[styles.otherTextInput]}
                        keyboardType='number-pad'
                        value={toPay}
                        defaultValue={toPay}
                        onEndEditing={(val) => console.log(val)}
                    ></TextInput>
                </View>
            
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>Already paid</Text>
                    <TextInput style={[styles.otherTextInput]}
                        name='alreadyPaid'
                        keyboardType='number-pad'
                        defaultValue={alreadyPaid}
                    ></TextInput>
                </View>
            
            
                <View style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>Settle</Text>
                    <Text 
                        name='settleSharing'
                        style={[styles.plainTextInput]}
                    >{settleSharing}</Text>
                </View>
                    <Text style={{backgroundColor:ColorPalette.primaryGray, 
                        height:1, 
                        marginBottom: 15,
                    marginTop: 10}}></Text>	
            </View>
        );

    })
    
  )
}

export default PaymentDistributionSection

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },
	categoryTitle: {
        fontSize: Size.mm,
        marginVertical: 10,
        marginLeft: 10,
		marginRight: 5,
        color: ColorPalette.primaryBlack
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
		marginBottom: 20,
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
        height: 40,
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
        height: 40,
		fontSize: 18, 
        fontWeight:'bold',
		borderColor: ColorPalette.primaryGray, 
		borderWidth: 1, 
		borderRadius: 5, 
		marginLeft: 5,
		marginVertical: 0,
		paddingHorizontal: 10,
		paddingVertical: 12,

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
	
})