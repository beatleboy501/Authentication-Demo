import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Password from './Password.jsx';
const $ = require('jquery');

export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.state = {
      username: "",
      password: ""
    }
  }

  userNameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleClick(e) {
    let self;
    e.preventDefault();
    self = this;
    let data = {
      username: this.state.username,
      password: this.state.password,
      admin: true
    };

    $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/api/create',
          data: data
        })
        .done(function(data) {
          alert('User saved successfully');
        })
        .fail(function(jqXhr) {
          alert('Failed to register');
        });
    this.userNameChange('');
    this.passwordChange('');
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <form onSubmit={this.handleClick}>
              <Input label="Username:" valChange={this.userNameChange} val={this.state.username}/>
              <Password label="Password:" valChange={this.passwordChange} val={this.state.password}/>
              <br/>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}
