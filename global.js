// Por favor, es este
//const serverEndpoint = "http://192.169.176.126:3000";

// Raul: mi servidor local. ====> comentar en producción y descomentar la línea 2
const serverEndpoint = "http://192.168.0.16:3080";

// Santi: mi servidor local. ====> comentar en producción y descomentar la línea 2
//const serverEndpoint = "http://localhost:8080";
const authUserId = "62b5e88ba6e78636d6488646";

// global to store the server address
const Global = {
  server: serverEndpoint,
  authUserId: authUserId,
};

export default Global;
