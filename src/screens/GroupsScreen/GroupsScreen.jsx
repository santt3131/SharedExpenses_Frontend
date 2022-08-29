
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { StatusBar } from "expo-status-bar";
import Global from "../../../global";
import Checkbox from 'expo-checkbox';
import CustomTopbar from "../../components/CustomTopbar/CustomTopbar";
import { FontAwesome  } from '@expo/vector-icons';

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

const screenTitle = "Groups";



const GroupsScreen = () => {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  

  
  //main function: gets the data from th API =======================>
  const getItems = async () => {
    try { 
      const response = await axiosInstance({
        method: 'get',
        url: '/groups'
        /*params: {
          id: ######
        }*/
      });
    
      const json = await response.data;
      //console.log("{\n\n\n} Response from the backend ==========================> {\n\n\n\n}", json.results);
      setMasterDataSource(json.results);
      setFilteredDataSource(json.results);
      setLoading(false);

    } catch (error) {
      setMasterDataSource([]);
      setFilteredDataSource([]);
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
        <StatusBar screenTitle={screenTitle}/>
        <CustomTopbar screenTitle={screenTitle}/>
        <ActivityIndicator style={styles.loadingStyle}/>
      </View>
    );
  }; // end of loading 


  // filter or search on screen =======================>
  const searchFilterFunction = (filterTerm) => { 
    if (filterTerm) {
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        let titleandDescription = item.groupName + ' ' + item.groupDescription
        const itemData = titleandDescription ? titleandDescription.toUpperCase() : '';
        const filterData = filterTerm.toUpperCase();
        return itemData.indexOf(filterData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(filterTerm);
    } else {
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(filterTerm);
    }
  }; // end of filter

  // fn clears the search box  ========================>
  const clearSearchBar = () => {
      setSearch('')
      setFilteredDataSource(masterDataSource);
    }

  // fn to update checkboxes  ========================>
  const onValueChange =(item) => {
    const newIds = [...checked];
    const index = newIds.indexOf(item._id);
    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(item._id);
    }
    setChecked(newIds)
  }
  
// view of each record composing the list =====================>
  const renderItem = ({ item }) => { 
    return (
        <View style={styles.itemList}>
            <View>
                <Text style={styles.itemTitle}>{item.groupName}</Text>
                <Text style={styles.itemText}>{item.groupDescription}</Text>
            </View>
            <View>
                <Checkbox 
                  style = { styles.checkbox }
                  value = { checked.includes(item._id) }
                  onValueChange = {() =>  {
                    const newIds = [...checked];
                    const index = newIds.indexOf(item._id);
                    if (index > -1) {
                      newIds.splice(index, 1);
                    } else {
                      newIds.push(item._id);
                    }
                    setChecked(newIds)
                  }}
                  color={checked ? ColorPalette.primaryGreen : ColorPalette.primaryGray}
                />
            </View>
        </View>
    )
  }


  return ( // the view
    <View style={styles.container}>
      <StatusBar/>
      <CustomTopbar screenTitle={screenTitle} sectionIcon='user-plus'/>
        
      <View style={styles.listWrapper}> 
        <FlatList
          data={ filteredDataSource }
          renderItem={ renderItem }
          extraData={ checked }
          keyExtractor={(item) => item._id }
        />
      </View>
    </View>
  ); // end of the view
};


  






const styles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    justifyContent: 'start',
  },


  // list components
  listWrapper:{
    padding: Size.xs
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


  loadingStyle: {
    flex: 1, 
    marginTop: Size.xl*7,
    alignItems: 'center',
    size: Size.xxl
  },


});

export default GroupsScreen;
