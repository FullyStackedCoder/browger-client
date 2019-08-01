import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "../../shared/socket";

import "./App.css";
import Chat from "../Chat/Chat";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Logout from "../Auth/Logout";
import * as actions from "../../store/actions/index";

class App extends Component {
  componentDidMount() {
    socket.init();
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        {/* <Route exact path="/" component={Chat} /> */}
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Chat} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
