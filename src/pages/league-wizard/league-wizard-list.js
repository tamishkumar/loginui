import React, { Component } from 'react';

import _nav from '../../components/_nav';
import _sidebar from '../../components/_sidebar';

import _leagueWizardList from '../../components/league-wizard/_league-wizard-list';

 class GameEvents extends Component {
	 
	componentDidMount ()
	{
		document.title = "League Manager List | EACL";
	}
	
    render() {
		
		return(
		<div>						
			<_nav />
			<div className="row">
			<_sidebar  />
			<_leagueWizardList history={this.props} />
			</div>					
		</div>
		)
	}
}
export default GameEvents;