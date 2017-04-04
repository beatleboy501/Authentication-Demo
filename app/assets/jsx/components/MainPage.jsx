import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CreateForm from './CreateForm.jsx';
import AuthenticateForm from './AuthenticateForm.jsx';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#menu1">Home</a></li>
            <li><a data-toggle="tab" href="#menu2">Create User</a></li>
            <li><a data-toggle="tab" href="#menu3">Authenticate User</a></li>
          </ul>

          <div className="tab-content">
            <div id="menu1" className="tab-pane fade">
              <h3>Home</h3>
              <p>Use the Create User to create a new User and use the Authenticate User tab to generate the Auth token</p>
            </div>
            <div id="menu2" className="tab-pane fade">
              <h3>Create User</h3>
              <CreateForm></CreateForm>
            </div>
            <div id="menu3" className="tab-pane fade">
              <h3>Authenticate User</h3>
              <AuthenticateForm></AuthenticateForm>
            </div>
          </div>
        </div>
    );
  }
}
