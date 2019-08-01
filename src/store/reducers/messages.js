import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  uploading: false,
  percentUploaded: 0,
  searchLoading: false,
  searchResults: [],
  typingUsers: {},
  typingChannelId: "",
  messagesLoading: false
};

const addMessageStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const addMessageSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const addMessageFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const getMessagesStart = (state, action) => {
  return updateObject(state, {
    messagesLoading: true,
    error: null
  });
};

const getMessagesSuccess = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    messagesLoading: false,
    error: null
  });
};

const getMessagesFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const uploadFileStart = (state, action) => {
  return updateObject(state, {
    uploading: true,
    percentUploaded: 0
  });
};

const uploadPercentUpdate = (state, action) => {
  return updateObject(state, {
    uploading: true,
    percentUploaded: action.percentUploaded
  });
};

const uploadFileSuccess = (state, action) => {
  return updateObject(state, {
    uploading: false,
    percentUploaded: 0
  });
};

const uploadFileFail = (state, action) => {
  return updateObject(state, {
    uploading: false,
    percentUploaded: 0,
    error: action.error
  });
};

const searchMessagesStart = (state, action) => {
  return updateObject(state, {
    searchLoading: true
  });
};

const searchMessagesFinish = (state, action) => {
  return updateObject(state, {
    searchLoading: false,
    searchResults: action.searchResults
  });
};

const searchMessagesFail = (state, action) => {
  return updateObject(state, {
    searchLoading: false,
    error: action.error
  });
};

const setTypingUsers = (state, action) => {
  return updateObject(state, {
    typingUsers: action.typingUsers,
    typingChannelId: action.channelId
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE_START:
      return addMessageStart(state, action);
    case actionTypes.ADD_MESSAGE_SUCCESS:
      return addMessageSuccess(state, action);
    case actionTypes.ADD_MESSAGE_FAIL:
      return addMessageFail(state, action);
    case actionTypes.GET_MESSAGES_START:
      return getMessagesStart(state, action);
    case actionTypes.GET_MESSAGES_SUCCESS:
      return getMessagesSuccess(state, action);
    case actionTypes.GET_MESSAGES_FAIL:
      return getMessagesFail(state, action);
    case actionTypes.UPLOAD_FILE_START:
      return uploadFileStart(state, action);
    case actionTypes.UPLOAD_PERCENT_UPDATE:
      return uploadPercentUpdate(state, action);
    case actionTypes.UPLOAD_FILE_SUCCESS:
      return uploadFileSuccess(state, action);
    case actionTypes.UPLOAD_FILE_FAIL:
      return uploadFileFail(state, action);
    case actionTypes.SEARCH_MESSAGES_START:
      return searchMessagesStart(state, action);
    case actionTypes.SEARCH_MESSAGES_FINISH:
      return searchMessagesFinish(state, action);
    case actionTypes.SEARCH_MESSAGES_FAIL:
      return searchMessagesFail(state, action);
    case actionTypes.SET_TYPING_USERS:
      return setTypingUsers(state, action);
    default:
      return state;
  }
};

export default reducer;
