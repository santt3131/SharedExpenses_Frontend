import { StyleSheet, Text, View, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ColorPalette, Size } from '../../../appStyles'


const PaymentDistributionSection = ({dataArray}) => {

    console.log('dataArray: ', dataArray)

    const [userShare, setUserShare] = useState([]);
    const [userSettle, setUserSettle] = useState([]);

    // check for debts

    const checkDebts= () => {
        let takeAction = ''
        if(userShare === null || userShare === undefined || userShare === 0) {
            takeAction = 'you pay'
        }

    }




    
    if (dataArray === null || dataArray === undefined) {
        return (
            <View>
                <Text>Testing the component</Text>
            </View>
        );
    }

     if (dataArray.length === 0) {
        return (
        <View>
            <Text>Testing the component</Text>
        </View>
        );
    }

  return (
        
    dataArray?.map((dataArray, takeAction) => {
        return(
            <View key={`user_${dataArray.id}`} style={styles.container}>
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.userName]}> {dataArray.userName}'s share </Text>
                    <TextInput 
                        style={[styles.otherTextInput]}
                        keyboardType='number-pad'
                        value={userShare}
                        defaultValue={dataArray.toPay}
                        onChangeText={(text) => {setUserShare(text)}}
                    ></TextInput>
                </View>
            
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>Already paid</Text>
                    <TextInput style={[styles.otherTextInput]}
                        keyboardType='number-pad'
                        defaultValue={'0.00'}
                    ></TextInput>
                </View>
            
            
                <View style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>{takeAction}</Text>
                    <Text 
                        style={[styles.plainTextInput]}
                    ></Text>
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