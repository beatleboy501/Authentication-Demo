import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import axios from 'axios';

const propTypes = {
  apiRoot: React.PropTypes.string
};

export default class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onSentenceChange = this.onSentenceChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      token: "",
      sentence: ""
    }
  }

  onTokenChange(e) {
    this.setState({
      token: e.target.value
    })
  }

  onSentenceChange(e) {
    this.setState({
      sentence: e.target.value
    })
  }

  handleClick(e) {
    let self;
    e.preventDefault();
    self = this;
    const data = {
      txt: this.state.sentence,
      token: this.state.token
    };
    axios.post(`${this.props.apiRoot}/sentiment`, data)
        .then(data => {
          alert("Confidence: " + data.data.confidence + "\nSentiment: " + data.data.sentiment);
        })
        .catch(err => {
          alert(err);
        });
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <form onSubmit={this.handleClick}>
              <label>Auth Token:</label>
              <br/>
              <textarea name="token" rows="4" cols="50" onChange={this.onTokenChange} value={this.state.token}></textarea>
              <br/>
              <label>Sentence:</label>
              <br/>
              <textarea name="sentence" rows="4" cols="50" onChange={this.onSentenceChange} value={this.state.sentence}></textarea>
              <br/>
              <button type="submit">Get Sentiment</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}

Sentiment.PropTypes = propTypes;
