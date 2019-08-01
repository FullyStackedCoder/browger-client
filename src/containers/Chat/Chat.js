import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/spinner";
import ColorPanel from "../../components/ColorPanel/ColorPanel";
import SidePanel from "../../components/SidePanel/SidePanel";
import Messages from "../../components/Messages/Messages";
import MetaPanel from "../../components/MetaPanel/MetaPanel";

class Chat extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onSetUser(this.props.userId, this.props.token);
    }
  }

  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/login" />;
    }

    let chat = null;

    if (this.props.user) {
      chat = (
        <React.Fragment>
          {authRedirect}
          <Grid
            columns="equal"
            className="app"
            style={{ background: this.props.secondaryColor }}
          >
            <ColorPanel key="colorpanel" />

            <SidePanel
              key="sidepanel"
              currentUser={this.props.user}
              primaryColor={this.props.primaryColor}
              secondaryColor={this.props.secondaryColor}
            />

            <Grid.Column style={{ marginLeft: 320 }}>
              <Messages key="messages" />
            </Grid.Column>

            <Grid.Column width={4}>
              <MetaPanel key="metapanel" />
            </Grid.Column>
          </Grid>
        </React.Fragment>
      );
    }

    if (this.props.error) {
      chat = (
        <p style={{ textAlign: "center" }}>
          User can't be loaded! Please try again later.
        </p>
      );
    }

    return this.props.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>{chat}</React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    token: state.auth.token,
    loading: state.user.loading,
    user: state.user.user,
    error: state.user.error,
    primaryColor: state.user.colorPrimary,
    secondaryColor: state.user.colorSecondary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: (userId, token) => dispatch(actions.setUser(userId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
