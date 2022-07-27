import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { ColorPalette, Size } from "./appStyles";

const App = () => {
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
