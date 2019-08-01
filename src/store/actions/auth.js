import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (
  email,
  password,
  username,
  passwordConfirmation,
  isRegister
) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    username: username,
    passwordConfirmation: passwordConfirmation,
    isRegister: isRegister
  };
};

export const checkAuthTimeout = expiresIn => {
  return {
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    expiresIn: expiresIn
  };
};

export const logout = token => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
    token: token
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
