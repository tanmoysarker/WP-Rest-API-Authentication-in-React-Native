import axios from "axios";
import * as actionTypes from "./actions";
import {AsyncStorage} from '@react-native-community/async-storage';

export const userSignup = (user) => {
  return dispatch => {
    axios.post("http://192.168.0.105/wordpress/wp-json/wp/v2/users", user)
    .then(newUser => {
      dispatch({type: "USER_SIGNUP_SUCCESS", user: newUser});
    }).catch(error => {
      dispatch({type: "USER_SIGNUP_FAIL", error});
    })
  }
};

export const userSignin = (user) => {
  return dispatch => {
    axios.post("http://192.168.0.105/wordpress/wp-json/jwt-auth/v1/token", user)
      .then(response => {
        let userDets = {
          username: response.data.user_nicename,
          email: response.data.user_email,
          displayname:  response.data.user_display_name
        };
        //Set token and email in local storage in case Redux data is lost
         
        dispatch({type: "USER_SIGNIN_SUCCESS", userDets: userDets, token: response.data.token});
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("email", response.data.email);
      }).catch(err => {
        dispatch({type: "USER_SIGNIN_FAIL", error: err});
      });
  }
};

export const userSignout =(token) => {
  return dispatch => {
    axios.post("http://192.168.0.105/wordpress/wp-json/jwt-auth/v1/token/revoke", {}, {headers: {"Authorization": "Bearer " + token}}).then(response => {
      //Clear local storage
      AsyncStorage.clear();
      AsyncStorage.removeItem('token'); 
      AsyncStorage.removeItem("email");
      dispatch({type: actionTypes.USER_SIGNOUT_SUCCESS});
    }).catch(err => {
      dispatch({type: actionTypes.USER_SIGNOUT_FAIL, error: err});
    })
  }
}


export const validateToken = () => {
    return dispatch => {
      let token = null, email = null;
      if(AsyncStorage.getItem("token")){
        token = AsyncStorage.getItem("token");
        email = AsyncStorage.getItem("email");
      }
      if(token){
        axios.post("http://192.168.0.105/wordpress/wp-json/jwt-auth/v1/token/validate", {},{headers: {"Authorization": "Bearer " + token}}).then(res => {
          if(res.data.data.status === 200){
            dispatch({type: actionTypes.VALIDATE_TOKEN_SUCCESS, token:token, email:email});
          }
        }).catch(err => {
          //TODO: HANDLE VALIDATION ERROR
        });
      }else{
        //TODO: HANDLE NO TOKEN
      }
    };
};