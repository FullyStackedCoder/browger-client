import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";
import { Picker, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import * as actions from "../../store/actions/index";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";
import { socket } from "../../shared/socket";

class MessagesForm extends Component {
  state = {
    message: "",
    modal: false,
    errors: [],
    emojiPicker: false
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  componentDidMount = () => {
    socket.getIO().on("userTypingUpdate", data => {
      this.props.onSetTypingUsers(data.typingUsers, data.channelId);
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.loading !== prevProps.loading) {
      this.setState({ message: "" });
    }
  };

  componentWillUnmount = () => {
    socket.getIO().emit("stopType", {
      username: this.props.user.displayName
    });
    socket.getIO().off();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyDown = event => {
    if (this.state.message.length > 0) {
      socket.getIO().emit("startType", {
        username: this.props.user.displayName,
        channelId: this.props.channelId
      });
    } else {
      socket.getIO().emit("stopType", {
        username: this.props.user.displayName
      });
    }
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };

  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker });
  };

  handleAddEmoji = emoji => {
    const oldMessage = this.state.message;
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
    this.setState({ message: newMessage, emojiPicker: false });
    setTimeout(() => this.messageInputRef.focus(), 0);
  };

  colonToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  sendMessage = () => {
    if (this.state.message) {
      this.props.onAddMessage(
        this.props.token,
        this.state.message,
        this.props.user.userId,
        this.props.channelId,
        this.props.user.displayName,
        this.props.user.profileImageUrl,
        "text"
      );
      this.setState({ message: "", errors: [] });
      socket.getIO().emit("stopType", {
        username: this.props.user.displayName
      });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message." })
      });
    }
  };

  uploadFile = (file, metadata) => {
    this.props.onUploadFile(
      this.props.token,
      file,
      metadata,
      this.props.user.userId,
      this.props.channelId,
      this.props.user.displayName,
      this.props.user.profileImageUrl,
      "image"
    );
  };

  render() {
    return (
      <Segment className="message__form">
        {this.state.emojiPicker && (
          <Picker
            set="apple"
            onSelect={this.handleAddEmoji}
            className="emojipicker"
            title="Pick your emoji"
            emoji="point_up"
          />
        )}
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0em" }}
          label={
            <Button
              icon={this.state.emojiPicker ? "close" : "smile outline"}
              content={this.state.emojiPicker ? "Close" : null}
              onClick={this.handleTogglePicker}
            />
          }
          labelPosition="left"
          action={
            <Button
              disabled={this.props.uploading}
              icon="add"
              onClick={this.openModal}
            />
          }
          // actionPosition="right"
          placeholder="Write your message..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value={this.state.message}
          ref={node => (this.messageInputRef = node)}
          disabled={this.props.loading}
          loading={this.props.loading}
          className={
            this.state.errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
        />
        <FileModal
          modal={this.state.modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
        <ProgressBar />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    user: state.user.user,
    channelId: state.channel.activeChannel,
    loading: state.messages.loading,
    uploading: state.messages.uploading,
    isPrivateChannel: state.channel.isPrivateChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddMessage: (
      token,
      message,
      userId,
      channelId,
      displayName,
      profileImageUrl,
      messageType
    ) =>
      dispatch(
        actions.addMessage(
          token,
          message,
          userId,
          channelId,
          displayName,
          profileImageUrl,
          messageType
        )
      ),
    onUploadFile: (
      token,
      file,
      metadata,
      userId,
      channelId,
      displayName,
      profileImageUrl,
      messageType
    ) =>
      dispatch(
        actions.uploadFile(
          token,
          file,
          metadata,
          userId,
          channelId,
          displayName,
          profileImageUrl,
          messageType
        )
      ),
    onSetTypingUsers: (typingUsers, channelId) =>
      dispatch(actions.setTypingUsers(typingUsers, channelId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesForm);
