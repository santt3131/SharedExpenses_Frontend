
// Stylesheet of the app

import { semverify } from "babel-preset-env/lib/utils";
import { StyleSheet, Text, View, Button } from "react-native-web";

const Colors = {
    primaryYellow: '#F9ed69',
    primaryOrange: '#F08A5D',
    primaryRouge: '#B83B5E',
    primarySeance: '#6A2C70',
    governorBay: '#514FA0',
    navyBlue: '#0071C5',
    pacificBlue: '#0091D8',
    irisBlue: '#00AED5',
    eggBlue: '#00C8C0',
    background: '#c8beab61',
    veryLightGrey: '#CCCCCC',
}

const appStyles = StyleSheet.create ({
    // canvas de la app
    container: {
        flex: 1,
        marginTop: baseText*2,
        backgroundColor: '#fff',
    },
    baseText: {
        fontSize: 18,
        lineHeight: 24
    },
    appTitle: {   // Ramiro

    },
    title1: {  // Ramiro

    },
    title2: {  // Ramiro

    },
    title3: {  // Ramiro

    },
    title4: {  // Ramiro

    },
    mainLogo: {  // Ramiro

    },
    logo: {  // Ramiro

    },
    baseButton: { // Santi
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        color: "#fff", 
        fontWeight: "bold",
        lineHeight: 20,
        paddingTop: 6,
        paddingRight: 16,
        paddingBottom: 6,
        paddingLeft: 16
    },
    baseInput: { // Raul 
        backgroundColor: '#fff'
    },
    baseDropdown: {  // Santi

    },
    icons: {  // Raul

    },
    imagen: {  // Raul

    },
    searchBox: {  // Raul

    },
    navbar: {  // Ramiro

    }, 
    table: {  // Raul

    },
    checkbox: {  // Raul

    },
    radiobutton: { // Raul 

    },
    
    popupContent :{
        textAlign: "center",
        height: "350px",
        marginTop: "30px"
      },
  
  /* The text popup */
  popupHead :{
    fontWeight: "bold",
    fontSize: "22px"
  },
  
 
   popupText :{
    fontSize: "15px",
    marginBottom: "20px"
  },
  
   okText : {
    fontSize: "15px"
  },
  

  label :{
    color: white,
    padding: "8px",
    display: "inline-block",
    width: "150px",
  }



    







    
    

          
    
});





export {  appStyles }