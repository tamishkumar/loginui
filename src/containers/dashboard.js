import React, { Component } from 'react';
import { Link } from 'react-router';
import './Dashboard.css';
import * as AuthAction from '../actions/authaction';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Navbar from "../components/navbar"
import { connect } from 'react-redux';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            academicProgress: '',
            data: [],

        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nexttpropsssss");

    }

    logoutMethod = () => {
        this.props.logout();
        this.props.history.push("./")
    }
    storyclick=(event) => {
        event.preventDefault();
        this.props.history.push("./dashboard/newstory")
    }


    render() {

        console.log("props_in_the_dashboard", this.props);

        var products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }];

        let tktoken = localStorage.getItem('user_token');
        if (!tktoken) {
            this.props.history.push("/");
        }

        return (
            <div className="container-fluid" >
                <Navbar logout={this.logoutMethod} />
                <div className="row">
                    <div className="col-sm-2" >
                        <div className="form-group">
                            <label for="usr">Search</label>
                            <input type="text" className="form-control" id="usr1" placeholder="Search By Name" />
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <div className="form-group">
                            <label for="usr">Ratings</label>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option selected>--Select Rating</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <div className="form-group">
                            <label for="usr">--All Generes--</label>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <div className="form-group">
                            <label for="usr">Length</label>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option selected>--Select Length--</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <button>Search</button>
                    </div>
                </div>
               <div className="new_Story"> 
               <button onClick={this.storyclick}>New Story</button>
               
               </div>

                <div className="flag">
                    <div className="container">


                        <h1 className="page-header">Welcome {this.props.loginuser ? this.props.loginuser.email : "Loading"}</h1>
                        <br />
                        <br />
                        

                        <div className="row ">
                            

                        </div>


                    </div>
                </div>
            </div>

        );
    }
}
const mapToDispatchProps = (dispatch) => {
    return {
        logout: () => dispatch(AuthAction.logout()),
    }
}
const mapStateToProps = (state) => {
    return {
        loginuser: state.auth.loguser,
        loginUser1: state.auth.loginUser
        // avalableUsers: state.auth.users  !==null
    };
};
export default connect(mapStateToProps, mapToDispatchProps)(Dashboard);








