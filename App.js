import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import  { appStyles }  from './appStyles';

export default function App() {
  return (
    <View style={appStyles.container}>
      <Text>Hello, hola!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/