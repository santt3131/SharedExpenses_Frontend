// Por favor, es este
//const serverEndpoint = "http://192.169.176.126:3000";
const serverEndpoint = "http://192.168.33.69:8080";
const authUserId = "62b5e88ba6e78636d6488646";

// possible servers
const appEndpiont = "http://192.168.0.16:3080";
const testEndpoint = "https://reactnative.dev/movies.json";

// global to store the server address
const Global = {
  baseUrl: appEndpiont,
  testUrl: testEndpoint,
  server: serverEndpoint,
  authUserId: authUserId,
};

export default Global;
