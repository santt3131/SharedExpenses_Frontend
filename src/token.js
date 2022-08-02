

import AsyncStorage`` from "@react-native-async-storage/async-storage";
export const readToken = () => {
  const tokenStr = AsyncStorage.getItem("token");
  return tokenStr !== null ? JSON.parse(tokenStr) : null;
}
export const saveToken = (token) => {
  AsyncStorage.setItem("token", JSON.stringify(token));
}
export const deleteToken = () => {
  AsyncStorage.removeItem("token");
}

