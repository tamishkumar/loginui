import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()
export const logout = () => {
     console.log("entered here in logout of authjs");
 
     localStorage.removeItem('user_token');
     localStorage.removeItem('userId');
     history.push('/');
     return {
         type: actionTypes.AUTH_LOGOUT
     };
    
 
 };

 export const authSuccess = (token, userId) => {
     return {
         type: actionTypes.AUTH_SUCCESS,
         idToken: token,
         userId: userId
     };
 };


export const loginSuccess = (user,loginUser) => {

     return {
       type: actionTypes.USER_LOGIN_SUCCESS,
       user,
       loginUser
      
     };
   };

   export const loginuserSuccess = (loginUser) => {

    return {
      type: actionTypes.USER_LOGIN_USER_SUCCESS,
      loginUser
     
    };
  };
   export const signupSuccess = (user) => {

    return {
      type: actionTypes.USER_SIGNUP_SUCCESS,
      user,
     
    };
  };

  export const genereSuccess = (genere) => {
    
    return {
      type: actionTypes.GENERE_SUCCESS,
      genere,
     
    };
  };
  


export  const signup = (user) => {
    console.log("entered in Signup");
    
    
    return (dispatch) => {
       
         
      return axios.post(`http://localhost:5400/user/signup`,  user )
        .then(response => {
             if(response.data.status ==="success"){
                  toastr.success(response.data.message);
             }else{
                   toastr.error(response.data.message);
             }
             dispatch(signupSuccess(response.data));
            return(response.data);
              
        })
        .catch(error => {
             throw(error);
        });
    }

};
export  const login = (user) => {
         
     return (dispatch) => {
       return axios.post(`http://localhost:5400/user/login`,  user )
         .then(response => {
              
              if(response.data.status ==="success"){
                dispatch(loginuserSuccess(user));

                   toastr.success(response.data.message);

              }else{
                    toastr.error(response.data.message);
              }
            dispatch(loginSuccess(response.data,user));
            console.log(user,"loginUser");
            
            return(response.data);
         })
         .catch(error => {
              throw(error);
         });
     }
 
 };
 export  const genereapi = (user) => {
         
  return (dispatch) => {
    return axios.get(`http://fable.mobilytedev.com:8098/api/story/allGenres` )
      .then(response => {
           console.log(response,"responseGenere");
           
           if(response.data.status === 1){
             dispatch(genereSuccess(response.data));

           }
         return(response.data);
      })
      .catch(error => {
           throw(error);
      });
  }

};

//  export const authCheckState = () => {
//      // console.log(expirationDate,"expirationDate");
//      console.log("entered in auth checkstate");
     
 
//      return dispatch => {
//          const token = localStorage.getItem('user_token');
//          if (!token) {
//              console.log("no token available",token);
             
//              dispatch(logout());
//          }
//          else {
//              console.log("token available",token);
             
//              const userId = localStorage.getItem('user_token');
//              dispatch(authSuccess(token, userId));
//          };
//      }
//  }

