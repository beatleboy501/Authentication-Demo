import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
const $ = require('jquery');

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
    $.ajax({
          type: 'POST',
          url: "https://authenticate-demo.herokuapp.com//api/sentiment",
          data: data
        })
        .done(function (data) {
          alert("Confidence: " + data.confidence + "\nSentiment: " + data.sentiment);
        })
        .fail(function (jqXhr) {
          alert('Failure: ' + jqXhr.responseJSON.message);
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
              <textarea rows="4" cols="50" onChange={this.onTokenChange} value={this.state.token}></textarea>
              <br/>
              <label>Sentence:</label>
              <br/>
              <textarea rows="4" cols="50" onChange={this.onSentenceChange} value={this.state.sentence}></textarea>
              <br/>
              <button type="submit">Get Sentiment</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
    );
  }
}
