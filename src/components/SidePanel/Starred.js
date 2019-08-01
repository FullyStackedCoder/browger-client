import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";

import * as actions from "../../store/actions/index";

class Starred extends Component {
  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.onGetStarredChannels(this.props.token);
    }
  };

  changeChannel = async channel => {
    await this.props.onSetCurrentChannel(channel);
    this.props.onSetActiveChannel(channel._id);
    this.props.onSetPrivateChannel(false);
  };

  displayChannels = starredChannels =>
    starredChannels.length > 0 &&
    starredChannels.map(channel => (
      <Menu.Item
        key={channel._id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel._id === this.props.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{" "}
          ({this.props.starredChannels.length})
        </Menu.Item>
        {this.displayChannels(this.props.starredChannels)}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    loading: state.channel.loading,
    channels: state.channel.channels,
    activeChannel: state.channel.activeChannel,
    currentChannel: state.channel.currentChannel,
    starredChannels: state.channel.starredChannels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentChannel: channel =>
      dispatch(actions.setCurrentChannel(channel)),
    onSetActiveChannel: channel => dispatch(actions.setActiveChannel(channel)),
    onSetPrivateChannel: isPrivateChannel =>
      dispatch(actions.setPrivateChannel(isPrivateChannel)),
    onGetStarredChannels: token => dispatch(actions.getStarredChannels(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Starred);
