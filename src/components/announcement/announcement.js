import React, { Component } from "react";
import NotificationSystem from "react-notification-system";
import "!style-loader!css-loader!react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  announcement,
  announcementDelete,
  announcementEdit
} from "../../data-access/tournament-data/tournamentData";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML
} from "draft-js";
import "!style-loader!css-loader!react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import '!style-loader!css-loader!./_league-wizard.css';
import "!style-loader!css-loader!../../css/pages/game-data/announcement.css";
import "!style-loader!css-loader!react-datepicker/dist/react-datepicker.css";
import * as _ from "underscore";
import draftToHtml from "draftjs-to-html";
import BootstrapTable from "react-bootstrap-table-next";
import { createAnnouncement } from "../../data-access/tournament-data/tournamentData";
import paginationFactory from "react-bootstrap-table2-paginator";

import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementList: [],
      show: false,
      loader: false,
      editorState: EditorState.createEmpty(),
      announcement_content: "",
      announcement_subject: "",
      showDel: false,
      showEdit: false,
      deleteLeagueAnnouncementId: "",
      editLeagueAnnouncementId: "",
      previous_announcement_content: "",
      previous_announcement_subject: ""
    };
  }
  openDeleteAnnouncement(league_announcement_id) {
    this.setState({
      showDel: true,
      deleteLeagueAnnouncementId: league_announcement_id
    });
  }
  openEditModal(league_announcement_id, row) {
    event.preventDefault();
    this.setState({
      showEdit: true,
      editLeagueAnnouncementId: league_announcement_id,
      previous_announcement_content: row.announcement_content,
      previous_announcement_subject: row.announcement_subject,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(row.announcement_content)
        )
      )
    });
  }
  deleteAnnouncement(event) {
    event.preventDefault();

    let value = {};
    value["is_deleted"] = true;
    let updated_data = {};
    updated_data["changed"] = value;

    announcementDelete(
      this.state.deleteLeagueAnnouncementId,
      updated_data,
      response => {
        this._notificationSystem.addNotification({
          message: "Announcement deleted",
          level: "success"
        });
        this.setState({
          showDel: false,
          detail: ""
        });
        this.Announcement();
      },
      message => {
        this._notificationSystem.addNotification({
          message: message.message,
          level: "error"
        });
      }
    );
  }
  editAnnouncementSubmit(event) {
    event.preventDefault();
    let values = {};

    values.announcement_content = this.state.announcement_content
      ? JSON.parse(this.state.announcement_content || "")
      : this.state.previous_announcement_content;
    values.announcement_subject = this.state.announcement_subject
      ? this.state.announcement_subject || ""
      : this.state.previous_announcement_subject;
    let updated_data = {};

    updated_data["changed"] = values;

    announcementEdit(
      this.state.editLeagueAnnouncementId,
      updated_data,
      response => {
        this._notificationSystem.addNotification({
          message: "Announcement Editted",
          level: "success"
        });
        this.setState({
          showDel: false,
          detail: "",
          announcement_subject: "",
          announcement_content: "",
          showEdit: false,
          previous_announcement_content: "",
          previous_announcement_subject: "",
          editorState: EditorState.createEmpty()
        });
        this.Announcement();
      },
      message => {
        this._notificationSystem.addNotification({
          message: message.message,
          level: "error"
        });
      }
    );
  }

  ActionFormatter(cell, row) {
    return (
      <div>
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id="tooltip-disabled">Delete Announcement!</Tooltip>
          }
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={this.openDeleteAnnouncement.bind(
              this,
              row.league_announcement_id,
              event
            )}
            className="btn btn-danger btn-fill  btn-sm"
          >
            <i className="fas fa-trash-alt" />
          </span>
        </OverlayTrigger>{" "}
        &nbsp;
      </div>
    );
  }
  SubjectFormatter(cell, row) {
    return (
      <div>
        <a
          href="#"
          onClick={this.openEditModal.bind(
            this,
            row.league_announcement_id,
            row
          )}
          className="Nav_link"
        >
          {row.announcement_subject}
        </a>
      </div>
    );
  }

  componentDidMount() {
    let league_id = this.props.history.match.params.id;
    this._notificationSystem = this.refs.notificationSystem;
    announcement(
      league_id,
      response => {
        this.setState({ announcementList: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "error",
          level: "error"
        });
      }
    );
  }
  Announcement() {
    let league_id = this.props.history.match.params.id;

    announcement(
      league_id,
      response => {
        this.setState({ announcementList: response });
      },
      message => {
        this._notificationSystem.addNotification({
          message: "Error",
          level: "error"
        });
      }
    );
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      announcement_content: JSON.stringify(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      ),
      previous_announcement_content: ""
    });
  }
  onEditorEditStateChange(editorState) {
    this.setState({
      editorState,
      announcement_content: JSON.stringify(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      )
    });
  }

  Addnew() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false, showDel: false });
    this.refs.createForm.reset();
  }
  handleCloseDeleteModal() {
    this.setState({ showDel: false, deleteLeagueAnnouncementId: "" });
    this.refs.deleteForm.reset();
  }
  handleCloseEdit() {
    this.setState({
      showEdit: false,
      editLeagueAnnouncementId: "",
      previous_announcement_content: "",
      previous_announcement_subject: "",
      announcement_subject: "",
      announcement_content: "",
      editorState: EditorState.createEmpty()
    });
    this.refs.EditForm.reset();
  }

  subjectChange(event) {
    this.setState({
      announcement_subject: event.target.value,
      previous_announcement_subject: ""
    });
  }
  subjectEditChange(event) {
    this.setState({
      announcement_subject: event.target.value,
      previous_announcement_subject: ""
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    let data = {
      league_id: this.props.history.match.params.id,
      language_id: 1000,
      announcement_subject: this.state.announcement_subject,
      announcement_content: JSON.parse(this.state.announcement_content)
    };

    createAnnouncement(
      data,
      response => {
        if (response.id) {
          this.Announcement();
          this.setState({
            show: false,
            announcementList: this.state.announcementList,
            announcement_content: "",
            announcement_subject: "",
            editorState: EditorState.createEmpty()
          });
        }
      },
      message => {
        this._notificationSystem.addNotification({
          message: "Error",
          level: "error"
        });
      }
    );
    this._notificationSystem = this.refs.notificationSystem;
  }
  render() {
    const defaultSorted = [
      {
        dataField: "announcement_date",
        order: "desc"
      }
    ];
    const columns = [
      // {
      //   dataField: "league_announcement_id",
      //   text: "League Announcement Id",
      //   sort: true
      // },
      // {
      //   dataField: "announcement_content",
      //   text: "Announcement Content",
      //   classes: "textAlign",
      //   title: (cell, row, rowIndex, colIndex) => `${row.announcement_content}`
      // },

      {
        dataField: "announcement_subject",
        formatter: this.SubjectFormatter.bind(this),
        text: "Subject",
        classes: "textAlign",
        title: (cell, row, rowIndex, colIndex) => `${row.announcement_subject}`,
        sort: true
      },
      {
        dataField: "announcement_date",
        text: "Date",
        title: (cell, row, rowIndex, colIndex) => `${row.announcement_date}`,
        sort: true
      },
      {
        text: " Action",
        formatter: this.ActionFormatter.bind(this),
        dataField: "any",
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }
    ];

    const { show, loader, editorState } = this.state;
    const announcementList = this.state.announcementList
      ? this.state.announcementList
      : [];
    return (
      <div className="col-md-8 offset-md-1">
        <NotificationSystem ref="notificationSystem" />
        <div className="row">
          <div className="col-sm-12">
            <h2>
              Announcement
              <button
                className="btn btn-fill btn-primary btn-sm position"
                onClick={() => this.Addnew()}
              >
                Add New
              </button>
            </h2>
          </div>
          <div className="container ">
            <BootstrapTable
              striped
              bordered
              hover
              condensed
              keyField="league_announcement_id"
              data={announcementList}
              columns={columns}
              wrapperClasses="boo"
              pagination={paginationFactory()}
              headerClasses="header-class"
              defaultSorted={defaultSorted}
            />
          </div>
        </div>
        <Modal size="sm" show={show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Game Mode</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={this.handleSubmit.bind(this)}
              id="createForm"
              ref="createForm"
            >
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="announcement_subject">
                      {" "}
                      Announcement Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="announcement_subject"
                      name="announcement_subject"
                      placeholder="Enter Announcement Subject"
                      onChange={this.subjectChange.bind(this)}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-12 ">
                  <label htmlFor="announcement_content">
                    {" "}
                    Announcement Content
                  </label>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorEditStateChange.bind(
                      this
                    )}
                  />
                </div>
              </div>
              <br />

              <button type="submit" className="btn btn-fill btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
          {loader ? (
            <div className="loader">
              <i className="fas fa-circle-notch fa-spin" />
            </div>
          ) : (
            ""
          )}
        </Modal>

        {/* Edit Announcement */}

        <Modal
          size="sm"
          show={this.state.showEdit}
          onHide={this.handleCloseEdit.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={this.editAnnouncementSubmit.bind(this)}
              id="EditForm"
              ref="EditForm"
            >
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="announcement_subject">
                      {" "}
                      Announcement Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="announcement_subject"
                      name="announcement_subject"
                      placeholder="Enter Announcement Subject"
                      value={
                        this.state.announcement_subject
                          ? this.state.announcement_subject
                          : this.state.previous_announcement_subject
                      }
                      onChange={this.subjectEditChange.bind(this)}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-12 ">
                  <label htmlFor="announcement_content">
                    {" "}
                    Announcement Content
                  </label>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class "
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                  />
                </div>
              </div>

              <br />
              <button type="submit" className="btn btn-fill btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/* Delete Announcement */}
        <Modal
          dialogClassName="modal-20w text-center"
          show={this.state.showDel}
          onHide={this.handleCloseDeleteModal.bind(this)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Body>
            <form
              onSubmit={this.deleteAnnouncement.bind(this)}
              id="deleteForm"
              ref="deleteForm"
            >
              <p> Are you sure! </p>
              <input
                type="hidden"
                className="form-control"
                id="delete_id"
                name="id"
              />
              <button type="submit" className="btn btn-fill btn-danger">
                {" "}
                Delete{" "}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default Announcement;
