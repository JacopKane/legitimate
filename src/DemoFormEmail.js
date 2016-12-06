import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import className from 'classname';

export class DemoFormEmail extends Component {

  static propTypes = {
    onChange : PropTypes.func.isRequired,
    emailLegit : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    emailError : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ])
  };

  render() {
    return (
      <FormGroup className={className({
        'has-danger' : this.props.emailError !== false,
        'has-success' : this.props.emailLegit instanceof Array
      })}>
        <Label for="email">Email</Label>
        <Input
          onChange={event => this.props.onChange(event, 'email')}
          type="email"
          name="email"
          id="email"
          placeholder="your.email@example.com"
          required />
        { this.props.emailError === false ? '' : ( this.props.emailError.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
        { this.props.emailLegit === false ? '' : ( this.props.emailLegit.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
      </FormGroup>
    );
  }

}

export default DemoFormEmail;

