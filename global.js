// Online Server //
//const serverEndpoint = "http://192.169.176.126:3000";

// Raul: mi servidor local. ====> comentar en producción y descomentar la línea 2
//const serverEndpoint = "http://192.168.33.69:8080";
//Santi: mi servidor local.
//const serverEndpoint = "http://192.168.1.106:8080";

//const authUserId = "62b5e88ba6e78636d6488646";
const authUserId = null;
const authUserGroups = null;
const resetPasswordCode = null;
const authUserEmail = null;
const serverEndpoint = "http://192.168.33.69:8080";



const Global = {
  server: serverEndpoint,
  authUserId: authUserId,
  authUserGroups:authUserGroups,
  authUserEmail: authUserEmail,
  resetPasswordCode:resetPasswordCode
};

export default Global;
