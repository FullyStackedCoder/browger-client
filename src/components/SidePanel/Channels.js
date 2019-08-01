import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Label } from "semantic-ui-react";
import { socket } from "../../shared/socket";

import Input from "../../components/UI/Input/input";
import { updateObject, checkValidity } from "../../shared/utility";
import * as actions from "../../store/actions/index";

class Channels extends Component {
  state = {
    controls: {
      channelName: {
        elementType: "input",
        elementConfig: {
          name: "channelName",
          type: "text",
          placeholder: "Name of Channel"
        },
        value: "",
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false
      },
      channelDetails: {
        elementType: "input",
        elementConfig: {
          name: "channelDetails",
          type: "text",
          placeholder: "About the Channel"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    modal: false,
    firstLoad: true,
    notifications: []
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.onGetChannels(this.props.token, this.setFirstChannel);
    }
    socket.getIO().on("channels", data => {
      if (data.action === "add") {
        this.props.onGetChannels(this.props.token);
      }
    });
    socket.getIO().on("messages", data => {
      if (data.action === "added") {
        this.props.onGetNotificationMessages(
          data.payload.channelId,
          this.props.token,
          this.props.currentChannel._id,
          this.props.notifications
        );
        // this.handleNotifications(
        //   data.payload.channelId,
        //   this.props.currentChannel._id,
        //   this.state.notifications
        // );
      }
    });
  };

  componentWillUnmount = () => {
    socket.getIO().off();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.loading !== prevProps.loading) {
      const updatedControls = updateObject(this.state.controls, {
        channelName: updateObject(this.state.controls["channelName"], {
          value: ""
        }),
        channelDetails: updateObject(this.state.controls["channelDetails"], {
          value: ""
        })
      });
      this.setState({ controls: updatedControls });
      this.closeModal();
    }
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleNotifications = (channelId, currentChannelId, notifications) => {
    let lastTotal = 0;

    let index = notifications.findIndex(
      notification => notification.id === channelId
    );
    console.log(index);
    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;

        if (this.props.totalMessages - lastTotal > 0) {
          notifications[index].count = this.props.totalMessages - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = this.props.totalMessages;
    } else {
      notifications.push({
        id: channelId,
        total: this.props.totalMessages,
        lastKnownTotal: this.props.totalMessages,
        count: 1
      });
    }
    this.props.onSetNotifications(notifications);
  };

  setFirstChannel = () => {
    const firstChannel = this.props.channels[0];
    if (this.state.firstLoad && this.props.channels.length > 0) {
      this.props.onSetCurrentChannel(firstChannel);
      this.props.onSetActiveChannel(firstChannel._id);
      this.props.onSetIsChannelStarred(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  changeChannel = async channel => {
    await this.props.onSetCurrentChannel(channel);
    this.props.onSetActiveChannel(channel._id);
    this.props.onSetPrivateChannel(false);
    this.clearNotifications();
    this.props.onSetIsChannelStarred(channel);
  };

  clearNotifications = () => {
    let index = this.props.notifications.findIndex(
      notification => notification.id === this.props.currentChannel._id
    );

    if (index !== -1) {
      let updatedNotifications = [...this.props.notifications];
      updatedNotifications[index].total = this.props.notifications[
        index
      ].lastKnownTotal;
      updatedNotifications[index].count = 0;
      this.props.onSetNotifications(updatedNotifications);
    }
  };

  getNotificationCount = channel => {
    let count = 0;
    this.props.notifications.forEach(notification => {
      if (
        notification.id === channel._id &&
        notification.id !== this.props.currentChannel._id
      ) {
        count = notification.count;
      }
    });
    if (count > 0) return count;
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel._id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel._id === this.props.activeChannel}
      >
        {this.getNotificationCount(channel) && (
          <Label color="red">{this.getNotificationCount(channel)}</Label>
        )}
        # {channel.name}
      </Menu.Item>
    ));

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
          null
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  isFormValid = () => {
    let isFormValid = true;
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    formElementsArray.forEach(element => {
      isFormValid = element.config.valid && isFormValid;
    });
    return isFormValid;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddChannel(
      this.state.controls.channelName.value,
      this.state.controls.channelDetails.value,
      this.props.currentUser.userId,
      this.props.token
    );
  };

  render() {
    const { modal } = this.state;
    const { channels } = this.props;

    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Form.Field key={formElement.id}>
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      </Form.Field>
    ));

    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>{form}</Form>
          </Modal.Content>

          <Modal.Actions>
            <Button
              disabled={this.props.loading || !this.isFormValid()}
              className={this.props.loading ? "loading" : ""}
              color="green"
              inverted
              onClick={this.handleSubmit}
            >
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
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
    notifications: state.channel.notifications,
    messages: state.messages.messages,
    totalMessages: state.channel.totalMessages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddChannel: (name, details, userId, token) =>
      dispatch(actions.addChannel(name, details, userId, token)),
    onGetChannels: (token, callback) =>
      dispatch(actions.getChannels(token, callback)),
    onSetCurrentChannel: channel =>
      dispatch(actions.setCurrentChannel(channel)),
    onSetActiveChannel: channel => dispatch(actions.setActiveChannel(channel)),
    onGetNotificationMessages: (
      channelId,
      token,
      currentChannelId,
      notifications
    ) =>
      dispatch(
        actions.getNotificationMessages(
          channelId,
          token,
          currentChannelId,
          notifications
        )
      ),
    onSetNotifications: notifications =>
      dispatch(actions.setNotifications(notifications)),
    onSetPrivateChannel: isPrivateChannel =>
      dispatch(actions.setPrivateChannel(isPrivateChannel)),
    onSetIsChannelStarred: currentChannel =>
      dispatch(actions.setIsChannelStarred(currentChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
