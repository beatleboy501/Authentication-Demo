import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';
import Sentiment from './Sentiment.jsx';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.apiRoot = "https://beatleboy501-authenticate-demo.herokuapp.com/api"; //"http://localhost:8080/api";
    this.state = {
      username: "",
      password: ""
    }
  }

  validate(data) {
    let isValid = true;
    let invalidEntries = [];
    Object.keys(data).forEach((key) => {
      let value = data[key];
      if (0 === value.length || !value) {
        isValid = false;
        invalidEntries.push(key.charAt(0).toUpperCase() + key.slice(1));
      }
    });
    return {
      isValid: isValid,
      invalidEntries: invalidEntries
    };
  }

  handleSubmit(e) {
    let self;
    e.preventDefault();
    self = this;
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const validationObject = this.validate(data);
    if (!validationObject.isValid) {
      alert(`Please Check the Following Entries:\n${ validationObject.invalidEntries }`);
      return;
    }
    let url = `${this.apiRoot}/create`;
    this.setState({
      username: "",
      password: ""
    });
    e.target.reset();
    axios.post(url, data)
        .then(data => {
          alert('User saved successfully');
        })
        .catch(err => {
          alert(err.data.message);
        });
  }

  handleInputChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#menu1">Home</a></li>
            <li><a data-toggle="tab" href="#menu2">Create User</a></li>
            <li><a data-toggle="tab" href="#menu3">Sentiment</a></li>
          </ul>
          <div className="tab-content">
            <div id="menu1" className="tab-pane fade in active">
              <h3>Home</h3>
              <p>The Create User tab is used to create a new User.</p>
              <p>The Sentiment tab is used to retrieve a "sentiment" of good, bad, or neutral as well as a confidence
                score.</p>
              <p>Server documentation can be found <a href="https://beatleboy501-authenticate-demo.herokuapp.com/module-Server.html">here</a>. </p>
            </div>
            <div id="menu2" className="tab-pane fade">
              <h3>Create User</h3>
              <Form identifier="createForm" onSubmit={this.handleSubmit}
                    onInputChange={this.handleInputChange} onPasswordChange={this.handlePasswordChange}
                    username={this.state.username} password={this.state.password}></Form>
            </div>
            <div id="menu3" className="tab-pane fade">
              <h3>Sentiment</h3>
              <Sentiment apiRoot={this.apiRoot} validation={this.validate}></Sentiment>
            </div>
          </div>
        </div>
    );
  }
}
