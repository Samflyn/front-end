import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/FormsComponent/input/input';
import * as authActions from '../../store/actions/authAction';

class Auth extends Component {
  state = {
    formFields: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
    isSignUp: true,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, formElement) => {
    const updatedForm = {
      ...this.state.formFields,
    };
    const updatedFormField = {
      ...updatedForm[formElement],
    };
    updatedFormField.value = event.target.value;
    updatedFormField.valid = this.checkValidity(
      event.target.value,
      updatedFormField.validation
    );
    updatedForm[formElement] = updatedFormField;
    this.setState({ formFields: updatedForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.formFields.email.value,
      this.state.formFields.password.value,
      this.state.isSignUp
    );
  };

  clearHandler = () => {
    const formData = { ...this.state.formFields };
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formData[key].value = '';
      }
    }
    this.setState({ formFields: formData });
  };

  switchMode = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  logout = () => {
    this.props.onLogout();
  };

  render() {
    const formElements = [];
    for (const key in this.state.formFields) {
      if (this.state.formFields.hasOwnProperty(key)) {
        formElements.push({
          id: key,
          config: this.state.formFields[key],
        });
      }
    }

    let formOut = (
      <form onSubmit={this.submitHandler}>
        {this.props.token ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Logged In</p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Logged Out</p>
        )}
        {formElements.map((formEl) => {
          return (
            <Input
              key={formEl.id}
              elementtype={formEl.config.elementType}
              elementconfig={formEl.config.elementConfig}
              value={formEl.config.value}
              changed={(event) => this.inputChangeHandler(event, formEl.id)}
            />
          );
        })}
        {/* shorter syntax */}
        {this.props.error && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            {this.props.error.message}
          </p>
        )}
        <br />
        <button type="submit">
          {!this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
        <button type="button" onClick={this.switchMode}>
          Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
        <button type="reset" onClick={this.clearHandler}>
          Clear
        </button>
        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </form>
    );

    return (
      <div>
        <h1>Authentication</h1>
        {formOut}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(authActions.auth(email, password, isSignUp)),
    onLogout: () => dispatch(authActions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
