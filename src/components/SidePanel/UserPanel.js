import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AvatarEditor from "react-avatar-editor";
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button
} from "semantic-ui-react";

import * as actions from "../../store/actions/index";

class UserPanel extends Component {
  state = {
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: null,
    authorized: ["image/jpeg", "image/png"]
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar</span>
    },
    {
      key: "signout",
      text: "Sign Out",
      as: Link,
      to: "/logout"
    }
  ];

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({ croppedImage: imageUrl, blob });
      });
    }
  };

  isAuthorized = type => this.state.authorized.includes(type);

  uploadCroppedImage = () => {
    if (this.props.isAuthenticated) {
      if (this.isAuthorized(this.state.blob.type)) {
        const metadata = { contentType: this.state.blob.type };
        this.props.onUploadAvatar(this.props.token, this.state.blob, metadata);
      }
    }
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Grid style={{ background: this.props.primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ background: this.props.primaryColor }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>

            {/* User Dropdown  */}
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                style={{ paddingBottom: "1em" }}
                trigger={
                  <span>
                    <Image
                      src={currentUser.profileImageUrl}
                      spaced="right"
                      avatar
                    />
                    {currentUser.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>

          <Modal basic open={this.state.modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {this.state.previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}
                        image={this.state.previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {this.state.croppedImage && (
                      <Image
                        style={{ margin: "3.5em auto" }}
                        width={100}
                        height={100}
                        src={this.state.croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {this.state.croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name="save" /> Change Avatar
                </Button>
              )}

              <Button
                disabled={!this.state.previewImage}
                color="green"
                inverted
                onClick={this.handleCropImage}
              >
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUploadAvatar: (token, file, metadata) =>
      dispatch(actions.uploadAvatar(token, file, metadata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
