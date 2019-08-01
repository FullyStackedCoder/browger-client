import React from "react";
import { connect } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const isChannelStarred = (currentChannel, starredChannels) => {
  if (currentChannel && starredChannels) {
    let index = starredChannels.findIndex(
      channel => channel._id === currentChannel._id
    );

    if (index !== -1) {
      return true;
    }
  }
};

const messagesHeader = props => {
  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {props.channelName}
          {!props.isPrivateChannel && (
            <Icon
              onClick={props.handleStar}
              name={
                isChannelStarred(props.currentChannel, props.starredChannels)
                  ? "star"
                  : "star outline"
              }
              color={
                isChannelStarred(props.currentChannel, props.starredChannels)
                  ? "yellow"
                  : "black"
              }
            />
          )}
        </span>
        <Header.Subheader>{props.uniqueUsers}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          onChange={props.handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
          loading={props.searchLoading}
          value={props.searchTerm}
        />
      </Header>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    isChannelStarred: state.channel.isChannelStarred,
    currentChannel: state.channel.currentChannel,
    starredChannels: state.channel.starredChannels
  };
};

export default connect(mapStateToProps)(messagesHeader);
