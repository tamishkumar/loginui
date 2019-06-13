import React from "react";
// import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "!style-loader!css-loader!react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { isAuthenticated } from "../../data-managers/cookieManager";
import { leagueSearchApi } from "../../data-access/tournament-data/tournamentData";
import { gameTitleList } from "../../data-access/game-data/gameTitleAccess";
import { gameTitlePlatformByTitleId } from "../../data-access/game-data/gameTitlePlatformAccess";
import { Regions } from "../../data-access/commonAPIAccess";
import NotificationSystem from "react-notification-system";
import "!style-loader!css-loader!../../css/pages/game-data/leagueList.css";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class _leagueWizardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GameTitleListData: [],
      regionsList: [],
      regionIdval: "",
      titleId: "",
      GameTitlePlatformList: [],
      platformId: "",
      LeagueSearchList: [],
      doWeNeed: false
    };
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    Regions(
      response => {
        this.setState({ regionsList: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "Error",
          level: "error"
        });
      }
    );
    // localStorage.removeItem("league_id")
  }

  SelectRegion(e) {
    if (e.target.value !== "") this.GameTitleList(e.target.value);
    this.setState({
      regionIdval: e.target.value,
      GameTitlePlatformList: [],
      platformId: "",
      titleId: "",
      LeagueSearchList: []
    });
  }

  GameTitleList(id) {
    gameTitleList(
      id,
      response => {
        this.setState({ GameTitleListData: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "error",
          level: "error"
        });
      }
    );
  }
  titleOnChange(e) {
    if (e.target.value != "") {
      this.GameTitlePlatform(e.target.value);

      this.setState({
        titleId: e.target.value,
        platformId: "",
        LeagueSearchList: []
      });
    }
  }
  GameTitlePlatform(id) {
    gameTitlePlatformByTitleId(
      id,
      response => {
        this.setState({ GameTitlePlatformList: response });
      },
      message => {
        this.setState({ showError: true, responseMsg: message });
      }
    );
  }
  platformOnChange(e) {
    if (e.target.value != "") {
      this.setState({
        platformId: e.target.value,
        LeagueSearchList: []
      });
      this.LeagueSearch1(e.target.value, this.state.doWeNeed);
    }
  }
  LeagueSearch1(platformId, doWeNeed) {
    leagueSearchApi(
      doWeNeed,
      this.state.regionIdval,
      this.state.titleId,
      platformId,
      response => {
        this.setState({ LeagueSearchList: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "error",
          level: "error"
        });
      }
    );
  }
  LeagueSearch2(doWeNeed, platformId) {
    leagueSearchApi(
      doWeNeed,
      this.state.regionIdval,
      this.state.titleId,
      platformId,
      response => {
        this.setState({ LeagueSearchList: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "Select Region,Title & Platform First",
          level: "error"
        });
      }
    );
  }
  RenderImage(cell, row) {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(row.game_skill_level_image_url))
      return (
        <img
          className="img_thumb"
          src={row.game_skill_level_image_url}
          alt="img"
        />
      );
    else
      return (
        <img
          className="img_thumb"
          src="https://pixselo.com/wp-content/uploads/2018/03/dummy-placeholder-image-400x400.jpg"
          alt="pimg"
        />
      );
  }
  stateOnChange(e) {
    if (e.target.value != "") {
      this.setState({
        stateVal: e.target.value
      });
    }
  }
  isExpandableRow(row) {
    if (row) return true;
    else return false;
  }
  expandComponent(row) {
    return <BSTable data={[row]} props={this.props.history} />;
  }
  createPage(cell, row) {

    if (row.league_id == 0) {
      return (
        <div>
          <button
            onClick={e => {
              e.preventDefault();
              this.props.history.history.push(
                `/league-wizard/${row.game_skill_level_id}`
              );
            }}
            className="btn btn-info"
          >
            Create
          </button>
        </div>
      );
    } else if (row.league_id !== 0) {
      return (
        <div>
          <button
            onClick={e => {
              alert("In Process");
              e.preventDefault();
              // this.props.history.history.push(`/league-wizard/${row.game_skill_level_id}`)
            }}
            className="btn btn-info"
          >
            Profile
          </button>
        </div>
      );
    }
  }

  handledoWeNeedChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.LeagueSearch2(value, this.state.platformId);
  }

  indexN(cell, row, rowIndex, formatExtraData) {
    

    return <div>{rowIndex + 1}</div>;
  }
  GameTitleUrl(cell, row) {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(row.game_title_small_image_url))
      return (
        <div>
          <img
            className="img_thumb "
            src={row.game_title_small_image_url}
            alt="img"
            width="50px"
            height="50px"
          />
          <p className="marginChange">{row.game_title}</p>
        </div>
      );
    else
      return (
        <img
          className="img_thumb"
          src="https://pixselo.com/wp-content/uploads/2018/03/dummy-placeholder-image-400x400.jpg"
          alt="pimg"
        />
      );
  }
  PlatformImageUrl(cell, row) {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(row.game_platform_image_url))
      return (
        <div>
          <img
            className="img_thumb "
            src={row.game_platform_image_url}
            alt="img"
            width="50px"
            height="50px"
          />
          <p className="marginChange">{row.game_platform}</p>
        </div>
      );
    else
      return (
        <img
          className="img_thumb"
          src="https://pixselo.com/wp-content/uploads/2018/03/dummy-placeholder-image-400x400.jpg"
          alt="pimg"
        />
      );
  }
  SkillLevelUrl(cell, row) {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(row.game_skill_level_image_url))
      return (
        <div>
          <img
            className="img_thumb "
            src={row.game_skill_level_image_url}
            alt="img"
            width="50px"
            height="50px"
          />
          <p className="marginChange">{row.game_skill_level}</p>
        </div>
      );
    else
      return (
        <img
          className="img_thumb"
          src="https://pixselo.com/wp-content/uploads/2018/03/dummy-placeholder-image-400x400.jpg"
          alt="pimg"
        />
      );
  }
  AnnouncementLink(event, cell, row) {

    return (
      <button
        onClick={() => {
          event.preventDefault();
          let confirmed = confirm("Are You Sure ");
          if (confirmed) {
            localStorage.setItem("league_id", row.league_id);

            this.props.history.history.push(`/announcement/${row.league_id}`);
          }
        }}
        className="btn btn-secondary"
      >
        Announcement
      </button>
    );
  }

  render() {
    const { regionsList } = this.state;
    const expandRow = {
      renderer: row => {

        const columns2 = [
          {
            dataField: "game_title_small_image_url",
            text: "  Game Title   ",
            sort: true,
            formatter: this.GameTitleUrl.bind(this)
          },
          {
            dataField: "game_platform_image_url",
            text: "Platform",
            classes: "textAlign",
            formatter: this.PlatformImageUrl.bind(this)
            // title: (cell, row, rowIndex, colIndex) => `${row.announcement_content}`
          },

          {
            dataField: "game_skill_level_image_url",
            text: "Skill Level",
            classes: "textAlign",
            formatter: this.SkillLevelUrl.bind(this)
            // title: (cell, row, rowIndex, colIndex) => `${row.announcement_content}`
          },
          {
            dataField: "league_id",
            text: "Announcement",
            classes: "textAlign",
            formatter: this.AnnouncementLink.bind(this, event),
            hidden: row.league_id == 0
            // title: (cell, row, rowIndex, colIndex) => `${row.announcement_content}`
          }
        ];

        let rowArray = [row];
        return (
          <BootstrapTable
            data={rowArray}
            columns={columns2}
            keyField="game_skill_level_id"
          />
        );
      },
      showExpandColumn: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return (
            <button
              onClick={event => {
                event.preventDefault();
              }}
              className="btn btn-sm btn-danger"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          );
        }
        return (
          <button
            onClick={event => {
              event.preventDefault();
            }}
            className="btn btn-sm btn-success"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        );
      },
      expandByColumnOnly: true,
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <button
              onClick={event => {
                event.preventDefault();
              }}
              className="btn btn-sm btn-danger"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          );
        } else {
          return (
            <button
              onClick={event => {
                event.preventDefault();
              }}
              className="btn btn-sm btn-success"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          );
        }
      }
    };

    if (isAuthenticated()) {
      const options = {
        expandRowBgColor: "white",
        sizePerPage: 10,
        prePage: "Previous",
        nextPage: "Next",
        firstPage: "First",
        lastPage: "Last",
        hideSizePerPage: true,
        noDataText: "No data available"
      };
      const columns = [
        {
          dataField: "game_skill_level_id",
          text: " Position ",
          classes: "textAlign",
          formatter: this.indexN.bind(this),
          headerStyle: (colum, colIndex) => {
            return { textAlign: "center" };
          },
          style: () => {
            return { textAlign: "center" };
          },

          sort: true
        },
        {
          dataField: "league_name",
          text: "League Name",
          classes: "textAlign",
          title: (cell, row, rowIndex, colIndex) => `${row.league_name}`
        },
        {
          dataField: "game_title",
          text: "Game Title",
          classes: "textAlign",
          title: (cell, row, rowIndex, colIndex) => `${row.game_title}`
        },
        {
          dataField: "game_platform",
          text: "Platform",
          classes: "textAlign",
          title: (cell, row, rowIndex, colIndex) => `${row.game_platform}`
        },
        {
          dataField: "game_skill_level",
          text: "Skill Level",
          classes: "textAlign",
          title: (cell, row, rowIndex, colIndex) => `${row.game_skill_level}`
        },
        {
          dataField: "any",
          text: "Link",
          classes: "textAlign",
          formatter: this.createPage.bind(this)
        }
      ];

      return (
        <div className="col-md-8">
          <NotificationSystem ref="notificationSystem" />
          <div style={{ color: "black" }}>
            <div className="row">
              <div className="col-sm-8">
                <h2>League Wizard List </h2>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="region"> Region </label>
                  <select
                    value={this.state.regionIdval}
                    className="form-control"
                    onChange={this.SelectRegion.bind(this)}
                  >
                    <option value="">Select Region</option>
                    {regionsList.map(item => {
                      return (
                        <option key={item.region_id} value={item.region_id}>
                          {item.region}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <br />
              <div className="col-sm-4">
                <label> Title</label>
                <select
                  value={this.state.titleId}
                  className="form-control"
                  onChange={this.titleOnChange.bind(this)}
                >
                  <option value="">Select Title </option>
                  {this.state.GameTitleListData.map(item => {
                    return (
                      <option
                        key={item.game_title_id}
                        value={item.game_title_id}
                      >
                        {item.game_title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-sm-4">
                <label> Platform </label>
                <select
                  value={this.state.platformId}
                  className="form-control"
                  onChange={this.platformOnChange.bind(this)}
                >
                  <option value="">Select GameTitlePlatform </option>
                  {this.state.GameTitlePlatformList.map(item => {
                    return (
                      <option
                        key={item.game_platform_id}
                        value={item.game_platform_id}
                      >
                        {item.game_title_platform}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-sm-4 form-group">
                <div className="checkbox">
                  <label>
                    <input
                      name="doWeNeed"
                      checked={this.state.doWeNeed}
                      type="checkbox"
                      value=""
                      onChange={this.handledoWeNeedChange.bind(this)}
                    />
                    Need a League
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <BootstrapTable
                  striped
                  hover
                  condensed
                  data={this.state.LeagueSearchList}
                  bordered={false}
                  keyField="game_skill_level_id"
                  columns={columns}
                  expandRow={expandRow}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="side-bar" style="display:none;" />;
    }
  }
}

export default _leagueWizardList;
