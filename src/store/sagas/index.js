import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authCheckStateSaga
} from "./auth";

import {
  setUserSaga,
  getAllUsersSaga,
  saveUserColorsSaga,
  getUserColorsSaga,
  uploadAvatarSaga
} from "./user";

import {
  addChannelSaga,
  getChannelsSaga,
  getNotificationMessagesSaga,
  channelStarredSaga,
  getStarredChannelsSaga
} from "./channel";

import {
  addMessageSaga,
  getMessagesSaga,
  uploadFileSaga,
  searchMessagesSaga
} from "./messages";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchUser() {
  yield all([
    takeEvery(actionTypes.SET_USER, setUserSaga),
    takeEvery(actionTypes.GET_ALL_USERS, getAllUsersSaga),
    takeEvery(actionTypes.SAVE_USER_COLORS, saveUserColorsSaga),
    takeEvery(actionTypes.GET_USER_COLORS, getUserColorsSaga),
    takeEvery(actionTypes.UPLOAD_AVATAR, uploadAvatarSaga)
  ]);
}

export function* watchChannel() {
  yield all([
    takeEvery(actionTypes.ADD_CHANNEL, addChannelSaga),
    takeEvery(actionTypes.GET_CHANNELS, getChannelsSaga),
    takeEvery(
      actionTypes.GET_NOTIFICATION_MESSAGES,
      getNotificationMessagesSaga
    ),
    takeEvery(actionTypes.CHANNEL_STARRED, channelStarredSaga),
    takeEvery(actionTypes.GET_STARRED_CHANNELS, getStarredChannelsSaga)
  ]);
}

export function* watchMessages() {
  yield all([
    takeEvery(actionTypes.ADD_MESSAGE, addMessageSaga),
    takeEvery(actionTypes.GET_MESSAGES, getMessagesSaga),
    takeEvery(actionTypes.UPLOAD_FILE, uploadFileSaga),
    takeEvery(actionTypes.SEARCH_MESSAGES, searchMessagesSaga)
  ]);
}
