import React from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploading, percentUploaded }) =>
  uploading ? (
    <Progress
      className="progress__bar"
      percent={percentUploaded}
      progress
      indicating
      size="medium"
      inverted
    />
  ) : null;

const mapStateToProps = state => {
  return {
    uploading: state.messages.uploading,
    percentUploaded: state.messages.percentUploaded
  };
};

export default connect(mapStateToProps)(ProgressBar);
