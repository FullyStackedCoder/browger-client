import * as actionTypes from "./actionTypes";

export const addChannel = (name, details, userId, token) => {
  return {
    type: actionTypes.ADD_CHANNEL,
    name: name,
    details: details,
    userId: userId,
    token: token
  };
};

export const addChannelStart = () => {
  return {
    type: actionTypes.ADD_CHANNEL_START
  };
};

export const addChannelSuccess = () => {
  return {
    type: actionTypes.ADD_CHANNEL_SUCCESS
  };
};

export const addChannelFail = error => {
  return {
    type: actionTypes.ADD_CHANNEL_FAIL,
    error: error
  };
};

export const getChannels = (token, callback) => {
  return {
    type: actionTypes.GET_CHANNELS,
    token: token,
    callback: callback
  };
};

export const getChannelsSuccess = channels => {
  return {
    type: actionTypes.GET_CHANNELS_SUCCESS,
    channels: channels
  };
};

export const getChannelsFail = error => {
  return {
    type: actionTypes.GET_CHANNELS_FAIL,
    error: error
  };
};

export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    channel
  };
};

export const setActiveChannel = channel => {
  return {
    type: actionTypes.SET_ACTIVE_CHANNEL,
    channel: channel
  };
};

export const setPrivateChannel = isPrivateChannel => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    isPrivateChannel
  };
};

export const setNotifications = notifications => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notifications
  };
};

export const setUniqueUsers = uniqueUsers => {
  return {
    type: actionTypes.SET_UNIQUE_USERS,
    uniqueUsers: uniqueUsers
  };
};

export const getNotificationMessages = (
  channelId,
  token,
  currentChannelId,
  notifications
) => {
  return {
    type: actionTypes.GET_NOTIFICATION_MESSAGES,
    channelId,
    token,
    currentChannelId,
    notifications
  };
};

export const getNotificationMessagesStart = () => {
  return {
    type: actionTypes.GET_NOTIFICATION_MESSAGES_START
  };
};

export const getNotificationMessagesSuccess = (
  totalMessages,
  channelId,
  currentChannelId,
  notifications
) => {
  return {
    type: actionTypes.GET_NOTIFICATION_MESSAGES_SUCCESS,
    totalMessages,
    channelId,
    currentChannelId,
    notifications
  };
};

export const getNotificationMessagesFail = error => {
  return {
    type: actionTypes.GET_NOTIFICATION_MESSAGES_FAIL,
    error
  };
};

export const channelStarred = (token, isChannelStarred, currentChannel) => {
  return {
    type: actionTypes.CHANNEL_STARRED,
    token,
    isChannelStarred,
    currentChannel
  };
};

export const channelStarredStart = () => {
  return {
    type: actionTypes.CHANNEL_STARRED_START
  };
};

export const channelStarredSuccess = (isChannelStarred, starredChannel) => {
  return {
    type: actionTypes.CHANNEL_STARRED_SUCCESS,
    isChannelStarred,
    starredChannel
  };
};

export const channelStarredFail = error => {
  return {
    type: actionTypes.CHANNEL_STARRED_FAIL,
    error
  };
};

export const getStarredChannels = token => {
  return {
    type: actionTypes.GET_STARRED_CHANNELS,
    token
  };
};

export const getStarredChannelsStart = () => {
  return {
    type: actionTypes.GET_STARRED_CHANNELS_START
  };
};

export const getStarredChannelsSuccess = starredChannelsFull => {
  return {
    type: actionTypes.GET_STARRED_CHANNELS_SUCCESS,
    starredChannelsFull
  };
};

export const getStarredChannelsFail = error => {
  return {
    type: actionTypes.GET_STARRED_CHANNELS_FAIL,
    error
  };
};

export const setIsChannelStarred = currentChannel => {
  return {
    type: actionTypes.SET_IS_CHANNEL_STARRED,
    currentChannel
  };
};
