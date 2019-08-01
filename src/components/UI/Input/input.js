import React from "react";

import { Form } from "semantic-ui-react";
// import Aux from "../../../hoc/aux";

const input = props => {
  let inputElement = null;
  let inputClasses = [];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("error");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <Form.Input
          fluid
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(" ")}
        />
      );
      break;
    default:
      inputElement = (
        <Form.Input
          fluid
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
  }

  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default input;
