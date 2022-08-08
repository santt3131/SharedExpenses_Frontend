import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import debts from '../../assets/icons/debts';
import expenses from '../../assets/icons/expenses';
import friends from '../../assets/icons/friends';
import groups from '../../assets/icons/groups';


export default class AppPreseentation extends React.Component {
    render (){
        return(
            <View>
                <Image source={expenses}/>
                <Image source={friends}/>
                <Image source={groups}/>
                <Image source={debts}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({}) 