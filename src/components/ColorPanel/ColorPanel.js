import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { CirclePicker } from "react-color";

import * as actions from "../../store/actions/index";

class ColorPanel extends Component {
  state = {
    modal: false
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.onGetUserColors(this.props.token);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.setColorsLoading !== prevProps.setColorsLoading) {
      this.closeModal();
    }
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.props.onSetColorPrimary(color.hex);

  handleChangeSecondary = color => this.props.onSetColorSecondary(color.hex);

  handleSaveColors = () => {
    if (
      this.props.isAuthenticated &&
      this.props.colorPrimary &&
      this.props.colorSecondary
    ) {
      this.props.onSaveUserColors(
        this.props.token,
        this.props.colorPrimary,
        this.props.colorSecondary
      );
    }
  };

  displayUserColors = colors =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() =>
            this.props.onSetUserColors(color.primaryColor, color.secondaryColor)
          }
        >
          <div
            className="color__square"
            style={{ background: color.primaryColor }}
          >
            <div
              className="color__overlay"
              style={{ background: color.secondaryColor }}
            />
          </div>
        </div>
      </React.Fragment>
    ));

  render() {
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal} />

        <React.Fragment key={"default"}>
          <Divider />
          <div
            className="color__container"
            onClick={() => this.props.onSetUserColors("#4c3c4c", "#eee")}
          >
            <div className="color__square" style={{ background: "#4c3c4c" }}>
              <div className="color__overlay" style={{ background: "#eee" }} />
            </div>
          </div>
        </React.Fragment>

        {this.displayUserColors(this.props.userColors)}

        <Modal basic open={this.state.modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color" />
              <CirclePicker
                color={this.props.colorPrimary}
                onChange={this.handleChangePrimary}
              />
            </Segment>

            <Segment inverted>
              <Label content="Secondary Color" />
              <CirclePicker
                color={this.props.colorSecondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark" /> Save Colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    user: state.user.user,
    loading: state.user.loading,
    userColors: state.user.userColors,
    colorPrimary: state.user.colorPrimary,
    colorSecondary: state.user.colorSecondary,
    setColorsLoading: state.user.setColorsLoading,
    getColorsLoading: state.user.getColorsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetColorPrimary: color => dispatch(actions.setColorPrimary(color)),
    onSetColorSecondary: color => dispatch(actions.setColorSecondary(color)),
    onSaveUserColors: (token, colorPrimary, colorSecondary) =>
      dispatch(actions.saveUserColors(token, colorPrimary, colorSecondary)),
    onGetUserColors: token => dispatch(actions.getUserColors(token)),
    onSetUserColors: (primaryColor, secondaryColor) =>
      dispatch(actions.setUserColors(primaryColor, secondaryColor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPanel);
