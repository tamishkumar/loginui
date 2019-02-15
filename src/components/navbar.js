import React, { Component } from "react";

class NavBar extends Component {
    constructor(props) {
        super(props);

    }
    logout=() => {
        this.props.logout()
    }
    render() {
        console.log("this_props",this.props);
        
        return(
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <a className="navbar-brand" href="#">AdminPanel</a>
                    <button onClick={this.logout} className="logoutbutton" >Logout</button>
                </nav>
            </div>
        )
    }
}
export default NavBar;