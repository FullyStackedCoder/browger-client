import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  user: null,
  loading: false,
  error: null,
  allUsersLoading: false,
  allUsersError: false,
  allUsers: [],
  userColors: [],
  colorPrimary: "#4c3c4c",
  colorSecondary: "#eee",
  setColorsLoading: false,
  getColorsLoading: false,
  uploading: false,
  percentUploaded: 0
};

const setUserStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
};

const setUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false,
    error: null
  });
};

const setUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const clearUser = (state, action) => {
  return updateObject(state, {
    user: null,
    loading: false,
    error: null
  });
};

const getAllUsersStart = (state, action) => {
  return updateObject(state, {
    allUsersLoading: true,
    allUsersError: null
  });
};

const getAllUsersSuccess = (state, action) => {
  return updateObject(state, {
    allUsers: action.allUsers,
    allUsersLoading: false
  });
};

const getAllUsersFail = (state, action) => {
  return updateObject(state, {
    allUsersError: action.error,
    allUsersLoading: false
  });
};

const setColorPrimary = (state, action) => {
  return updateObject(state, {
    colorPrimary: action.color
  });
};

const setColorSecondary = (state, action) => {
  return updateObject(state, {
    colorSecondary: action.color
  });
};

const saveUserColorsStart = (state, action) => {
  return updateObject(state, {
    setColorsLoading: true,
    error: null
  });
};

const saveUserColorsSuccess = (state, action) => {
  return updateObject(state, {
    setColorsLoading: false,
    error: null,
    userColors: action.userColors
  });
};

const saveUserColorsFail = (state, action) => {
  return updateObject(state, {
    setColorsLoading: false,
    error: action.error
  });
};

const getUserColorsStart = (state, action) => {
  return updateObject(state, {
    getColorsLoading: true,
    error: null
  });
};

const getUserColorsSuccess = (state, action) => {
  return updateObject(state, {
    getColorsLoading: false,
    error: null,
    userColors: action.userColors
  });
};

const getUserColorsFail = (state, action) => {
  return updateObject(state, {
    getColorsLoading: false,
    error: action.error
  });
};

const setUserColors = (state, action) => {
  return updateObject(state, {
    colorPrimary: action.primaryColor,
    colorSecondary: action.secondaryColor
  });
};

const uploadAvatarStart = (state, action) => {
  return updateObject(state, {
    uploading: true,
    error: null
  });
};

const uploadAvatarPercentUpdate = (state, action) => {
  return updateObject(state, {
    uploading: true,
    percentUploaded: action.percentUploaded
  });
};

const uploadAvatartSuccess = (state, action) => {
  return updateObject(state, {
    uploading: false,
    percentUploaded: 0,
    user: action.user,
    error: null
  });
};

const uploadAvatarFail = (state, action) => {
  return updateObject(state, {
    uploading: false,
    percentUploaded: 0,
    error: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_START:
      return setUserStart(state, action);
    case actionTypes.SET_USER_SUCCESS:
      return setUserSuccess(state, action);
    case actionTypes.SET_USER_FAIL:
      return setUserFail(state, action);
    case actionTypes.CLEAR_USER:
      return clearUser(state, action);
    case actionTypes.GET_ALL_USERS_START:
      return getAllUsersStart(state, action);
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return getAllUsersSuccess(state, action);
    case actionTypes.GET_ALL_USERS_FAIL:
      return getAllUsersFail(state, action);
    case actionTypes.SET_COLOR_PRIMARY:
      return setColorPrimary(state, action);
    case actionTypes.SET_COLOR_SECONDARY:
      return setColorSecondary(state, action);
    case actionTypes.SAVE_USER_COLORS_START:
      return saveUserColorsStart(state, action);
    case actionTypes.SAVE_USER_COLORS_SUCCESS:
      return saveUserColorsSuccess(state, action);
    case actionTypes.SAVE_USER_COLORS_FAIL:
      return saveUserColorsFail(state, action);
    case actionTypes.GET_USER_COLORS_START:
      return getUserColorsStart(state, action);
    case actionTypes.GET_USER_COLORS_SUCCESS:
      return getUserColorsSuccess(state, action);
    case actionTypes.GET_USER_COLORS_FAIL:
      return getUserColorsFail(state, action);
    case actionTypes.SET_USER_COLORS:
      return setUserColors(state, action);
    case actionTypes.UPLOAD_AVATAR_START:
      return uploadAvatarStart(state, action);
    case actionTypes.UPLOAD_AVATAR_PERCENT_UPDATE:
      return uploadAvatarPercentUpdate(state, action);
    case actionTypes.UPLOAD_AVATAR_SUCCESS:
      return uploadAvatartSuccess(state, action);
    case actionTypes.UPLOAD_AVATAR_FAIL:
      return uploadAvatarFail(state, action);
    default:
      return state;
  }
};

export default reducer;
