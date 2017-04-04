import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <button type="submit" onClick={this.props.submit}>
            Submit
          </button>
        </div>
    );
  }
}
