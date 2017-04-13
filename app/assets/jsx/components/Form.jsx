import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';

const propTypes = {
  onSubmit: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
  onPasswordChange: React.PropTypes.func,
  username: React.PropTypes.String,
  password: React.PropTypes.String
};

export default class Form extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <form onSubmit={this.props.onSubmit}>
              <Input type="text" label="Username:" valChange={this.props.onInputChange} val={this.props.newUsername}/>
              <Input type="password" label="Password:" valChange={this.props.onPasswordChange} val={this.props.newPassword}/>
              <br/>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}

Form.PropTypes = propTypes;