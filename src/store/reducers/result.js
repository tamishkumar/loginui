import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    logindata: []
};


const reducer = (state = initialState, action) => {
    console.log("entered in the reducer", action);

    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS: return updateObject(state, { logindata: action.user });
    }
    return state;
};

export default reducer;