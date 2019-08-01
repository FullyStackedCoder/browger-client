import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import Message from "./Message";
import Typing from "./Typing";
import Skeleton from "./Skeleton";
import * as actions from "../../store/actions/index";
import { socket } from "../../shared/socket";

class Messages extends Component {
  state = {
    searchTerm: ""
  };

  componentDidMount = () => {
    socket.getIO().on("messages", data => {
      if (data.action === "added") {
        if (data.payload.channelId === this.props.channelId) {
          this.props.onGetMessages(
            this.props.token,
            this.props.channelId,
            this.countUniqueUsers
          );
        }
      }
    });
  };

  componentWillUnmount = () => {
    socket.getIO().off();
  };

  componentDidUpdate = prevProps => {
    if (this.props.channelId !== prevProps.channelId) {
      if (this.props.user && this.props.channelId) {
        this.props.onGetMessages(
          this.props.token,
          this.props.channelId,
          this.countUniqueUsers
        );
      }
    }
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  isChannelStarred = (currentChannel, starredChannels) => {
    let index = starredChannels.findIndex(
      channel => channel._id === currentChannel._id
    );

    if (index !== -1) {
      return true;
    }
  };

  handleStar = () => {
    this.props.onChannelStarred(
      this.props.token,
      this.isChannelStarred(
        this.props.currentChannel,
        this.props.starredChannels
      ),
      this.props.currentChannel
    );
  };

  countUniqueUsers = () => {
    const uniqueUsers = this.props.messages.reduce((acc, message) => {
      if (!acc.includes(message.username)) {
        acc.push(message.username);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.props.onSetUniqueUsers(numUniqueUsers);
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message key={message._id} message={message} user={this.props.user} />
    ));

  displayChannelName = currentChannel => {
    return currentChannel
      ? `${this.props.isPrivateChannel ? "@" : "#"}${currentChannel.name}`
      : "";
  };

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value }, () =>
      this.props.onSearchMessages(this.state.searchTerm, this.props.messages)
    );
  };

  displayTypingUsers = typingUsers =>
    Object.entries(typingUsers).length > 0 &&
    Object.entries(typingUsers).map(([username, channelId], i) => {
      if (
        this.props.user.displayName !== username &&
        this.props.channelId === channelId
      ) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.2em"
            }}
            key={i}
          >
            <span className="user__typing">{username} is typing</span>{" "}
            <Typing />
          </div>
        );
      } else {
        return null;
      }
    });

  displayMessageSkeleton = loading =>
    loading ? (
      <React.Fragment>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </React.Fragment>
    ) : null;

  render() {
    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(this.props.currentChannel)}
          uniqueUsers={this.props.uniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchTerm={this.state.searchTerm}
          searchLoading={this.props.searchLoading}
          isPrivateChannel={this.props.isPrivateChannel}
          handleStar={this.handleStar}
        />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessageSkeleton(this.props.messagesLoading)}
            {this.state.searchTerm
              ? this.displayMessages(this.props.searchResults)
              : this.displayMessages(this.props.messages)}
            {this.displayTypingUsers(this.props.typingUsers)}
            <div ref={node => (this.messagesEnd = node)} />
          </Comment.Group>
        </Segment>

        <MessagesForm />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    channelId: state.channel.activeChannel,
    user: state.user.user,
    messages: state.messages.messages,
    currentChannel: state.channel.currentChannel,
    uniqueUsers: state.channel.uniqueUsers,
    searchLoading: state.messages.searchLoading,
    searchResults: state.messages.searchResults,
    isPrivateChannel: state.channel.isPrivateChannel,
    starredChannels: state.channel.starredChannels,
    typingUsers: state.messages.typingUsers,
    messagesLoading: state.messages.messagesLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMessages: (token, channelId, callback) =>
      dispatch(actions.getMessages(token, channelId, callback)),
    onSetUniqueUsers: uniqueUsers =>
      dispatch(actions.setUniqueUsers(uniqueUsers)),
    onSearchMessages: (searchTerm, messages) =>
      dispatch(actions.searchMessages(searchTerm, messages)),
    onChannelStarred: (token, isChannelStarred, currentChannel) =>
      dispatch(actions.channelStarred(token, isChannelStarred, currentChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
