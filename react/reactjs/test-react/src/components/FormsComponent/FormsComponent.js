import React, { Component } from 'react';

import Input from './input/input';

class FormsComponent extends Component {
  state = {
    formFields: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
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
      dob: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: 'Date',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      gender: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'male', displayValue: 'Male' },
            { value: 'female', displayValue: 'Female' },
          ],
        },
        value: 'male',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
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
    const formData = {};
    for (const key in this.state.formFields) {
      formData[key] = this.state.formFields[key].value;
    }
    console.log(formData);
  };

  clearHandler = () => {
    const formData = { ...this.state.formFields };
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === 'gender') {
          formData[key].value = 'male';
        } else {
          formData[key].value = '';
        }
      }
    }
    this.setState({ formFields: formData });
  };

  render() {
    // For dynamically creating form based on the object in state
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
        <button type="submit">Submit</button>
        <button type="reset" onClick={this.clearHandler}>
          Clear
        </button>
      </form>
    );

    return (
      <div>
        <h1>Forms</h1>
        {formOut}
      </div>
    );
    // <form>
    //   <Input inputtype="input" type="text" name="name" placeholder="Name" />
    //   <Input
    //     inputtype="input"
    //     type="email"
    //     name="email"
    //     placeholder="Email"
    //   />
    //   <Input
    //     inputtype="input"
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //   />
    //   <Input inputtype="input" type="date" name="dob" placeholder="Date" />
    // </form>
  }
}

export default FormsComponent;
