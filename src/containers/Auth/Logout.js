import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onLogout(this.props.token);
    }
  }

  render() {
    let redirect = null;
    if (this.props.logoutDone) {
      redirect = <Redirect to="/" />;
    }
    return <React.Fragment>{redirect}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    logoutDone: state.auth.logoutDone
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: token => dispatch(actions.logout(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
