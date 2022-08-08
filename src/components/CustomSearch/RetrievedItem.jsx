import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import { ColorPalette, Size } from '../../../appStyles'

const RetrievedItem = ({_id, groupName, groupDescription}) => {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);

    const onValueChange =(item) => {
        const newData = map(newData => {
            if(newItem._id == item._id) {
                return {
                    ...newItem,
                    selected: true
                }
            }
            return {
                ...newItem,
                selected: false
            }
        });
        setData(newData)
    }

    return (
        <View style={styles.itemList}>
            <View>
                <Text style={styles.itemTitle}>{groupName}</Text>
                <Text style={styles.itemText}>{groupDescription}</Text>
                <Text>{_id}</Text>
            </View>
            <View>
                <Checkbox 
                style = { styles.checkbox }
                isChecked = { checked.includes(_id) }
                onValueChange = {() => { onValueChange(item, _id);s}}
                />
            </View>
        </View>
    )
}

export default RetrievedItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    marginTop: Size.xl,
  },
  listWrapper:{
    padding: Size.xs*0
  },
  loadingStyle: {
    flex: 1, 
    marginTop: Size.xl*7,
    alignItems: 'center',
    size: Size.xxl
  },
  screenTitle: {
    paddingTop: Size.xl*5,
    fontSize: Size.xl,
    alignSelf: "center",
    marginTop: 20,
    color: ColorPalette.primaryBlue,
    fontWeight: "bold",
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Size.xs,
    borderBottomWidth: 1,
    borderColor: ColorPalette.veryLightGrey
  },
  itemTitle: {
    fontSize: Size.xm,
    fontWeight: 'bold',
    marginBottom: Size.xxs
  },
  itemText: {
    fontSize: Size.xm,
    marginBottom: Size.xs
  },
  checkbox: {
    marginRight: Size.xss,
    borderColor: ColorPalette.primaryGray
  },

});