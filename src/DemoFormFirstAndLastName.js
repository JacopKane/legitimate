import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import className from 'classname';

export class DemoFormFirstAndLastName extends Component {

  static propTypes = {
    firstAndLastNameLegit : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    firstAndLastNameError : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    onChange : PropTypes.func.isRequired
  };

  render() {
    return (
      <FormGroup className={className({
        'has-danger' : this.props.firstAndLastNameError !== false,
        'has-success' : this.props.firstAndLastNameLegit instanceof Array
      })}>
        <Label for="firstAndLastName">First and Last Name</Label>
        <Input
          onChange={event => this.props.onChange(event, 'firstAndLastName')}
          type="text"
          name="firstAndLastName"
          id="firstAndLastName"
          placeholder="First and Last Name"
          pattern="([A-z0-9À-ž\s]){3,}"
          title="Please write your full name correctly"
          minLength="4"
          required />
        { this.props.firstAndLastNameError === false ? '' : ( this.props.firstAndLastNameError.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
        { this.props.firstAndLastNameLegit === false ? '' : ( this.props.firstAndLastNameLegit.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
      </FormGroup>
    );
  }

}

export default DemoFormFirstAndLastName;

