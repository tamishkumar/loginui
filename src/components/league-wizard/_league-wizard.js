import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { powerLevelRakingList, particularSkillLevel } from '../../data-access/game-data/gamePowerRankingLevel';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '!style-loader!css-loader!react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import '!style-loader!css-loader!./_league-wizard.css';
import '!style-loader!css-loader!../../css/pages/game-data/game.css';
import DatePicker from "react-datepicker";
import "!style-loader!css-loader!react-datepicker/dist/react-datepicker.css";
import * as _ from "underscore";
import draftToHtml from 'draftjs-to-html';



class LeagueWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            league_description: '',
            date: "",
            season_duration_in_months: 0,
            league_name: "",
            league_start_date: new Date().setMonth(new Date().getMonth() + 1, 1),
            powerRankingLevelList: [],
            particularSkillLevel: {},
            number_of_events_per_month: 0,
            has_finals_in_last_month: false,
            utc_time_offset: new Date().getTimezoneOffset() / 60
        }
    }
    numOfEventsChange(e) {
        this.setState({
            number_of_events_per_month: e.target.value
        })
    }

    onChangeDateTime(date) {

        this.setState({ date: date._d })
    }
    seasonDurationChange(e) {
        this.setState({
            season_duration_in_months: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        {
            const method = "POST";
            const body = new FormData();
            body.append("league_name", this.state.league_name)
            body.append("league_description", this.state.league_description)
            body.append("league_start_date", this.state.league_start_date)
            body.append("season_duration_in_months", this.state.season_duration_in_months)
            body.append("has_finals_in_last_month", this.state.has_finals_in_last_month)
            body.append("number_of_events_per_month", this.state.number_of_events_per_month)

            let data = {
                league_name: this.state.league_name,
                league_description: this.state.league_description,
                league_start_date: this.state.league_start_date,
                season_duration_in_months: this.state.season_duration_in_months,
                has_finals_in_last_month: this.state.has_finals_in_last_month,
                number_of_events_per_month: this.state.number_of_events_per_month,
                utc_time_offset: this.state.utc_time_offset
            };
            localStorage.setItem('number_of_events_per_month', data.number_of_events_per_month);
            localStorage.setItem('dataOfLeagueWizard', JSON.stringify({
                league_name: this.state.league_name,
                league_description: this.state.league_description,
                league_start_date: this.state.league_start_date,
                season_duration_in_months: this.state.season_duration_in_months,
                has_finals_in_last_month: this.state.has_finals_in_last_month,
                number_of_events_per_month: this.state.number_of_events_per_month,
                utc_time_offset: this.state.utc_time_offset,
                game_skill_level_id: this.props.history.match.params.id
            }));


            var result = confirm(JSON.stringify(data), "bodyyyyyy");
            // if (result) this.props.history.history.push("1000/gamevents")
            if (result) this.props.history.history.push(`${this.props.history.match.params.id}/gamevents`)
            // fetch("https://httpbin.org/post", { method, body })
            //     .then(res => res.json())
            //     .then(data => alert(JSON.stringify(data, null, "\t")));
        }

    }
 
    componentDidMount() {
        let skillLevelId = this.props.history.match.params.id
        this._notificationSystem = this.refs.notificationSystem;
        powerLevelRakingList(skillLevelId, (response) => {

            this.setState({ powerRankingLevelList: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })
        particularSkillLevel(skillLevelId, (response) => {

            this.setState({ particularSkillLevel: response });

        },
            (message) => {
                this._notificationSystem.addNotification({ message: 'Error', level: 'error' });
            })
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            league_description: JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        });
    }
    onDateChange(date) {

        this.setState({
            league_start_date: date
        });
    }
    leagueTitleChange(e) {
        this.setState({ league_name: e.target.value })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        const { editorState } = this.state;
        return (
            <div className="col-md-8 offset-md-1">
                <NotificationSystem ref="notificationSystem" />
                <div className="row mar-t-50 leagueTitle">
                    League Wizard {this.state.particularSkillLevel.game_skill_level}
                </div>
                <div className="container blacktext">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4 marginBottom">
                                    <label>League Title </label>
                                    <input autoFocus className="form-control" placeholder="Title" type="text" name="leagueTitle" onChange={this.leagueTitleChange.bind(this)}></input>
                                </div>
                                <div className="col-sm-4">
                                    <label >League start date </label>

                                    <DatePicker
                                        className="form-control"
                                        selected={this.state.league_start_date}
                                        onChange={this.onDateChange.bind(this)}
                                        name="league_start_date"
                                        dateFormat="MM/dd/YYYY"
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <label>Season duration  </label>
                                    <input className="form-control" name="season_duration_in_months" value={this.state.season_duration_in_months} onChange={this.seasonDurationChange.bind(this)} type="number" min="1" max="12" />
                                </div>

                            <div className="col-sm-4 ">
                                <label> Number Of Events</label>

                                <input className="form-control" type="number" name="number_of_events_per_month" value={this.state.number_of_events_per_month} onChange={this.numOfEventsChange.bind(this)} min="1" max="2" />
                            </div>
                            <div className="col-sm-4">

                                <label className="centredLabel">
                                    <input
                                        name="has_finals_in_last_month"
                                        type="checkbox"
                                        checked={this.state.has_finals_in_last_month}
                                        onChange={this.handleInputChange.bind(this)}
                                    /> Is Last Month Global Final ?

                                    </label>
                            </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">

        

                        </div>

                        <div className="col-sm-8">
                            <label>League Description </label>
                        </div>


                        <div className="col-sm-12 ">
                            <Editor
                                editorState={editorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={this.onEditorStateChange.bind(this)}
                            />
                        </div>
                        <br />
                        <div style={{ textAlign: "right", marginBottom: "2%" }} className="conatiner ">
                            <button className="btn btn-fill btn-primary btn-sm" type="submit"> Next</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
export default LeagueWizard;