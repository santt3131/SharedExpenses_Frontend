import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { ColorPalette, Size } from "./appStyles";
import * as tk from './src/token';
import SignInScreen from "./src/screens/SignInScreen";


const App = () => {
//eliminate tk.readtoken
  const [token, setToken] = useState(null);

    const login = (token) => {
      setToken(token);
      tk.saveToken(token);
    };

    const logout = () => {
      setToken(null);
      tk.deleteToken();
    };

    if (token === null) 
    {
      return (
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
      )
    }
  
   
  };

/*
<SignInScreen />;
  } else {
    return <SafeAreaView style={styles.root}> <Navigation/> 
    </SafeAreaView>
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );*/


  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: ColorPalette.background,
    },
  });


export default App;
