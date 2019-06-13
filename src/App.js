import React, {Component} from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faGlobe, faLanguage,faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import login from './pages/login'
import logout from './pages/logout'
import leagueWizardList from './pages/league-wizard/league-wizard-list'
// import systemAdmin from './pages/system-admin/system-admin'
// import gamePlatforms from './pages/game-data/game-platforms'
// import gameTitles from './pages/game-data/game-titles'
// import gameTitlePlatforms from './pages/game-data/game-title-platforms'
// import gameSkillLevels from './pages/game-data/game-skill-levels'
// import gameModes from './pages/game-data/game-modes'
// import gameMaps from './pages/game-data/game-maps'
// import gameRules from './pages/game-data/game-rules'
// import email from './pages/email/email'
// import powerRanking from './pages/power-ranking/power-ranking'
// import resetPassword from './pages/reset-password'
import LeagueWizard from './pages/league-wizard/league-wizard'
import GameEvents from './pages/league-wizard/game-events'
import Announcement from './pages/announcement/announcement'


import {isAuthenticated}  from './data-managers/cookieManager'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
			{...rest}
			exact
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

library.add( faEnvelope, faLock, faGlobe, faLanguage,faUser, faExclamationCircle );

class App extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			language: 'en',
	    }
	}
	
	getUrl() { 
	  let url = location.search;
	  let query = url.substr(1);
	  let result = {};
	  query.split("&").forEach(function(part) {
		let item = part.split("=");
	  });
	  return result;
	}
	
	getRegCode() { 
		let params = this.getUrl();
		return params[0] == 'registration_code' ? params[0] : false;
	}

	render() {
		return(
			<BrowserRouter>
				<Route path="/" exact component={ login } />
				<Route path="/login" component={ login } />	
				<Route path="/logout" component={ logout } />
				{/* <PrivateRoute path="/system-admin" component={ systemAdmin }  onEnter={this.requireAuth} />
				<PrivateRoute path="/game/platforms" component={gamePlatforms}  onEnter={this.requireAuth} />
				<PrivateRoute path="/game/titles" component={gameTitles} />
				<PrivateRoute path="/game/title-platforms" component={gameTitlePlatforms} onEnter={this.requireAuth} />
				<PrivateRoute path="/game/skill-levels" component={gameSkillLevels}  onEnter={this.requireAuth} />
				<PrivateRoute path="/game/modes" component={gameModes}  onEnter={this.requireAuth} />
				<PrivateRoute path="/game/maps" component={gameMaps}  onEnter={this.requireAuth} />
				<PrivateRoute path="/game/rules" component={gameRules}  onEnter={this.requireAuth} />
				<PrivateRoute path="/email" component={email}  onEnter={this.requireAuth} />
				<PrivateRoute path="/power-ranking" component={powerRanking}  onEnter={this.requireAuth} />
				<PrivateRoute path="/reset-password" component={resetPassword}  onEnter={this.requireAuth} /> */}
				<PrivateRoute path="/league-wizard" component={leagueWizardList}  onEnter={this.requireAuth} />
				<PrivateRoute path="/league-wizard/:id" component={LeagueWizard}  onEnter={this.requireAuth} />
				<PrivateRoute path="/league-wizard/:id/gamevents"  component={GameEvents}  onEnter={this.requireAuth} />	
				<PrivateRoute path="/announcement/:id"  component={Announcement}  onEnter={this.requireAuth} />	
			</BrowserRouter>
		);
	}
}

export default App;
