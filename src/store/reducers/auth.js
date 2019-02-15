import { updateObject } from '../utility';
import * as actionTypes from '../../actions/actionTypes';



const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    users:null,
    signupUsers:null,
    loginUser: null,
    loguser:null,
    genere:[]
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};


const authSuccess = (state, action) => {
    console.log(action,"action in the reducer");
    
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        // loading: false
     } );
};

const loginSuccess = (state, action) => {
    
    return updateObject( state, { 
        users: action.user,
        token:action.user.token,
        loginUser: action.loginUser
     } );
     
};

const loginuserSuccess = (state, action) => {
    
    return updateObject( state, { 
        loguser: action.loginUser
     } );
     
};
const signUpSuccess = (state, action) => {
    
    return updateObject( state, { 
        signupUsers: action.user
     } );
     
};
const genereSuccess = (state, action) => {
    console.log("justGenereSuccess",action.genere);
    
    return updateObject( state, { 
        genere: action.genere.category
     } );
     
};


const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.USER_LOGIN_SUCCESS: return loginSuccess(state, action);   
        case actionTypes.GENERE_SUCCESS: return genereSuccess(state, action);   
        case actionTypes.USER_LOGIN_USER_SUCCESS: return loginuserSuccess(state, action);   
        case actionTypes.USER_SIGNUP_SUCCESS: return signUpSuccess(state, action);   
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
     
        default:
            return state;
    }
};

export default reducer;