import React, { Component } from 'react';
// import _notSignedInHome from '../home/_notSignedInHome';
// import _welcome from '../home/_welcome';
import _nav from '../../components/_nav';
import _sidebar from '../../components/_sidebar';

import _leagueWizard from '../../components/league-wizard/_league-wizard';

 class LeagueWizard extends Component {
	 
	componentDidMount ()
	{
		document.title = "Create League Wizard | EACL";
	}
	
    render() {
		
		return(
		<div>						
			<_nav />
			<div className="row">
			<_sidebar  />
			<_leagueWizard history={this.props} />
			</div>					
		</div>
		)
	}
}
export default LeagueWizard;