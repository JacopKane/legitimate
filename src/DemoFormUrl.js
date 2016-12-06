import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import className from 'classname';

export class DemoFormUrl extends Component {

  static propTypes = {
    onChange : PropTypes.func.isRequired,
    urlLegit : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ]),
    urlError : React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool
    ])
  };

  render() {
    return (
      <FormGroup className={className({
        'has-danger' : this.props.urlError !== false,
        'has-success' : this.props.urlLegit instanceof Array
      })}>
        <Label for="url">Url</Label>
        <Input
          onChange={event => this.props.onChange(event, 'url')}
          type="url"
          name="url"
          id="url"
          placeholder="http://example.com"  />
        { this.props.urlError === false ? '' : ( this.props.urlError.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
        { this.props.urlLegit === false ? '' : ( this.props.urlLegit.map((response, key) => (
          <div key={key} className="form-control-feedback">{response}</div>
        )))}
      </FormGroup>
    );
  }

}

export default DemoFormUrl;

