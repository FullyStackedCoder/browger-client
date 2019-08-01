import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message
} from "semantic-ui-react";
import Input from "../../components/UI/Input/input";
import { updateObject, checkValidity } from "../../shared/utility";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/aux";

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          name: "email",
          icon: "mail",
          iconPosition: "left",
          placeholder: "Email Address",
          type: "email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          name: "password",
          icon: "lock",
          iconPosition: "left",
          placeholder: "Password",
          type: "password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
          this.state.controls["password"].value
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

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      null,
      null,
      false
    );
  };

  render() {
    const { errors, loading } = this.props;
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    let errorMessage = null;
    if (errors) {
      errorMessage = (
        <Message error>
          <h3>Error</h3>
          <p>{errors.response.data.message}</p>
        </Message>
      );
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <Aux>
        {authRedirect}
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="black" textAlign="center">
              Login
            </Header>
            <Form onSubmit={this.submitHandler} size="large">
              <Segment stacked>
                {form}
                <Button
                  disabled={loading || !this.isFormValid()}
                  className={loading ? "loading" : ""}
                  color="blue"
                  fluid
                  size="large"
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errorMessage}
            <Message>
              Haven't registered yet? <Link to="/register">Register</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errors: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, username, passwordConfirmation, isRegister) =>
      dispatch(
        actions.auth(
          email,
          password,
          username,
          passwordConfirmation,
          isRegister
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
