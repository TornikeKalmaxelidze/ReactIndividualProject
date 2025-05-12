import appActions from "./actions";

const authAction = (payload) => {
    return{ type: appActions.auth, payload};
};

const LogInAction = (payload) => {
    return{type: appActions.LOG_IN, payload};
}

export {authAction, LogInAction};