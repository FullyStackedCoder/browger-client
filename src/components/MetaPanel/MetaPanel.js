import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List
} from "semantic-ui-react";

class MetaPanel extends Component {
  state = {
    activeIndex: 0
  };

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  countUserMessages = messages => {
    const userMessages = messages.reduce((acc, message) => {
      if (message.username in acc) {
        acc[message.username].count += 1;
      } else {
        acc[message.username] = {
          avatar: message.userAvatar,
          count: 1
        };
      }
      return acc;
    }, {});
    return userMessages;
  };

  formatCount = num => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

  displayTopPosters = userMessages =>
    Object.entries(userMessages)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{this.formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 3);

  render() {
    const { activeIndex } = this.state;
    if (this.props.isPrivateChannel) return null;
    return (
      <Segment loading={!this.props.currentChannel}>
        <Header as="h3" attached="top">
          About # {this.props.currentChannel && this.props.currentChannel.name}
        </Header>
        <Accordion styled attached="true">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {this.props.currentChannel && this.props.currentChannel.details}
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List>
              {this.props.messages &&
                this.displayTopPosters(
                  this.countUserMessages(this.props.messages)
                )}
            </List>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header as="h3">
              <Image
                circular
                src={
                  this.props.currentChannel &&
                  this.props.currentChannel.creator.profileImageUrl
                }
              />
              {this.props.currentChannel &&
                this.props.currentChannel.creator.username}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    messages: state.messages.messages
  };
};

export default connect(mapStateToProps)(MetaPanel);
