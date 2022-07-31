import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { ColorPalette, Size } from "./appStyles";

import * as tk from './src/token';


const App = () => {

  const [token, setToken] = useState(tk.readToken);

  const login = (token) => {
    setToken(token);
    tk.saveToken(token);
  };

  const logout = () => {
    setToken(null);
    tk.deleteToken();
  };




  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.background,
  },
});

export default App;
