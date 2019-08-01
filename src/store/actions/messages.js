import * as actionTypes from "./actionTypes";

export const addMessage = (
  token,
  message,
  userId,
  channelId,
  displayName,
  profileImageUrl,
  messageType
) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    token: token,
    message: message,
    userId: userId,
    channelId: channelId,
    displayName: displayName,
    profileImageUrl: profileImageUrl,
    messageType: messageType
  };
};

export const addMessageStart = () => {
  return {
    type: actionTypes.ADD_MESSAGE_START
  };
};

export const addMessageSuccess = () => {
  return {
    type: actionTypes.ADD_MESSAGE_SUCCESS
  };
};

export const addMessageFail = error => {
  return {
    type: actionTypes.ADD_MESSAGE_FAIL,
    error: error
  };
};

export const getMessages = (token, channelId, callback) => {
  return {
    type: actionTypes.GET_MESSAGES,
    token,
    channelId,
    callback
  };
};

export const getMessagesStart = () => {
  return {
    type: actionTypes.GET_MESSAGES_START
  };
};

export const getMessagesSuccess = messages => {
  return {
    type: actionTypes.GET_MESSAGES_SUCCESS,
    messages
  };
};

export const getMessagesFail = error => {
  return {
    type: actionTypes.GET_MESSAGES_FAIL,
    error: error
  };
};

export const uploadFile = (
  token,
  file,
  metadata,
  userId,
  channelId,
  displayName,
  profileImageUrl,
  messageType
) => {
  return {
    type: actionTypes.UPLOAD_FILE,
    token: token,
    file: file,
    metadata: metadata,
    userId: userId,
    channelId: channelId,
    displayName: displayName,
    profileImageUrl: profileImageUrl,
    messageType: messageType
  };
};

export const uploadFileStart = () => {
  return {
    type: actionTypes.UPLOAD_FILE_START
  };
};

export const uploadPercentUpdate = percentUploaded => {
  return {
    type: actionTypes.UPLOAD_PERCENT_UPDATE,
    percentUploaded: percentUploaded
  };
};

export const uploadFileSuccess = () => {
  return {
    type: actionTypes.UPLOAD_FILE_SUCCESS
  };
};

export const uploadFileFail = error => {
  return {
    type: actionTypes.UPLOAD_FILE_FAIL,
    error: error
  };
};

export const searchMessages = (searchTerm, messages) => {
  return {
    type: actionTypes.SEARCH_MESSAGES,
    searchTerm: searchTerm,
    messages: messages
  };
};

export const searchMessagesStart = () => {
  return {
    type: actionTypes.SEARCH_MESSAGES_START
  };
};

export const searchMessagesFinish = searchResults => {
  return {
    type: actionTypes.SEARCH_MESSAGES_FINISH,
    searchResults: searchResults
  };
};

export const searchMessagesFail = error => {
  return {
    type: actionTypes.SEARCH_MESSAGES_FINISH,
    error: error
  };
};

export const setTypingUsers = (typingUsers, channelId) => {
  return {
    type: actionTypes.SET_TYPING_USERS,
    typingUsers,
    channelId
  };
};
