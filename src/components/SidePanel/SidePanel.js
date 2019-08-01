import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Starred from "./Starred";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";

const sidePanel = props => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: props.primaryColor, fontSize: "1.2rem" }}
    >
      <UserPanel
        currentUser={props.currentUser}
        primaryColor={props.primaryColor}
      />
      <Starred currentUser={props.currentUser} />
      <Channels currentUser={props.currentUser} />
      <DirectMessages />
    </Menu>
  );
};

export default sidePanel;
