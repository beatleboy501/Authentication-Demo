import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';
import Sentiment from './Sentiment.jsx';

const $ = require('jquery');

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.state = {
      newUsername: "",
      newPassword: "",
      authUsername: "",
      authPassword: ""
    }
  }

  // TODO: add more validation or use lib
  validate(data) {
    if (!data.username || 0 === data.username.length) {
      return false;
    } else if (!data.password || 0 === data.password.length) {
      return false;
    }
    return true;
  }

  handleSubmit(refName, e) {
    let isCreate = refName == "create";
    let self;
    e.preventDefault();
    self = this;
    let data = isCreate ? {
      username: this.state.newUsername,
      password: this.state.newPassword,
      admin: true
    } : {
      username: this.state.authUsername,
      password: this.state.authPassword
    };
    if (!this.validate(data)) {
      alert('Validation Failure');
      return;
    }
    let url = isCreate ? "https://authenticate-demo.herokuapp.com//api/create" : "https://authenticate-demo.herokuapp.com//api/authenticate";
    $.ajax({
          type: 'POST',
          url: url,
          data: data
        })
        .done(function (data) {
          if (isCreate) {
            alert('User saved successfully');
          } else {
            alert(data.message + "\n" + data.token);
          }
        })
        .fail(function (jqXhr) {
          alert('Failure: ' + jqXhr.responseJSON.message);
        });
    this.setState({
      newUsername: "",
      newPassword: "",
      authUsername: "",
      authPassword: ""
    });
    e.target.reset();
  }

  handleInputChange(refName, e) {
    if (refName == "create") {
      this.setState({
        newUsername: e.target.value
      })
    } else {
      this.setState({
        authUsername: e.target.value
      })
    }
  }

  handlePasswordChange(refName, e) {
    if (refName == "create") {
      this.setState({
        newPassword: e.target.value
      })
    } else {
      this.setState({
        authPassword: e.target.value
      })
    }
  }

  render() {
    return (
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#menu1">Home</a></li>
            <li><a data-toggle="tab" href="#menu2">Create User</a></li>
            <li><a data-toggle="tab" href="#menu3">Authenticate User</a></li>
            <li><a data-toggle="tab" href="#menu4">Sentiment</a></li>
          </ul>

          <div className="tab-content">
            <div id="menu1" className="tab-pane fade in active">
              <h3>Home</h3>
              <p>Use the Create User to create a new User and use the Authenticate User tab to generate the Auth
                token</p>
            </div>
            <div id="menu2" className="tab-pane fade">
              <h3>Create User</h3>
              <Form ref="create" identifier="createForm" onSubmit={this.handleSubmit.bind(this, "create")}
                    onInputChange={this.handleInputChange.bind(this, "create")}
                    onPasswordChange={this.handlePasswordChange.bind(this, "create")} username={this.state.newUsername}
                    password={this.state.newPassword}></Form>
            </div>
            <div id="menu3" className="tab-pane fade">
              <h3>Authenticate User</h3>
              <Form ref="auth" onSubmit={this.handleSubmit.bind(this, "auth")}
                    onInputChange={this.handleInputChange.bind(this, "auth")}
                    onPasswordChange={this.handlePasswordChange.bind(this, "auth")} username={this.state.authUsername}
                    password={this.state.authPassword}></Form>
            </div>
            <div id="menu4" className="tab-pane fade">
              <h3>Sentiment</h3>
              <Sentiment></Sentiment>
            </div>
          </div>
        </div>
    );
  }
}
