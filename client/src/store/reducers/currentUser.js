import {SET_CURRENT_USER} from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {} //all the user info when login
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                //turn empty object into false or true if their are keys
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;
    }
};