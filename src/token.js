import AsyncStorage  from "@react-native-async-storage/async-storage";

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

export const _storeToken = async (tk) => {

  const token = {
    value: tk
  };

  try {
    await AsyncStorage.setItem(token);
  } catch (error) {
    // Error saving data
  }
};

export const _getToken = async () => {
  try {
    await AsyncStorage.getItem("token");
  } catch (error) {
    // Error saving data
  }
};
