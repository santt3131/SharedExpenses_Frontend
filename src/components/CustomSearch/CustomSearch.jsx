import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ColorPalette, Size } from '../../../appStyles';
import { FontAwesome5 } from '@expo/vector-icons'; 

const CustomSearch = () => {
    const [term, setTerm] = useState('');

    


  return (
    <View style={styles.searchWrapperStyle}>
        <FontAwesome5 name="search" size={Size.xm} color={ColorPalette.primaryWhite} style={styles.iconStyle}/>
        <TextInput 
            placeholder="Search" 
            placeholderTextColor={ColorPalette.primaryWhite}
            style={styles.searchInputStyle}
            value={text}
            onChangeText={(text) => {
                setTerm(text);
            }}
            />

        <FontAwesome5 name="close" sise={Size.xl} color={ColorPalette.primaryWhite} style={styles.iconStyle}/>
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