import React, { Component } from 'react';
//import _notSignedInHome from '../home/_notSignedInHome';
//import _welcome from '../home/_welcome';
import _nav from '../../components/_nav';
import _sidebar from '../../components/_sidebar';

import _announcement from '../../components/announcement/announcement';

 class Announcement extends Component {
	 
	componentDidMount ()
	{
		document.title = "Announcement | EACL";
	}
	
    render() {
		
		return(
		<div>						
			<_nav />
			<div className="row">
			<_sidebar  />
			<_announcement history={this.props} />
			</div>					
		</div>
		)
	}
}
export default Announcement;