import React from 'react'
import { isAuthenticated } from '../../data-managers/cookieManager'
import { gamePowerRankingProfileListApi } from '../../data-access/game-data/gamePowerRakingProfile'
import { particularGameRulesList } from '../../data-access/game-data/gameRule'
import { particularModeList } from '../../data-access/game-data/gameMode'
import { prizeTypes, attributesPairingTypes, tournamentLevel, createLeague } from '../../data-access/tournament-data/tournamentData'
import NotificationSystem from 'react-notification-system';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Modal } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import '!style-loader!css-loader!react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "!style-loader!css-loader!react-datepicker/dist/react-datepicker.css";
import '!style-loader!css-loader!react-day-picker/lib/style.css';
import '!style-loader!css-loader!../../css/pages/game-data/game.css';

import * as _ from "underscore";

// library.add(faTimes, faEnvelope, faLock, faGlobe, faLanguage, faUser, faGamepad, faBolt, faTrophy, faChevronDown);

class _gameSkillLevels extends React.Component {
    constructor(props) {
        super(props);
        this.prizeObject = { prize_type: "", prize: 0 };
        this.placeObject = { place_number: 1, prizes: [this.prizeObject] };
        this.event_prize_data = { tournament_level: 0, places: [this.placeObject] };

        this.state = {
            event_name: "",
            skillId: 0,
            show: false,
            number_of_preliminary_rounds: 0,
            attributesPairingTypesList: [],
            tournament_pairing_type_id: "",
            showEventButton: false,
            game_rules_id: "",
            game_mode_id: "",
            power_ranking_profile_id: "",
            allList: [],
            gamePowerRankingProfileList: [],
            ParticularGameRuleList: [],
            modeName: "",
            gameRuleName: "",
            gameRankingProfile: "",
            attributesPairingType: "",
            league_event_number: localStorage.getItem('number_of_events_per_month'),
            particularGameModeList: [],
            load: true,
            event_description: "",
            editorState: EditorState.createEmpty(),
            event_start_day: 1,
            possibleStartDays: [],
            tournamentLevelList: [],
            tournament_level: "",
            tournamentLevelValue: "",
            prizeTypesList: [],
            prizeTypesId: "",
            prizeTypesValue: "",
            place_number: 1,
            prize: 0,
            show: false,
            event_prize_data: [],
            event_prize: [],
            counter: 1,
            prizesPlusList:[],
            event_data_multiple: []
        }
    }
    componentDidMount() {
        // this.state.event[index1].push(JSON.parse(JSON.stringify(this.event_prize_data)));
        this.setState({
            event_prize_data: [JSON.parse(JSON.stringify(this.event_prize_data))]
        })
        this.getMonthValue()
        tournamentLevel((response) => {

            this.setState({ tournamentLevelList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })

        attributesPairingTypes((response) => {

            this.setState({ attributesPairingTypesList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })

        gamePowerRankingProfileListApi(1000, (response) => {

            this.setState({ gamePowerRankingProfileList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })

        particularModeList(1000, (response) => {

            this.setState({ particularGameModeList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })
        this._notificationSystem = this.refs.notificationSystem;
    }
    inputNameChange(e) {
        this.setState({ event_name: e.target.value })
    }
    // placeNumberChange(e) {
    //     this.setState({ place_number: e.target.value })

    // }
    handleTextareaChange(e) {
        this.setState({ event_description: e.target.value })
    }
    numberOfPreliminaryRoundsChange(e) {
        this.setState({ number_of_preliminary_rounds: e.target.value })

    }
    eventStartDay(e) {
        this.setState({
            event_start_day: e.target.value
        })
    }
    PrizeTypes() {
        prizeTypes((response) => {
            this.setState({ prizeTypesList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })

    }
    prizeChange(index1, index2, index3) {
        this.state.event_prize_data[index1]['places'][index2]['prizes'][index3].prize = parseInt(event.target.value, 10)


        this.setState({

            prize: event.target.value,
            event_prize_data: this.state.event_prize_data

        })
    }
    AddPrizes(e) {
        e.preventDefault();
        const { arrcredit } = this.state
        let obj = { prize_type_value: this.state.prizeTypesValue, prize: this.state.prize }
        arrcredit.push(obj)
        this.setState({
            credit: arrcredit,
            prizeTypesValue: "",
            prizeTypesId: "",
            prize: 0,
        })
    }

    

    attributesPairingTypesFun(name, event) {
        let newState = {
            tournament_pairing_type_id: event.target.value
        }
        this.state.attributesPairingTypesList.filter(function (item) {
            if (item.id == event.target.value) {
                newState['attributesPairingType'] = item.name;
            }
        })

        this.setState(newState)
    }
    selectPrizeType(index1, index2, index3) {

        this.state.event_prize_data[index1]['places'][index2]['prizes'][index3].prize_type = parseInt(event.target.value, 10)

        this.setState({
            event_prize_data: this.state.event_prize_data
        })
    }
    SelectTournamentLevel(event) {

        let newState = {
            tournament_level: event.target.value
        }
        this.state.tournamentLevelList.filter(function (item) {
            if (item.id == event.target.value) {
                newState['tournamentLevelValue'] = item.name;
            }
        })
        this.setState(newState)
        this.state.event_prize_data[0].tournament_level = parseInt(event.target.value, 10)
        this.setState({
            event_prize_data: this.state.event_prize_data
        })

    }

    selectModeFun(name, event) {


        let modeValue, modeObj;
        if (event.target.value !== '') {
            modeValue = event.target.value;


            let matchedValues = this.state.particularGameModeList.filter((item) => {

                if (item.game_mode_id == modeValue) {
                    return item;
                }
            });

            if (matchedValues.length) modeObj = matchedValues[0];
            this.GameRulesList(modeValue, name);
        }
        this.setState({ game_mode_id: modeValue, modeName: modeObj.game_mode, gameRuleName: "" });
    }
    GameRulesList(id, name) {

        particularGameRulesList(id,
            (response) => {

                this.setState({
                    [name]: response,
                    load: false
                });
            },
            (message) => {
                this._notificationSystem.addNotification({ message: 'particularGameRulesList  not found', level: 'error' });
            }
        )
    }
    SelectGameRulesFun(name, event) {
        let ruleValue = event.target.value;
        let newState = {
            game_rules_id: ruleValue
        }
        let matchedValues = this.state.ParticularGameRuleList.filter(function (singleRule) {
            if (singleRule.game_rules_id == ruleValue) {
                return singleRule;
            }
        });

        if (matchedValues.length) newState['gameRuleName'] = matchedValues[0].game_rules_title;


        this.setState(newState)
    }
    SelectPowerRankingProfileFun(name, event) {
        let newState = {
            power_ranking_profile_id: event.target.value
        }

        let matchedValues = this.state.gamePowerRankingProfileList.filter(function (item) {
            if (item.power_ranking_profile_id == event.target.value) {
                newState['gameRankingProfile'] = item.power_ranking_profile;
            }
        })

        this.setState(newState)
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            event_description: JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        });
    }
    handleClose() {
        this.setState({ show: false, prizeTypesId: "", prizeTypesValue: "", credit: [], arrcredit: [], prizeTypesId2: "", prizeTypesValue2: "", event_prize_data: [JSON.parse(JSON.stringify(this.event_prize_data))] });
        this.refs.createForm.reset();
    }
    Addnew(e) {
        e.preventDefault();
        this.PrizeTypes()
        this.setState({ show: true, newDev: true });
    }

    handleModalSubmit(e) {
        e.preventDefault();
        this.state.event_prize.push(JSON.parse(JSON.stringify(this.state.event_prize_data[0])))
        this.setState({ event_prize: this.state.event_prize, show: false })

    }
    onSubmit(e) {
        e.preventDefault();
        let eventAllData = {
            league_event_number: parseInt(this.state.league_event_number, 10),
            event_start_day: parseInt(this.state.event_start_day),
            event_name: this.state.event_name,
            event_description: JSON.parse(this.state.event_description),
            game_mode_id: parseInt(this.state.game_mode_id, 10),
            game_rules_id: parseInt(this.state.game_rules_id, 10),
            power_ranking_profile_id: parseInt(this.state.power_ranking_profile_id, 10),
            tournament_pairing_type_id: this.state.tournament_pairing_type_id,
            number_of_preliminary_rounds: this.state.number_of_preliminary_rounds,
            prizes: this.state.event_prize,
        }
        this.state.event_data_multiple.push(eventAllData);

        this.state.allList.push({
            event_name: this.state.event_name,
            event_description: this.state.event_description,
            number_of_preliminary_rounds: this.state.number_of_preliminary_rounds,
            modeName: this.state.modeName,
            gameRuleName: this.state.gameRuleName,
            gameRankingProfile: this.state.gameRankingProfile,
            attributesPairingType: this.state.attributesPairingType,
            event_start_day: parseInt(this.state.event_start_day),
            event_prize: this.state.event_prize,
            game_mode_id: this.state.game_mode_id

        })
        this.setState({
            event_name: "",
            event_description: "",
            number_of_preliminary_rounds: 0,
            modeName: '',
            game_mode_id: "",
            gameRuleName: "",
            gameRankingProfile: "",
            attributesPairingType: "",
            tournament_pairing_type_id: "",
            game_rules_id: "",
            power_ranking_profile_id: "",
            editorState: EditorState.createEmpty(),
            event_start_day: 1,
            event_prize: [],
            event_prize_data: [JSON.parse(JSON.stringify(this.event_prize_data))],
            tournament_level: "",
            tournamentLevelValue: "",


        });
        this.getMonthValue();

    }
    completeSubmit(event) {

        event.preventDefault();
        let leagueData = JSON.parse(localStorage.getItem("dataOfLeagueWizard"));

        let data = {
            league_name: leagueData.league_name,
            league_description: JSON.parse(leagueData.league_description),
            game_skill_level_id: leagueData.game_skill_level_id,
            league_start_date: leagueData.league_start_date,
            season_duration_in_months: parseInt(leagueData.season_duration_in_months, 10),
            number_of_events_per_month: parseInt(leagueData.number_of_events_per_month),
            utc_time_offset: leagueData.utc_time_offset,
            has_finals_in_last_month: leagueData.has_finals_in_last_month,
            event_data: this.state.event_data_multiple

        }
        // alert(JSON.stringify(data), "datatat")
        createLeague(data, (response) => {

            if (response.id) {
                this.props.history.history.push(`../../league-wizard/1000`)
                localStorage.removeItem("number_of_events_per_month")
                localStorage.removeItem("dataOfLeagueWizard")

            }

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })
        this._notificationSystem = this.refs.notificationSystem;


        this.setState({
            event_name: "",
            event_description: "",
            number_of_preliminary_rounds: 0,
            modeName: '',
            game_mode_id: "",
            gameRuleName: "",
            gameRankingProfile: "",
            attributesPairingType: "",
            tournament_pairing_type_id: "",
            game_rules_id: "",
            power_ranking_profile_id: "",
            editorState: EditorState.createEmpty(),
            event_start_day: 1,
            event_prize_data: [],
            event_prize: []

        });
    }
    getMonthValue() {
        let arr = []

        if (localStorage.getItem("number_of_events_per_month") == 1) {
            for (var i = 1; i <= 16; i++) {
                arr.push(i);
            }

            this.setState({
                possibleStartDays: arr
            })
        }
        else if (localStorage.getItem("number_of_events_per_month") == 2) {
            if (this.state.allList && this.state.allList.length == 0) {
                for (var i = 1; i <= 5; i++) {
                    arr.push(i);
                }
            } else if (this.state.allList && this.state.allList.length == 1) {
                for (var i = this.state.allList[0]['event_start_day'] + 1; i <= 20; i++) {
                    arr.push(i);
                }
            }

            this.setState({
                possibleStartDays: arr,
            });
        }
    }
    selectDayOfMonth(e) {
        this.setState({
            event_start_day: e.target.value
        })
    }
    addPriceTypeAndValue(index1, index2, index3, event) {
        event.preventDefault();
        this.state.event_prize_data[index1]['places'][index2]['prizes'].push(JSON.parse(JSON.stringify(this.prizeObject)));

        this.setState({
            event_prize_data: this.state.event_prize_data
        })
    }
    deletePriceTypeAndValue(index1, index2, index3, event) {
        event.preventDefault();
        this.state.event_prize_data[index1]['places'][index2]['prizes'].splice(index3, 1);
        // alert("delete" + index3)
        this.setState({event_prize_data:this.state.event_prize_data})

    }

    addPlaceNumberAndPrize(index1, index2, e) {
        e.preventDefault();
        this.state.event_prize_data[index1]['places'].push(JSON.parse(JSON.stringify(this.placeObject)))
        this.state.event_prize_data[index1]['places'][this.state.event_prize_data[index1]['places'].length - 1].place_number = this.state.counter + 1
        this.setState({ event_prize_data: this.state.event_prize_data, counter: this.state.counter + 1 });
    }
    deletePlaceNumberAndPrize(index1, index2, event) {
        event.preventDefault();
        this.state.event_prize_data[index1]['places'].splice(index2, 1);
        this.state.event_prize_data[index1]['places'][this.state.event_prize_data[index1]['places'].length - 1].place_number = this.state.counter - 1

            this.setState({event_prize_data:this.state.event_prize_data,counter: this.state.counter -1})
    }
    removeAdded(index) {
        if (index !== -1) {
            this.state.credit.splice(index, 1);
            this.setState({ countries: this.state.countries });
        }
    }

    render() {




        let eventPrize = this.state.event_prize_data.map((single_event_prize, index1) => {
            return (
                <div key={index1} className="border">

                    {single_event_prize.places.map((singleCredit, index2) => {

                        return (
                            <div key={index2} className="border border-primary" >
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <label htmlFor="place_number">Place Number</label>
                                            <input required className="form-control" type="number"
                                                name="place_number" value={singleCredit.place_number} disabled />
                                        </div>

                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="prize_type"> </label>
                                        <button className="btn btn-fill btn-info" onClick={index2 == 0 ? this.addPlaceNumberAndPrize.bind(this, index1, index2) : this.deletePlaceNumberAndPrize.bind(this, index1, index2)}> {index2 == 0 ? "ADD" : "DEL"}</button>
                                    </div>

                                </div>

                                {singleCredit.prizes.map((single_prize, index3) => {
                                    return (
                                        <div key={index3} className="row">
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <label htmlFor="prize_type">Prize Type</label>
                                                    <select required value={single_prize.prize_type} className="form-control" name="prize_type"
                                                        onChange={this.selectPrizeType.bind(this, index1, index2, index3)}>
                                                        <option value="">Select Prize Type</option>
                                                        {this.state.prizeTypesList.map(item => {
                                                            return <option name={item.name} key={item.id} value={item.id}>{item.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="form-group">
                                                    <label htmlFor="prize_type">Prize Value</label>
                                                    <input required type={single_prize.prize_type == "Other" ? "text" : "number"} className="form-control" name="prize" value={single_prize.prize} onChange={this.prizeChange.bind(this, index1, index2, index3)}  />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <label htmlFor="prize_type"> </label>
                                                <button className="btn btn-fill btn-primary" onClick={index3 == 0 ? this.addPriceTypeAndValue.bind(this, index1, index2, index3) : this.deletePriceTypeAndValue.bind(this, index1, index2, index3)}> {index3 == 0 ? "ADD" : "DEL"}</button>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        )
                    })}
                </div>
            )
        })
        let tableElement2 = !this.state.event_prize.length ? null :
            <div className="container">
                <div  >
                    <h2>Tournament Prizes </h2>
                </div>
                <table className='table table-bordered' >
                    <tbody>
                        <tr>
                            <th>Tournament Level </th>
                            <th>Places</th>
                            <th>Action</th>
                        </tr>

                        {this.state.event_prize.map((list, index) => {

                            return (
                                <tr key={index}>

                                    <td>{list.tournament_level}</td>
                                    <td>{list.places.length} </td>
                                    <td style={{ cursor: "pointer" }}><button onClick={(event) => {
                                        event.preventDefault()
                                    }} className="btn btn-sm btn-warning"><FontAwesomeIcon icon={faEdit} /></button></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table></div>
            ;
        let id = 1000
        const { show } = this.state
        const { editorState } = this.state;
        if (isAuthenticated()) {
            const options = { sizePerPage: 10, prePage: 'Previous', nextPage: 'Next', firstPage: 'First', lastPage: 'Last', hideSizePerPage: true, noDataText: 'No data available' };

            let formElement = this.state.league_event_number <= this.state.allList.length ? null :
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div  >
                        <h2>Add Game Events </h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 ">
                            <label>Day of the Month to Start:
                            <select autoFocus required={true} className="form-control"
                                    onChange={this.selectDayOfMonth.bind(this)}
                                    value={this.state.event_start_day}
                                >
                                    <option disabled value="">Select Day </option>
                                    {this.state.possibleStartDays.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <label>Event Name: <input required className="form-control" type="text" name="event_name" value={this.state.event_name} onChange={this.inputNameChange.bind(this)} /> </label><br />
                        </div>
                        <div className="col-sm-3">
                            <label> Power Ranking Profile

                            <select required className="form-control" value={this.state.power_ranking_profile_id}
                                    onChange={this.SelectPowerRankingProfileFun.bind(this, "nextList")}
                                >
                                    <option value="" >Select Power Ranking Profile</option>
                                    {this.state.gamePowerRankingProfileList.map(item => {
                                        return <option key={item.power_ranking_profile_id} value={item.power_ranking_profile_id}>{item.power_ranking_profile}</option>
                                    })}
                                </select>
                            </label>
                            <p></p>
                        </div>
                        <div className="col-sm-3">
                            <label>Pairing Types
                            <select
                                    required
                                    className="form-control"
                                    value={this.state.tournament_pairing_type_id}

                                    onChange={this.attributesPairingTypesFun.bind(this, "nextList")}
                                >
                                    <option value="" >Select Pairing type</option>
                                    {this.state.attributesPairingTypesList.map(item => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>

                        <div className="col-sm-4">
                            <label>Number of Preliminary Rounds  </label>
                            <input required={true} className="form-control" min="0" name="number_of_preliminary_rounds" value={this.state.number_of_preliminary_rounds} onChange={this.numberOfPreliminaryRoundsChange.bind(this)} type="number" />
                        </div>


                        <div className="col-sm-4">
                            <label> Modes </label>

                            <select className="form-control"
                                required
                                value={this.state.game_mode_id}
                                onChange={this.selectModeFun.bind(this, "ParticularGameRuleList")}
                            >
                                <option disabled value="">Select Mode</option>
                                {this.state.particularGameModeList.map(item => {

                                    return <option key={item.game_mode_id} value={item.game_mode_id}  >{item.game_mode}</option>
                                })}
                            </select>
                            <p></p>
                        </div>
                        <div className="col-sm-4">
                            <label> Rules </label>

                            <select required className="form-control"
                                onChange={this.SelectGameRulesFun.bind(this, "nextList")}
                                value={this.state.game_rules_id}
                                disabled={this.state.load}
                            >
                                <option disabled value="">Select Game Rules</option>
                                {this.state.ParticularGameRuleList.map(item => {
                                    return <option key={item.game_rules_id} value={item.game_rules_id}>{item.game_rules_title}</option>
                                })}
                            </select>
                            <p></p>
                        </div>

                        <div className="col-sm-12">
                            <label> Event Description: </label>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={this.onEditorStateChange.bind(this)}
                            />

                        </div>
                        <div className="col-sm-12 tournament" >
                            <label> Tournament Level </label>
                            <div className="row">
                                <div className="col-sm-10">
                                    <select required className="form-control"
                                        onChange={this.SelectTournamentLevel.bind(this)}
                                        value={this.state.tournament_level}
                                    >
                                        <option disabled value="">Select Tournament Level</option>
                                        {this.state.tournamentLevelList.map(item => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-sm-2">
                                    <button disabled={!this.state.tournament_level || this.state.tournament_level == 10 ? true : false} style={{ cursor: "pointer" }} onClick={this.Addnew.bind(this)} className="btn btn-dark"> Add</button>
                                </div>
                            </div>

                            <p></p>
                        </div>
                        {tableElement2}
                        <div style={{ textAlign: "right" }} className="container">
                            <button type="submit" className="btn btn-primary" >Add</button>
                        </div>

                    </div>
                </form>;

            let tableElement = !this.state.allList.length ? null :
                <div>
                    <div className="event-list-container">
                        <div  >
                            <h2>Game Events </h2>
                        </div>
                        <table className='table table-bordered' >
                            <tbody>
                                <tr>
                                    <th>Event name</th>
                                    <th>Mode</th>
                                    <th> Number of Rounds</th>
                                    <th>Day of month</th>
                                    <th>Rule Name</th>
                                    <th>Ranking Profile</th>

                                </tr>

                                {this.state.allList.map((list, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {list.event_name}
                                                <p className='text-muted'>
                                                    {list.attributesPairingType}
                                                </p>
                                            </td>
                                            <td> {list.modeName} </td>
                                            <td>{list.number_of_preliminary_rounds}</td>
                                            <td> {list.event_start_day} </td>
                                            <td>{list.gameRuleName}</td>
                                            <td> {list.gameRankingProfile}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {this.state.league_event_number <= this.state.allList.length ? <button onClick={this.completeSubmit.bind(this)} className="btn btn-primary" >Submit</button> : null}

                </div>
                ;

            return (
                <div className="col-md-8">
                    <NotificationSystem ref="notificationSystem" />
                    <div className="blacktext">
                        {tableElement}
                        {formElement}
                        <div className="col-md-12 submittediv ">
                            <br />
                            <button onClick={() => {
                                this.props.history.history.push(`../../league-wizard/${id}`)
                            }} className="btn btn-info leftMarginSubit" >Back</button>
                            {/* <input type="submit" className="btn btn-primary" value="Submit" /> */}

                            <br />
                        </div>

                    </div>
                    {/* New/Edit Game Title */}
                    <Modal size="sm" show={show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Prizes</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <form onSubmit={this.handleModalSubmit.bind(this)} id="createForm" ref="createForm">
                                {eventPrize}
                                <button className="btn btn-fill btn-primary">Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
        else {
            return (
                <div className="side-bar" style="display:none;">
                </div>
            );
        }
    }
}

export default _gameSkillLevels;
