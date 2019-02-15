import React,{Component} from "react";
import {  toast } from 'react-toastify';
import * as AuthAction from '../actions/authaction';
import "../App.css";
import {connect } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';
class SignupForm extends Component {
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
    notify1 = () => toast.error("Email should be Valid !", {
        position: toast.POSITION.TOP_LEFT
      });
      notify2 = () => toast.error("Email must ends with Yahoo.com !", {
        position: toast.POSITION.TOP_LEFT
      });
      notify3 = () => toast.error("Password must contain atleast 8 characters,special character,one uppercase & lowercase letter and one number", {
        position: toast.POSITION.TOP_LEFT
      });
      notify4 = () => toast.error("phonelength must be of 10 digits", {
        position: toast.POSITION.TOP_LEFT
      });
      notify5 = () => toast.error("password and confirm password must be same", {
        position: toast.POSITION.TOP_LEFT
      });
    
    
    
    
      handleInputChange = event => {
        event.preventDefault();
    
        this.setState({
          [event.target.name]: event.target.value,
        });
        console.log(event.target.name, "event_target_name", event.target.value);
    
      }
    
      handleChange = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
      }
    
    
      handleChange2 = (event) => {
        event.preventDefault();
        this.setState({ password_confirmation: event.target.value });
      }
    
      handleFormSubmit = event => {
        event.preventDefault();
        const user = {
          email: this.state.email,
          password: this.state.password,
          repassword: this.state.password_confirmation,
          phone: this.state.phone,
    
        };
        const { email } = this.state;
        const { password } = this.state;
        const { phone } = this.state;
        const { password_confirmation } = this.state;
    
    
    
    
        const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isOk = regexpassword.test(password);
        const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailok = emailreg.test(email);
        const yahoo = /@yahoo.com\s*$/;
        const yahooOk = yahoo.test(email);
        const phonelength = phone.length
    
        if (!emailok) {
          return (this.notify1());
        }
        else if (!yahooOk) {
          return (this.notify2())
        }
        else if (phonelength !== 10) {
          return (this.notify4())
        }
        else if (!isOk) {
          return (this.notify3())
        }
        else if (password !== password_confirmation) {
          return (this.notify5())
    
        }
    
    
        else (this.props.signup(user).then(response => {
          if (response && response.status) {
            this.props.history.push("./")
          }
    
        }));
    
    
    
      }
    render() {
        return (
            <form className="demoForm">
                <h2>Sign up</h2>

                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"
                        name="email"
                        placeholder="abc@gmail.com"
                        onChange={this.handleInputChange}
                    />
                    {/* <span className="help-block">{validation.email.message}</span> */}
                </div>

                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" className="form-control"
                        name="phone"
                        placeholder="9876543210"
                        onChange={this.handleInputChange}
                    />
                    {/* <span className="help-block">{validation.phone.message}</span> */}
                </div>

                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="***********"
                    />
                    {/* <span className="help-block">{validation.password.message}</span> */}
                </div>

                <div >
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" className="form-control"
                        name="password_confirmation"
                        onChange={this.handleChange2}
                        placeholder="***********"


                    />
                    {/* <span className="help-block">{validation.password_confirmation.message}</span> */}
                </div>

                <button onClick={this.handleFormSubmit} className="btn btn-primary">
                    Sign up
    </button>
            </form>
        )
    }
}
const mapToDispatchProps = (dispatch) => {
    return {
      signup: (user) => dispatch(AuthAction.signup(user)),
    }
  }
  
  export default connect(null, mapToDispatchProps)(SignupForm);
  
