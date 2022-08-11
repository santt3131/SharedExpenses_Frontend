// Por favor, es este
//const serverEndpoint = "http://192.169.176.126:3000";
const serverEndpoint = "http://192.168.42.69:8080";

// possible servers
const appEndpiont = "http://192.168.0.16:3080";
const testEndpoint = "https://reactnative.dev/movies.json";

// global to store the server address
const Global = {
  baseUrl: appEndpiont,
  testUrl: testEndpoint,
  server: serverEndpoint,
};

export default Global;
