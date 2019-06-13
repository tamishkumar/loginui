import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'react-bootstrap';

import '!style-loader!css-loader!../css/components/_sidebar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock, faGlobe, faLanguage, faUser, faKey, faGamepad, faBolt, faTrophy, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { loadRegions } from '../data-access/platformLookupDataAccess'
import { isAuthenticated } from '../data-managers/cookieManager'

library.add(faEnvelope, faLock, faGlobe, faLanguage, faUser, faGamepad, faBolt, faKey, faTrophy, faChevronDown);

class _sidebar extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			regionOpts: [],
			regionsLoaded: false,
			showError: false,
			responseMsg: null,

			isShowingGameMenu: false
		};
	}

	render() {
		if (isAuthenticated()) {

			let { isShowingGameMenu } = this.state;

			return (
				<div className="col-md-3">
					<div className="sidebar-wrapper">

						<ul className="nav">
							{/* <li className="first-option"><Link to="/system-admin" ><FontAwesomeIcon icon={faUser} /><span>System Admin</span></Link></li>
							<li className="multi-option">
								<a onClick={() => this.setState({ isShowingGameMenu: (this.state.isShowingGameMenu == true) ? false : true })}>
									<FontAwesomeIcon icon={faGamepad} /><span>Game Data <FontAwesomeIcon icon={faChevronDown} /></span>
								</a>
								<Collapse in={isShowingGameMenu} className="submenu">
									<ul className="nav user-nav" >
										<li><Link to="/game/platforms"><FontAwesomeIcon icon={faTrophy} />Game Platforms</Link></li>
										<li><Link to="/game/titles" ><FontAwesomeIcon icon={faTrophy} />Game Titles</Link></li>
										<li><Link to="/game/title-platforms" ><FontAwesomeIcon icon={faTrophy} />Game Title Platforms</Link></li>
										<li><Link to="/game/skill-levels" ><FontAwesomeIcon icon={faTrophy} />Game Skill Levels</Link></li>
										<li><Link to="/game/modes" ><FontAwesomeIcon icon={faTrophy} />Game Modes</Link></li>
										<li><Link to="/game/maps" ><FontAwesomeIcon icon={faTrophy} />Game Maps</Link></li>
										<li><Link to="/game/rules" ><FontAwesomeIcon icon={faTrophy} />Game Rules</Link></li>
									</ul>
								</Collapse>
							</li>
							<li><Link to="/power-ranking"><FontAwesomeIcon icon={faBolt} /><span>Power Ranking</span></Link></li>
							<li><Link to="/reset-password"><FontAwesomeIcon icon={faKey} /><span>Reset Password</span></Link></li>
							<li><Link to="/email"><FontAwesomeIcon icon={faEnvelope} /><span>Emails</span></Link></li> */}
							<li className="first-option"><Link to="/league-wizard"><FontAwesomeIcon icon={faEnvelope} /><span>League Wizard Search</span></Link></li>
							
							{/* <li className="first-option"><Link to="/league-wizard/1000"><FontAwesomeIcon icon={faEnvelope} /><span>League Wizard</span></Link></li> */}
						</ul>

					</div>
				</div>


			);
		}

		// if (this.state.regionsLoaded == false){
		// 	this.getRegions();
		// 	return null;
		// }

		return (
			<div className="side-bar" style="display:none;">
			</div>
		);
	}
}

export default _sidebar;