import * as actionTypes from "./actionTypes";

export const setUser = (userId, token) => {
  return {
    type: actionTypes.SET_USER,
    userId: userId,
    token: token
  };
};

export const setUserStart = () => {
  return {
    type: actionTypes.SET_USER_START
  };
};

export const setUserSuccess = user => {
  return {
    type: actionTypes.SET_USER_SUCCESS,
    user: user
  };
};

export const setUserFail = () => {
  return {
    type: actionTypes.SET_USER_FAIL
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

export const getAllUsers = token => {
  return {
    type: actionTypes.GET_ALL_USERS,
    token: token
  };
};
export const getAllUsersStart = () => {
  return {
    type: actionTypes.GET_ALL_USERS_START
  };
};
export const getAllUsersSuccess = allUsers => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    allUsers: allUsers
  };
};
export const getAllUsersFail = error => {
  return {
    type: actionTypes.GET_ALL_USERS_FAIL,
    error: error
  };
};

export const setColorPrimary = color => {
  return {
    type: actionTypes.SET_COLOR_PRIMARY,
    color
  };
};

export const setColorSecondary = color => {
  return {
    type: actionTypes.SET_COLOR_SECONDARY,
    color
  };
};

export const saveUserColors = (token, colorPrimary, colorSecondary) => {
  return {
    type: actionTypes.SAVE_USER_COLORS,
    token,
    colorPrimary,
    colorSecondary
  };
};

export const saveUserColorsStart = () => {
  return {
    type: actionTypes.SAVE_USER_COLORS_START
  };
};

export const saveUserColorsSuccess = userColors => {
  return {
    type: actionTypes.SAVE_USER_COLORS_SUCCESS,
    userColors
  };
};

export const saveUserColorsFail = error => {
  return {
    type: actionTypes.SAVE_USER_COLORS_FAIL,
    error
  };
};

export const getUserColors = token => {
  return {
    type: actionTypes.GET_USER_COLORS,
    token
  };
};

export const getUserColorsStart = () => {
  return {
    type: actionTypes.GET_USER_COLORS_START
  };
};

export const getUserColorsSuccess = userColors => {
  return {
    type: actionTypes.GET_USER_COLORS_SUCCESS,
    userColors
  };
};

export const getUserColorsFail = error => {
  return {
    type: actionTypes.GET_USER_COLORS_FAIL,
    error
  };
};

export const setUserColors = (primaryColor, secondaryColor) => {
  return {
    type: actionTypes.SET_USER_COLORS,
    primaryColor,
    secondaryColor
  };
};

export const uploadAvatar = (token, file, metadata) => {
  return {
    type: actionTypes.UPLOAD_AVATAR,
    token,
    file,
    metadata
  };
};

export const uploadAvatarStart = () => {
  return {
    type: actionTypes.UPLOAD_AVATAR_START
  };
};

export const uploadAvatarPercentUpdate = percentUploaded => {
  return {
    type: actionTypes.UPLOAD_AVATAR_PERCENT_UPDATE,
    percentUploaded
  };
};

export const uploadAvatartSuccess = user => {
  return {
    type: actionTypes.UPLOAD_AVATAR_SUCCESS,
    user
  };
};

export const uploadAvatarFail = error => {
  return {
    type: actionTypes.UPLOAD_AVATAR_FAIL,
    error
  };
};
