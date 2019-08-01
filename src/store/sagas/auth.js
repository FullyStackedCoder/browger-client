import { put, delay, call } from "redux-saga/effects";
import axios from "axios";
import md5 from "md5";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  try {
    if (action.token) {
      yield axios({
        method: "get",
        url: "http://localhost:8080/api/v1/user/status",
        headers: { Authorization: `Bearer ${action.token}` }
      });
    }
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expiresIn");
    yield call([localStorage, "removeItem"], "userId");

    yield put(actions.logoutSucceed());
    yield put(actions.clearUser());
  } catch (error) {
    console.log(error);
  }
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const profileImageUrl = `http://gravatar.com/avatar/${md5(
    action.email
  )}?d=identicon`;
  const authData = {
    email: action.email,
    password: action.password,
    username: action.username,
    profileImageUrl: profileImageUrl,
    passwordConfirmation: action.passwordConfirmation
  };
  let url = "http://localhost:8080/api/v1/auth/register";
  if (!action.isRegister) {
    url = "http://localhost:8080/api/v1/auth/login";
  }
  try {
    const response = action.isRegister
      ? yield axios.put(url, authData)
      : yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.token);
    yield localStorage.setItem("expiresIn", expirationDate);
    yield localStorage.setItem("userId", response.data.userId);
    yield put(actions.authSuccess(response.data.token, response.data.userId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem("expiresIn"));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
