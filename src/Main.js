import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";
import Login from "./Login";
 
export default class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <div className="content">
              <Route path="/" component={Login}/>
            </div>
          </div>
        </HashRouter>
      );
    }
  }