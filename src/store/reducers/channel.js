import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  channels: [],
  currentChannel: null,
  activeChannel: "",
  channel: null,
  isPrivateChannel: false,
  uniqueUsers: "",
  notifications: [],
  totalMessages: 0,
  loading: false,
  error: null,
  loadingNotifications: false,
  starredChannels: [],
  isChannelStarred: false
};

const addChannelStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
};

const addChannelSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null
  });
};

const addChannelFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const getChannelsSuccess = (state, action) => {
  return updateObject(state, {
    channels: action.channels
  });
};

const getChannelsFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const setCurrentChannel = (state, action) => {
  return updateObject(state, {
    currentChannel: action.channel
  });
};

const setActiveChannel = (state, action) => {
  return updateObject(state, {
    activeChannel: action.channel
  });
};

const setPrivateChannel = (state, action) => {
  return updateObject(state, {
    isPrivateChannel: action.isPrivateChannel
  });
};

const setNotifications = (state, action) => {
  return updateObject(state, {
    notifications: action.notifications
  });
};

const setUniqueUsers = (state, action) => {
  return updateObject(state, {
    uniqueUsers: action.uniqueUsers
  });
};

const getNotificationMessagesStart = (state, action) => {
  return updateObject(state, {
    loadingNotifications: true
  });
};

const getNotificationMessagesSuccess = (state, action) => {
  let lastTotal = 0;

  let index = action.notifications.findIndex(
    notification => notification.id === action.channelId
  );
  if (index !== -1) {
    if (action.channelId !== action.currentChannelId) {
      lastTotal = action.notifications[index].total;

      if (action.totalMessages - lastTotal > 0) {
        action.notifications[index].count = action.totalMessages - lastTotal;
      }
    }
    action.notifications[index].lastKnownTotal = action.totalMessages;
  } else {
    action.notifications.push({
      id: action.channelId,
      total: action.totalMessages,
      lastKnownTotal: action.totalMessages,
      count: 0
    });
  }

  return updateObject(state, {
    totalMessages: action.totalMessages,
    notifications: action.notifications,
    loadingNotifications: false
  });
};

const getNotificationMessagesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingNotifications: false
  });
};

const channelStarredStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const channelStarredSuccess = (state, action) => {
  let updatedStarredChannels = [
    ...state.starredChannels,
    action.starredChannel
  ];
  if (action.isChannelStarred) {
    updatedStarredChannels = state.starredChannels.filter(channel => {
      return channel._id !== action.starredChannel._id;
    });
  }
  return updateObject(state, {
    loading: false,
    isChannelStarred: !state.isChannelStarred,
    starredChannels: updatedStarredChannels
  });
};

const channelStarredFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const getStarredChannelsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
};

const getStarredChannelsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    starredChannels: action.starredChannelsFull
  });
};

const getStarredChannelsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const setIsChannelStarred = (state, action) => {
  let isChannelStarred = false;
  let index = state.starredChannels.findIndex(channel => {
    return channel._id === action.currentChannel._id;
  });
  if (index !== -1) {
    isChannelStarred = true;
  }
  return updateObject(state, {
    isChannelStarred: isChannelStarred
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHANNEL_START:
      return addChannelStart(state, action);
    case actionTypes.ADD_CHANNEL_SUCCESS:
      return addChannelSuccess(state, action);
    case actionTypes.ADD_CHANNEL_FAIL:
      return addChannelFail(state, action);
    case actionTypes.GET_CHANNELS_SUCCESS:
      return getChannelsSuccess(state, action);
    case actionTypes.GET_CHANNELS_FAIL:
      return getChannelsFail(state, action);
    case actionTypes.SET_CURRENT_CHANNEL:
      return setCurrentChannel(state, action);
    case actionTypes.SET_ACTIVE_CHANNEL:
      return setActiveChannel(state, action);
    case actionTypes.SET_PRIVATE_CHANNEL:
      return setPrivateChannel(state, action);
    case actionTypes.SET_NOTIFICATIONS:
      return setNotifications(state, action);
    case actionTypes.SET_UNIQUE_USERS:
      return setUniqueUsers(state, action);
    case actionTypes.GET_NOTIFICATION_MESSAGES_START:
      return getNotificationMessagesStart(state, action);
    case actionTypes.GET_NOTIFICATION_MESSAGES_SUCCESS:
      return getNotificationMessagesSuccess(state, action);
    case actionTypes.GET_NOTIFICATION_MESSAGES_FAIL:
      return getNotificationMessagesFail(state, action);
    case actionTypes.CHANNEL_STARRED_START:
      return channelStarredStart(state, action);
    case actionTypes.CHANNEL_STARRED_SUCCESS:
      return channelStarredSuccess(state, action);
    case actionTypes.CHANNEL_STARRED_FAIL:
      return channelStarredFail(state, action);
    case actionTypes.GET_STARRED_CHANNELS_START:
      return getStarredChannelsStart(state, action);
    case actionTypes.GET_STARRED_CHANNELS_SUCCESS:
      return getStarredChannelsSuccess(state, action);
    case actionTypes.GET_STARRED_CHANNELS_FAIL:
      return getStarredChannelsFail(state, action);
    case actionTypes.SET_IS_CHANNEL_STARRED:
      return setIsChannelStarred(state, action);
    default:
      return state;
  }
};

export default reducer;
