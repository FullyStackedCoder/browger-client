import { put, take, call, fork, delay } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import axios from "axios";

import * as actions from "../actions/index";

export function* addMessageSaga(action) {
  try {
    yield put(actions.addMessageStart());
    yield axios({
      method: "post",
      url: `http://localhost:8080/api/v1/message/add`,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        messageBody: action.message,
        userId: action.userId,
        channelId: action.channelId,
        username: action.displayName,
        userAvatar: action.profileImageUrl,
        messageType: action.messageType
      }
    });
    yield put(actions.addMessageSuccess());
  } catch (error) {
    yield put(actions.addMessageFail(error));
  }
}

export function* getMessagesSaga(action) {
  try {
    yield put(actions.getMessagesStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/message/channel/${action.channelId}`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(actions.getMessagesSuccess(response.data.messages));
    action.callback();
  } catch (error) {
    yield put(actions.getMessagesFail(error));
  }
}

export function* uploadFileSaga(action) {
  try {
    yield put(actions.uploadFileStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/upload/new/${
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
    yield axios({
      method: "post",
      url: `http://localhost:8080/api/v1/message/add`,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        messageBody: response.data.key,
        userId: action.userId,
        channelId: action.channelId,
        username: action.displayName,
        userAvatar: action.profileImageUrl,
        messageType: action.messageType
      }
    });
    yield put(actions.uploadFileSuccess());
  } catch (error) {
    yield put(actions.uploadFileFail(error));
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
    yield put(actions.uploadPercentUpdate(percentCompleted));
  }
}

export function* searchMessagesSaga(action) {
  try {
    yield put(actions.searchMessagesStart());
    const channelMessages = [...action.messages];
    const regex = new RegExp(action.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.messageType === "text" && message.messageBody.match(regex)) ||
        message.username.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    yield delay(0.5 * 1000);
    yield put(actions.searchMessagesFinish(searchResults));
  } catch (error) {
    yield put(actions.searchMessagesFail(error));
  }
}
