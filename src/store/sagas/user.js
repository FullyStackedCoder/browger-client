import { put, delay, take, call, fork } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import axios from "axios";

import * as actions from "../actions/index";
import * as globals from "../../shared/globals";

export function* setUserSaga(action) {
  yield put(actions.setUserStart());
  try {
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/me`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    const user = response.data;
    yield delay(1 * 1000);
    yield put(actions.setUserSuccess(user));
  } catch (error) {
    yield put(actions.setUserFail(error));
  }
}

export function* getAllUsersSaga(action) {
  try {
    yield put(actions.getAllUsersStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/all`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(actions.getAllUsersSuccess(response.data.users));
  } catch (error) {
    yield put(actions.getAllUsersFail(error));
  }
}

export function* saveUserColorsSaga(action) {
  try {
    yield put(actions.saveUserColorsStart());
    const response = yield axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/save-user-colors`,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        colorPrimary: action.colorPrimary,
        colorSecondary: action.colorSecondary
      }
    });
    yield put(actions.saveUserColorsSuccess(response.data.userColors));
  } catch (error) {
    yield put(actions.saveUserColorsFail(error));
  }
}

export function* getUserColorsSaga(action) {
  try {
    yield put(actions.getUserColorsStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/get-user-colors`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(actions.getUserColorsSuccess(response.data.userColors));
  } catch (error) {
    yield put(actions.getUserColorsFail(error));
  }
}

export function* uploadAvatarSaga(action) {
  try {
    yield put(actions.uploadAvatarStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/upload/new-avatar/${
        action.metadata.contentType.split("/")[1]
      }`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    const [uploadPromise, chan] = yield call(
      createUploader,
      response.data.url,
      action
    );
    yield fork(uploadProgressWatcher, chan);
    yield call(() => uploadPromise);
    const updatedUser = yield axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/update-avatar-image`,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        profileImageUrl: `${globals.S3_BUCKET}${response.data.key}`
      }
    });
    yield put(actions.uploadAvatartSuccess(updatedUser.data));
  } catch (error) {
    yield put(actions.uploadAvatarFail(error));
  }
}

const upload = (url, action, onUploadProgress) => {
  return axios.put(
    url,
    action.file,
    { onUploadProgress },
    {
      headers: { "Content-Type": action.metadata.contentType }
    }
  );
};

const createUploader = (url, action) => {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = upload(url, action, uploadProgressCb);
  return [uploadPromise, chan];
};

function* uploadProgressWatcher(chan) {
  while (true) {
    const percentCompleted = yield take(chan);
    yield put(actions.uploadAvatarPercentUpdate(percentCompleted));
  }
}
