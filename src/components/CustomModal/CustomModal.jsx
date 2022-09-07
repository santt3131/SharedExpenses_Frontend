import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";


const CustomModal = ({ showMe, title, message, logoOrIcon, buttonText,  onPressfn}) => {

	return (
		<View style={styles.centeredView}>
			<Modal animationType="slide" visible={showMe}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.bodyTitle}>{title}</Text>
						<Image style={styles.logo} source={logoOrIcon}/>
						<Text style={styles.bodyText}>{message}</Text>
						<Pressable
							style={styles.button}
							onPress={onPressfn ? onPressfn : () => setModalVisible(!modalVisible) }
						>
							<Text style={styles.button}> { buttonText? buttonText: 'Go!' }</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
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
	button: {
		fontSize: Size.xm,
		fontWeight: "bold",
		color: ColorPalette.primaryWhite,
		borderRadius: 25,
		paddingHorizontal: Size.xs,
		paddingVertical: Size.xss*.5,
		elevation: 0,
		backgroundColor: ColorPalette.primaryGreen,
	},
	bodyTitle: {
		fontSize: Size.xl,
		textAlign: "center",
		marginTop: 20,
		marginBottom: 15,
		color: ColorPalette.primaryRouge,
		fontWeight: "bold",
	},
	bodyText: {
		fontSize: Size.xm,
		textAlign: "center",
		marginVertical: Size.xm,
		margin: Size.xm,
		marginRight: Size.xm,
		color: ColorPalette.primaryBlack,
		fontWeight: "bold",
	},
	logo: {
		width: 70,
		height: 70,
		marginTop: Size.xm,
		marginBottom: Size.xs
  	}
});

export default CustomModal;
