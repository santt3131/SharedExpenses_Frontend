import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../global";

const isSuccess = (httpCode) => httpCode === 200 || httpCode === 201;

const apiCall = async (method, path, body, headers) => {
  try {
    const response = await fetch(`${Global.server}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (isSuccess(response.status)) {
      return { success: true, result: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const apiPost = (path, body) => apiCall("POST", path, body);

export const login = (userData) => apiPost("/login", userData);

export const resetpassword = (userData) => apiPost("/pwdreset/request", userData);
export const updatepassword = (userData) => apiPost("/pwdreset/update", userData);

export const register = (userData) => apiPost("/register/register", userData);
export const confirm = (userData) => apiPost("/register/confirm", userData);

const authApiCall = (method, path, body) => {
  const { accessToken } = JSON.parse(AsyncStorage.getItem("token"));
  return apiCall(method, path, body, {
    Authorization: `Bearer ${accessToken}`,
  });
};

