import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';
import Sentiment from './Sentiment.jsx';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.apiRoot = "https://beatleboy501-authenticate-demo.herokuapp.com/api";
    this.state = {
      newUsername: "",
      newPassword: "",
      authUsername: "",
      authPassword: ""
    }
  }

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
    let url = isCreate ? `${this.apiRoot}/create` : `${this.apiRoot}/authenticate`;
    axios.post(url, data)
        .then(data => {
          if (isCreate) {
            alert('User saved successfully');
          } else {
            alert(data.data.message + "\n" + data.data.token);
          }
        })
        .catch(err => {
          alert(err);
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
              <p>The Create User tab is used to create a new User.</p>
              <p>The Authenticate User tab is used to generate the Auth token.</p>
              <p>The Sentiment tab is used to retrieve a "sentiment" of good, bad, or neutral as well as a confidence
                score.</p>
              <p>Server documentation can be found <a
                  href="http://localhost:8080/module-Server.html">here</a>. </p>
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
              <Sentiment apiRoot={this.apiRoot}></Sentiment>
            </div>
          </div>
        </div>
    );
  }
}
