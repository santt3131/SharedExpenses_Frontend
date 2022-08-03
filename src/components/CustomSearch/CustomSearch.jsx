import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ColorPalette, Size } from '../../../appStyles';
import { FontAwesome } from '@expo/vector-icons'; 

const CustomSearch = () => {
    const [term, setTerm] = useState('');

    


  return (
    <View style={styles.searchWrapperStyle}>
        <FontAwesome name="search" size={Size.xm} color={ColorPalette.primaryRouge} style={styles.iconStyle}/>
        <TextInput 
            placeholder="Search" 
            placeholderTextColor={ColorPalette.primaryRouge}
            style={styles.searchInputStyle}
            value={term}
            onChangeText={(newText) => {
                setTerm(newText);
            }}
            />

        <FontAwesome name="close" sise={Size.lm} color={ColorPalette.primaryRouge} style={styles.iconStyle}/>
    </View>
  )
}

export default CustomSearch

const styles = StyleSheet.create({
    searchWrapperStyle: {
        backgroundColor: ColorPalette.primaryGreen,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchInputStyle: {
        flex: 1,
        fontSize: Size.mm,
        paddingVertical: Size.xss,
        paddingHorizontal: 0,
        margin: 0,
        color: ColorPalette.primaryWhite
    },
    iconStyle: {
        margin: Size.xs,
    }
})