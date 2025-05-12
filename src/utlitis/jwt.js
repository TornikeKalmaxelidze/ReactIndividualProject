import { jwtDecode } from "jwt-decode";

function parseJWT(token) {
    const data = jwtDecode(token);
    return data;
};

function isTokenValid(token) {
    const currentTime = Date.now() / 1000; 
    const  decode = jwtDecode(token);
    return decode.exp > currentTime;
    
};
function toggleLocalStorage(token) {
    if (token) {
        localStorage.setItem("ValidToken", token);
    }else {
        localStorage.removeItem("ValidToken");
    }
}


export  { isTokenValid, toggleLocalStorage, parseJWT };
