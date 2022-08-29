import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'
import { ColorPalette, Size } from '../../../appStyles'


const PaymentDistributionSection = ({dataArray}) => {
    if (dataArray === null || dataArray === undefined) {
        return (
            <View style={styles.container}>
                <Text style={styles.initialText}>Don't you have any friends yet?</Text>
            </View>
        );
    }

     if (dataArray.length === 0) {
        return (
        <View style={styles.container}>
            <Text style={styles.initialText}>Don't you have any friends yet?</Text>
        </View>
        );
    }

  return (
        
    dataArray?.map((data, index) => {
        return(
            <View key={`user_${index}`}>
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.userName]}> {data.name}'s share </Text>
                    <TextInput 
                        
                        style={[styles.otherTextInput]}
                        keyboardType='number-pad'
                    ></TextInput>
                </View>
            
                <View  style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>Already paid</Text>
                    <TextInput style={[styles.otherTextInput]}
                        keyboardType='number-pad'
                    ></TextInput>
                </View>
            
            
                <View style={[styles.itemContainer]}>
                    <Text style={[styles.paymentConcepts]}>to  recieve/ to pay</Text>
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
		width: "100%",
		padding: 16,
		paddingTop: 100,
		backgroundColor: "#fff",
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
})