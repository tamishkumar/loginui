import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import "../App.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import {  NavLink } from "react-router-dom";
import SignupForm from "../components/signupForm";

import 'react-toastify/dist/ReactToastify.css';
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // value: '',
      // value2: '',
      // value3: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',

    };

    this.submitted = false;


  }
  
  render() {
    return (
      <div className ="background">
      <div className="container-fluid">
        <div className="loginform" >
          <div className="insideform">
            <div className="links">
              <NavLink activeStyle={{ margin: "5%", color: "white", textDecoration: 'none', borderBottom: 'solid 1px #fff' }} exact to="/">Login</NavLink>
              <NavLink activeStyle={{ margin: "5%", color: "white", textDecoration: 'none', borderBottom: 'solid 1px #fff' }} exact to="/signup">Register</NavLink>
            </div>
            <br />
            <div>
             <SignupForm history={this.props.history} />
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//        user:state.user.data
//   };
// };
// const mapToDispatchProps = (dispatch) => {
//   return {
//     signup: (user) => dispatch(AuthAction.signup(user)),
//   }
// }

// export default connect(null, mapToDispatchProps)(Signup);
export default Signup