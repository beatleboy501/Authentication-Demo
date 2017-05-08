import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Form from './Form.jsx';
import axios from 'axios';

const propTypes = {
  apiRoot: React.PropTypes.string,
  validation: React.PropTypes.func
};

export default class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSentenceChange = this.onSentenceChange.bind(this);
    this.handleSentiment = this.handleSentiment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.renderAuthenticate = this.renderAuthenticate.bind(this);
    this.renderSentiment = this.renderSentiment.bind(this);
    this.state = {
      token: "",
      sentence: "",
      username: "",
      password: "",
      isAuthenticated: false
    }
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

  onSentenceChange(e) {
    this.setState({
      sentence: e.target.value
    })
  }

  handleSentiment(e) {
    let self;
    e.preventDefault();
    self = this;
    const data = {
      txt: this.state.sentence,
      token: this.state.token
    };
    if (!this.props.validation(data)) {
      alert('Validation Failure');
      return;
    }
    axios.post(`${this.props.apiRoot}/sentiment`, data)
        .then(data => {
          alert("Confidence: " + data.data.confidence + "\nSentiment: " + data.data.sentiment);
        })
        .catch(err => {
          alert(err);
        });
    this.setState({
      txt: ""
    });
    e.target.reset();
  }

  handleSubmit(e) {
    e.preventDefault();
    let self;
    self = this;
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const validationObject = this.props.validation(data);
    if (!validationObject.isValid) {
      alert(`Please Check the Following Entries:\n${ validationObject.invalidEntries }`);
      return;
    }
    let url = `${this.props.apiRoot}/authenticate`;
    axios.post(url, data)
        .then(data => {
          this.setState({
            isAuthenticated: true,
            token: data.data.token,
            username: "",
            password: ""
          })
        })
        .catch(err => {
          this.setState({
            username: "",
            password: ""
          });
          alert(err.data.message);
        });
    e.target.reset();
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      token: ""
    });
  }

  renderAuthenticate() {
    return (
        <div>
          <Form ref="auth" optionalTitle="Login"
                onSubmit={this.handleSubmit} onInputChange={this.handleInputChange}
                onPasswordChange={this.handlePasswordChange} username={this.state.username}
                password={this.state.password}></Form>
        </div>
    );
  }

  renderSentiment() {
    return (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <form onSubmit={this.handleSentiment}>
              <textarea hidden="true" name="token" rows="4" cols="50"
                        readOnly="true" value={this.state.token}></textarea>
              <label>Sentence:</label>
              <br/>
              <textarea name="sentence" rows="4" cols="50" onChange={this.onSentenceChange}
                        value={this.state.sentence}></textarea>
              <br/>
              <button type="submit">Get Sentiment</button>
            </form>
            <br/>
            <a onClick={this.logout}>Logout</a>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }

  render() {
    if (this.state.isAuthenticated) {
      return this.renderSentiment();
    } else {
      return this.renderAuthenticate();
    }

  }
}

Sentiment.PropTypes = propTypes;
