import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";

import * as actions from "../../store/actions/index";
import { socket } from "../../shared/socket";

class DirectMessages extends Component {
  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.onGetAllUsers(this.props.token);
    }
    socket.getIO().on("user status", data => {
      if (data.action === "set user status") {
        this.props.onGetAllUsers(this.props.token);
      }
    });
  };

  componentWillUnmount = () => {
    socket.getIO().off();
  };

  isNotCurrentUser = userId => userId !== this.props.currentUser.userId;

  isUserOnline = user => user.status === "online";

  changeChannel = user => {
    const channelId = this.getChannelId(user._id);
    const channelData = {
      id: channelId,
      name: user.username
    };
    this.props.onSetCurrentChannel(channelData);
    this.props.onSetPrivateChannel(true);
    this.props.onSetActiveChannel(channelId);
  };

  getChannelId = userId => {
    const currentUserId = this.props.currentUser.userId;
    return userId < currentUserId
      ? `${userId}-${currentUserId}`
      : `${currentUserId}-${userId}`;
  };

  displayAllUsers = allUsers =>
    allUsers.length > 0 &&
    allUsers.map(user =>
      this.isNotCurrentUser(user._id) ? (
        <Menu.Item
          key={user._id}
          name={user.username}
          active={this.getChannelId(user._id) === this.props.activeChannel}
          onClick={() => this.changeChannel(user)}
          style={{ opacity: 0.7, fontStyle: "italic" }}
        >
          {/* {this.getNotificationCount(channel) && (
            <Label color="red">{this.getNotificationCount(channel)}</Label>
          )} */}
          <Icon
            name="circle"
            color={this.isUserOnline(user) ? "green" : "red"}
          />
          @ {user.username}
        </Menu.Item>
      ) : null
    );

  render() {
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{" "}
          ({this.props.allUsers.length - 1})
        </Menu.Item>
        {this.displayAllUsers(this.props.allUsers)}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    currentUser: state.user.user,
    loading: state.user.loading,
    allUsers: state.user.allUsers,
    activeChannel: state.channel.activeChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllUsers: token => dispatch(actions.getAllUsers(token)),
    onSetCurrentChannel: channel =>
      dispatch(actions.setCurrentChannel(channel)),
    onSetActiveChannel: channel => dispatch(actions.setActiveChannel(channel)),
    onSetPrivateChannel: isPrivateChannel =>
      dispatch(actions.setPrivateChannel(isPrivateChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectMessages);
