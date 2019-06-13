import React, { Component } from 'react';
//import _notSignedInHome from '../home/_notSignedInHome';
//import _welcome from '../home/_welcome';
import _nav from '../../components/_nav';
import _sidebar from '../../components/_sidebar';

import _gameEvents from '../../components/league-wizard/_game-events';

 class GameEvents extends Component {
	 
	componentDidMount ()
	{
		document.title = "League Season Events | EACL";
	}
	
    render() {
		
		return(
		<div>						
			<_nav />
			<div className="row">
			<_sidebar  />
			<_gameEvents history={this.props} />
			</div>					
		</div>
		)
	}
}
export default GameEvents;