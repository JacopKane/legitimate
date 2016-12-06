import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import className from 'classname';

export class DemoFormUsername extends Component {

  static propTypes = {
    onChange : PropTypes.func.isRequired,
    usernameLegit : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    usernameError : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ])
  };

  render() {
    return (
      <FormGroup className={className({
        'has-danger' : this.props.usernameError !== false,
        'has-success' : this.props.usernameLegit instanceof Array
      })}>
        <Label for="username">Username</Label>
        <Input
          onChange={event => this.props.onChange(event, 'username')}
          type="text"
          name="username"
          id="username"
          placeholder="yourUsername"
          title="Please write a proper username"
          required />
        { this.props.usernameError === false ? '' : ( this.props.usernameError.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
        { this.props.usernameLegit === false ? '' : ( this.props.usernameLegit.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
      </FormGroup>
    );
  }

}

export default DemoFormUsername;

