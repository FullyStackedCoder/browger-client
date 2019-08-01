import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* addChannelSaga(action) {
  try {
    yield put(actions.addChannelStart());
    yield axios({
      method: "post",
      url: `http://localhost:8080/api/v1/channel/add`,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        name: action.name,
        details: action.details
      }
    });
    yield put(actions.addChannelSuccess());
  } catch (error) {
    yield put(actions.addChannelFail(error));
  }
}

export function* getChannelsSaga(action) {
  try {
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/channel/channels`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(actions.getChannelsSuccess(response.data.channels));
    action.callback();
  } catch (error) {
    yield put(actions.getChannelsFail(error));
  }
}

export function* getNotificationMessagesSaga(action) {
  try {
    yield put(actions.getNotificationMessagesStart());
    const response = yield axios({
      method: "get",
      url: `http://localhost:8080/api/v1/message/notifications/${
        action.channelId
      }`,
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(
      actions.getNotificationMessagesSuccess(
        response.data.totalMessages,
        action.channelId,
        action.currentChannelId,
        action.notifications
      )
    );
  } catch (error) {
    yield put(actions.getNotificationMessagesFail(error));
  }
}

export function* channelStarredSaga(action) {
  try {
    yield put(actions.channelStarredStart());
    let url = `http://localhost:8080/api/v1/channel/channel-starred`;
    let method = "post";
    if (action.isChannelStarred) {
      url = `http://localhost:8080/api/v1/channel/channel-unstarred`;
      method = "delete";
    }
    yield axios({
      method: method,
      url: url,
      headers: { Authorization: `Bearer ${action.token}` },
      data: {
        currentChannelId: action.currentChannel._id
      }
    });
    yield put(
      actions.channelStarredSuccess(
        action.isChannelStarred,
        action.currentChannel
      )
    );
  } catch (error) {
    yield put(actions.channelStarredFail(error));
  }
}

export function* getStarredChannelsSaga(action) {
  try {
    yield put(actions.getStarredChannelsStart());
    const response = yield axios({
      method: "get",
      url: "http://localhost:8080/api/v1/channel/starred-channels",
      headers: { Authorization: `Bearer ${action.token}` }
    });
    yield put(actions.getStarredChannelsSuccess(response.data.starredChannels));
  } catch (error) {
    yield put(actions.getStarredChannelsFail(error));
  }
}
