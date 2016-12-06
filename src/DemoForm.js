import React, { Component, PropTypes } from 'react';
import { Form, Button } from 'reactstrap';
import debounce from 'lodash.debounce';
import { DemoFormUrl } from './DemoFormUrl';
import { DemoFormEmail } from './DemoFormEmail';
import { DemoFormUsername } from './DemoFormUsername';
import { DemoFormPassword } from './DemoFormPassword';
import { DemoFormFirstAndLastName } from './DemoFormFirstAndLastName';
import { Legitimate, validators } from './lib/Legitimate';

const legitimate = new Legitimate();

export class DemoForm extends Component {

  static propTypes = {
    fields : PropTypes.array.isRequired
  };

  state = {
    submitted : false,
    urlError : false,
    emailError : false,
    usernameError : false,
    passwordError : false,
    firstAndLastNameError : false,
    firstAndLastNameLegit : false,
    usernameLegit : false,
    passwordLegit : false,
    emailLegit : false,
    urlLegit : false
  };

  onChange = (event, field) => {
    event.persist();

    debounce(() => legitimate
      .update(field, event.target.value)
      .validate(field)
      .then(response => {
        this.setState({
          [`${field}Error`] : false,
          [`${field}Legit`] : response
        });
      })
      .catch(response => this.setState({
        [`${field}Error`] : response,
        [`${field}Legit`] : false
      })))();
  };

  onSubmit = event => {
    event.preventDefault();
    legitimate
      .isLegit()
      .then(() => {
        this.setState({
          submitted : true
        })
      })
      .catch(response => response.map(console.info));
  };

  fieldRules = {
    firstAndLastName : [validators.notEmpty, validators.fullName],
    password : [
      validators.notEmpty,
      (...params) => validators.min(...params, 8),
      (...params) => validators.max(...params, 16),
      (...params) => validators.minLowerCaseChars(...params, 1),
      (...params) => validators.minUpperCaseChars(...params, 1)
    ],
    username : [
      validators.notEmpty,
      validators.alphanumeric,
      (...params) => validators.min(...params, 3),
      (...params) => validators.max(...params, 10),
    ],
    email : [validators.email, validators.notEmpty],
    url : [validators.url]
  };

  setFieldRules = fields => {
    fields.forEach(field => {
      if (this.fieldRules[field]) {
        legitimate.setRules(field, ...this.fieldRules[field]);
      }
    });
  };

  fieldComponents = {

    url : DemoFormUrl,
    email : DemoFormEmail,
    username : DemoFormUsername,
    password : DemoFormPassword,
    firstAndLastName : DemoFormFirstAndLastName

  };

  getfieldComponents = fields => fields.map((fieldKey, i) => this.fieldComponents[fieldKey]);

  filterUserFields = fields => Object.keys(this.fieldComponents).filter(field => fields.includes(field));

  render() {

    const
      fields = this.filterUserFields(this.props.fields),
      fieldComponents = this.getfieldComponents(fields);

    this.setFieldRules(fields);

    return this.state.submitted ? (
      <div className="Demo-intro">
        <h1>Cheers</h1>
      </div>
    ) : (

      <Form onSubmit={this.onSubmit}>

        { fieldComponents.map((FieldComponent, key) => (
          <FieldComponent key={key} {...this.state} onChange={this.onChange} />
        )) }

        <Button>Submit</Button>

      </Form>
    );

  }

}

export default DemoForm;

