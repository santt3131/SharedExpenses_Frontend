import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react";
import RadioGroup from 'react-native-radio-buttons-group';
import { ColorPalette, Size } from "../../../appStyles";
import Global from '../../../global';

const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: Global.server,
  //timeout: 1000,
  headers: {
    'Accept': 'application/json',
    //'Authorization': 'token <your-token-here>'
  },
  withCredentials: false // hasta que no hayamos implementado el acceso con token
});


const radioButtonsData = [
   {
    "id": "62b9d9963b031c174dc38fa5",
    "label": "Home",
    "value": "Home",
  },
   {
    "id": "62b9d9eb355700006d004aa2",
    "label": "Food and Drink",
    "value": "Food and Drink",
  },
   {
    "id": "62b9da02355700006d004aa3",
    "label": "Entertainment",
    "value": "Entertainment",
  },
   {
    "id": "62b9da08355700006d004aa4",
    "label": "Transportation",
    "value": "Transportation",
  },
   {
    "id": "62b9da0d355700006d004aa5",
    "label": "Utilities",
    "value": "Utilities",
  },
   {
    "id": "62b9da12355700006d004aa6",
    "label": "Life",
    "value": "Life",
  },
   {
    "id": "62b9da17355700006d004aa7",
    "label": "General",
    "value": "General",
  },
]

const CustomRadioGroup = () => {
    const [Categories, setCategories] = useState([])
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [isLoading, setLoading] = useState(true);

    //main function: gets the data from th API =======================>
    const getItems = async () => {
        try { 
        const response = await axiosInstance({
            method: 'get',
            url: '/categories/'
            /*params: {
            id: ######
            }*/
        });
        
        const json = await response.data;
        //console.log("{\n\n\n} Response from the backend ==========================> {\n\n\n\n}", json.results);
        setCategories(json.results);
        setLoading(false);

        } catch (error) {
        setCategories([]);
        setLoading(true);
        console.error(error);
        }
    } // end of getItems

    useEffect(() => {
        getItems();
    }, [])

    if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loadingStyle}/>
      </View>
    );
    }; // end of loading

    /* preparing the array of categories
    let radioButtonsData = Categories.map((category) => { 
        return {
            id: category._id,
            label: category.category,
            value: category.category
        };
    });*/
    //console.log(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    return (
        <>
            <RadioGroup
                layout='column'
                style={styles.groupText}
                containerStyle={styles.buttonGroup}
                radioButtons={radioButtons} 
                onPress={onPressRadioButton} 
            />
        </>
    );
}

export default CustomRadioGroup

const styles = StyleSheet.create({
    buttonGroup: {
        width: '90%',
        alignItems: "start",
        marginLeft: Size.xl,
        size: Size.xl*2,
        color: ColorPalette.governorBay
    },
    groupText: {
        fontSize:Size.xl,
    },
    categoryTitle: {
        fontSize: Size.xl,
        marginVertical: Size.xss,
        marginLeft: 10,
        fontWeight: "bold",
        color: ColorPalette.primarySeance
    }
})