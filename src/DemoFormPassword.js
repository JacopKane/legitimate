import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import className from 'classname';

export class DemoFormPassword extends Component {

  static propTypes = {
    onChange : PropTypes.func.isRequired,
    passwordLegit : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    passwordError : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ])
  };

  render() {
    return (
      <FormGroup className={className({
        'has-danger' : this.props.passwordError !== false,
        'has-success' : this.props.passwordLegit instanceof Array
      })}>
        <Label for="password">Password</Label>
        <Input
          onChange={event => this.props.onChange(event, 'password')}
          type="password"
          name="password"
          id="password"
          placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
          required />
        { this.props.passwordError === false ? '' : ( this.props.passwordError.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
        { this.props.passwordLegit === false ? '' : ( this.props.passwordLegit.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
      </FormGroup>
    );
  }

}

export default DemoFormPassword;

