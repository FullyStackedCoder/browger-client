import React from "react";
import { Comment, Image } from "semantic-ui-react";

import { formatTimeFromTicks, formatAMPM } from "../../shared/utility";
import * as GLOBALS from "../../shared/globals";

const isOwnMessage = (message, user) => {
  return message.userId === user.userId ? "message__self" : "";
};

const isImage = message => {
  return message.messageType === "image";
};

const message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.userAvatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.username}</Comment.Author>
      <Comment.Metadata>
        {formatAMPM(formatTimeFromTicks(+message.timeStamp))}
      </Comment.Metadata>
      {isImage(message) ? (
        <Image
          src={`${GLOBALS.S3_BUCKET}${message.messageBody}`}
          className="message__image"
        />
      ) : (
        <Comment.Text>{message.messageBody}</Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default message;
