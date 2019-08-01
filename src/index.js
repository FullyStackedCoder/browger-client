import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/Home/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import "semantic-ui-css/semantic.min.css";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import channelReducer from "./store/reducers/channel";
import messagesReducer from "./store/reducers/messages";
import {
  watchAuth,
  watchUser,
  watchChannel,
  watchMessages
} from "./store/sagas/index";

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  channel: channelReducer,
  messages: messagesReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchChannel);
sagaMiddleware.run(watchMessages);

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
