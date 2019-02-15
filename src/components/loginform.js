import React, { Component } from "react";
import {  FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import LoginForm from '../containers/loginform'; 
import * as AuthAction from '../actions/authaction';
import "../containers/login.css";


class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          isAuthenticated: false,
          gettoken: '',
          type: 'password',
          score: 'null'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    
      }
      componentWillReceiveProps(nextProps) {
          console.log("WILLLLRECEIVEE IN LOGIN", nextProps);
          
      }
      showHide = (e) => {
        console.log("showw hideeeee");
    
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          type: this.state.type === 'input' ? 'password' : 'input'
        })
      }
    
      notify1 = () => toast.error("Email should be Valid !", {
        position: toast.POSITION.TOP_LEFT
      });
      notify2 = () => toast.error("Email must ends with Yahoo.com !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      notify3 = () => toast.error("Password must contain atleast 8 characters,special character,one uppercase & lowercase letter and one number", {
        position: toast.POSITION.TOP_LEFT
      });
    
      handleChange(e) {
        this.setState({ email: e.target.value });
      }
      handleChange2(e) {
        if (e.target.value === '') {
          this.setState({
            score: 'null'
          })
        }
        this.setState({ password: e.target.value });
      }
      handleSubmit = (e) => {
        e.preventDefault()
        let gettoken = this.props.isAuthenticated
    
    
        const user = {
          email: this.state.value,
          password: this.state.value2,
        };
    
        const { value2 } = this.state;
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isOk = re.test(value2);
    
        if (!isOk) {
          return alert('Password must contain eight characters,one uppercase & lowercase letter and one number');
        }
        else (this.props.login(user).then(response => {
          if (response && response.token) {
            this.setState({ gettoken: gettoken })
            localStorage.setItem('user_token', response.token);
            this.props.history.push("./dashboard");
          }
    
        }));
      }
      handleClick= () => {
        this.props.history.push("/changepassword")
      }
      handleSubmit1 = (e) => {
    
        e.preventDefault()
        // let gettoken = localStorage.getItem('user_token')
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        const { password } = this.state;
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isOk = re.test(password);
        const { email } = this.state;
        const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailok = emailreg.test(email);
        const yahoo = /@yahoo.com\s*$/;
        const yahooOk = yahoo.test(email);
    
        console.log(user, "user");
        if (!emailok) {
          return (this.notify1());
        }
        else if (!yahooOk) {
          return (this.notify2())
        }
        else if (!isOk) {
          return (this.notify3())
        }
    
        else (this.props.login(user).then(response => {
          if (response && response.token) {
            this.setState({ gettoken: response.token, isAuthenticated: true })
            localStorage.setItem('user_token', response.token);
            this.props.history.push("./dashboard");
          }
        })
        );
      }
      componentDidMount() {
        let tktoken = localStorage.getItem('user_token');
    if (tktoken) {
      this.props.history.push("./dashboard");
    }
      }
    render() {
      console.log("LOGIN_DATA_PROPS",this.props.loginUser);
      
        
        
        return (
            <form onSubmit={this.handleSubmit1} className="demoForm">
                <FormGroup
                    className="form-group1"
                    controlId="formBasicText3"
                >
                    <ControlLabel className="label">Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.value}
                        placeholder="Enter Email"
                        onChange={this.handleChange}
                    />
                    {/* <FormControl.Feedback /> */}
                </FormGroup>
                <br />
                <FormGroup
                    controlId="formBasicText4"

                >
                    <ControlLabel className="label">Password</ControlLabel>

                    <FormControl
                        className="form-control"
                        type={this.state.type}
                        value={this.state.value2}
                        placeholder="Enter password"
                        onChange={this.handleChange2}
                    />
                    <span className="passwordshow" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'} </span>
                </FormGroup >
                <div className="divinbutton" >
                    <button className="button" type="submit">Login</button>
                    <div className="anchortag">

                        <a style={{ color: "rgba(255, 255, 255, 0.63)" }} href="#" onClick={this.handleClick}>Forgot password? </a>

                    </div>
                </div>
                <ToastContainer />

            </form>
        )
    }
}
const mapToDispatchProps = (dispatch) => {
    return {
      login: (user) => dispatch(AuthAction.login(user)),
    }
  }
  const mapStateToProps = (state) => {
    return {
      logindata: state.res.logindata,
      loginUser: state.auth.loguser,
      isAuthenticated: state.auth.token !== null,
      // avalableUsers: state.auth.users  !==null
    };
  };
  export default connect(mapStateToProps, mapToDispatchProps)(LoginForm);