import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <label>{this.props.label}</label>
          <br/>
          <input type="password" onChange={this.props.valChange} value={ this.props.val}/>
          <br/>
        </div>
    );
  }
}
