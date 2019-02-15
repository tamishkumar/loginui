import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import LoginForm from '../components/loginform';

import './login.css';
class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("diddddmount", this.props);

  }
  render() {

    return (
      <div className="background">
        <div className="container-fluid">
          <div className="loginform" >
            <div className="insideform">

              <div className="links">
                <NavLink activeStyle={{ margin: "5%", color: "white", textDecoration: 'none', borderBottom: 'solid 1px #fff' }} exact to="/">Login</NavLink>
                <NavLink activeStyle={{ margin: "5%", color: "white", textDecoration: 'none', borderBottom: 'solid 1px #fff' }} exact to="/signUp">Register</NavLink>
                {/* <NavLink activeStyle={{ margin: "5%", color: "white", textDecoration: 'none', borderBottom: 'solid 1px #fff' }} exact to="/dashboard">Dashboard</NavLink> */}
              </div>
              <br />

              <LoginForm history={this.props.history} />

            </div>
          </div>

        </div>
      </div>



    )
  }
}

export default Login;