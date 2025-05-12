import { toggleLocalStorage } from "../utlitis/jwt";
import appActions from "./actions";
import { jwtDecode } from "jwt-decode"; 

export const initialState = {
    user: null,
    isAuthenticated: false,
};

export const reducer = (state, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case appActions.LOG_IN:
            const { token } = payload;
            const user = jwtDecode(token); 
            toggleLocalStorage(token);
            return { isAuthenticated: true, user: user };
        case appActions.auth:
            
            break; 

        default:
            return state;
    }
};