import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { ColorPalette, Size } from "../../../appStyles";

const CustomModal = ({ title, message, isShown }) => {
	const [modalVisible, setModalVisible] = useState(isShown);

	return (
		<View style={styles.centeredView}>
			<Modal animationType="slide" visible={modalVisible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.bodyTitle}>{title}</Text>
						<Text style={styles.bodyText}>{message}</Text>
						<Pressable
							style={styles.button}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.bodyText}>ok</Text>
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
		color: "white",
		borderRadius: 30,
		paddingRight: Size.xss,
		paddingLeft: Size.xss,
		elevation: 0,
		backgroundColor: ColorPalette.eggBlue,
		paddingTop: 0,
		paddingBottom: 0,
	},
	bodyTitle: {
		fontSize: Size.xm,
		textAlign: "center",
		marginTop: 20,
		marginBottom: 15,
		color: ColorPalette.primaryRouge,
		fontWeight: "bold",
	},
	bodyText: {
		fontSize: Size.xm,
		textAlign: "center",
		marginTop: Size.ls,
		marginBottom: Size.ls,
		margin: Size.xm,
		marginRight: Size.xm,
		color: ColorPalette.primaryBlack,
		fontWeight: "bold",
	},
});

export default CustomModal;
