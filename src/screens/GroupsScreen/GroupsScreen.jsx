
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList} from "react-native";
import { ColorPalette, Size } from "../../../appStyles";
import { StatusBar } from "expo-status-bar";
import Global from "../../../global";
import CustomSearch from "../../components/CustomSearch";
const axios = require('axios');

const GroupsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [retrievedItems, setRetrievedItems] = useState([]); // registros recuperados
  const [term, setTerm] = useState(''); // término de búsqueda o filtro

  const getItems = async () => {
    const axiosInstance = axios.create({
      baseURL: Global.baseUrl,
      //timeout: 1000,
      headers: {
        'Accept': 'application/json',
        //'Authorization': 'token <your-token-here>'
      },
      withCredentials: false // hasta que no hayamos implementado el acceso con token
    });

    try { 
      const response = await axiosInstance({
        method: 'get',
        /*params: {
          url: '/groups',
          id: ######
        }*/
      });
    
      const json = await response.data;
      setRetrievedItems(json.movies);
      setLoading(false);
    } catch (error) {
      setRetrievedItems([]);
      console.error(error);
    }
  } 
  
  const renderRetrievedRecords = (item) => {
    return(
      <View style={styles.itemList}>
        <Text>{item.groupName}</Text>
        <Text>{item.groupDescription}</Text>
      </View>
    )
  }

  useEffect((term) => {
    getItems(term);
  }, [term])

  return (
    <View style={styles.container}>
      <StatusBar/>
      <CustomSearch/>
      <View style={styles.listWrapper}> 
        <Text>Hola!</Text>
        {isLoading ? <ActivityIndicator style={styles.loadingStyle}/> : (
        <FlatList
          data={retrievedItems}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.itemTitle}>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    marginTop: Size.xl,
  },
  listWrapper:{
    padding: Size.xs

  },
  loadingStyle: {
    flex: 1, 
    marginTop: Size.xl*7,
    alignItems: 'center'
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
    margin: Size.xm
  },
  itemTitle: {
    fontSize: Size.xm,
    fontWeight: 'bold',
    marginBottom: Size.xs
  },

});

export default GroupsScreen;
