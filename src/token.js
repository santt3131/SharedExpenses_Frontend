import AsyncStorage  from "@react-native-async-storage/async-storage";

/*import * as SecureStore from 'expo-secure-store';

export const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
};

export const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};*/

export const readToken = () => {
  const tokenStr = AsyncStorage.getItem("token");
  return tokenStr //!== null ? JSON.parse(tokenStr) : null;
};
export const saveToken = (token) => {
  AsyncStorage.setItem("token", JSON.stringify(token));
};
export const deleteToken = () => {
  AsyncStorage.removeItem("token");
};
