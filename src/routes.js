import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';
import asyncComponent from "./utilities/asynccomponent";
import * as actions from './actions/authaction';
import { connect } from 'react-redux';
import Dashboard from "./containers/dashboard";
import ChangePassword from "./containers/changePassword";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // componentDidMount() {

  //   this.props.onTryAutoSignup();

  // }

  render() {
    console.log("isAuthenticatedAlone", this.props.isAuthenticated);


    return (
      <Switch>
        <Route
          path="/"
          exact
          component={asyncComponent(() => import("./containers/login"))}
        />
        <Route
          path="/signup"
          component={asyncComponent(() => import("./containers/signUp.js"))}
          exact
        />

        <Route
          path="/dashboard"
          exact
          render={(props) => <Dashboard {...props} isAuthenticated />}
        />
        <Route
          path="/changepassword"
          exact
          render={(props) => <ChangePassword {...props}  />}
        />
        <Route
          path="/logout"
          exact
          component={asyncComponent(() => import("./containers/logout.js"))}
        />
        <Route
          path="/dashboard/newstory"
          exact
          component={asyncComponent(() => import("./containers/newStory.js"))}
        />
        <Redirect to="/" />
      </Switch>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   };
// };

export default withRouter(connect(mapStateToProps, null)(Routes));