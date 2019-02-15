import React, { Component } from "react";
import Navbar from "../components/navbar";
import { connect } from 'react-redux';
import * as AuthAction from '../actions/authaction';
import "./newstory.css";
import $ from "jquery";


class NewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            file: '',
            imagePreviewUrl: '',
            imagePreviewUrl2: '',
            file2: '',
            file3: '',
            imagePreviewUrl3: '',
            generes: [],
            valuegenere: [],
            currentvaluegenere: '',
            valuerating: '',
            valuetarget: '',
            tags: '',
            unique:[],
            uniqueNames:[]
        }
    }
    saveGenere =(event) => {
        let newelement=event.target.value
        this.setState(prevState => ({
            currentvaluegenere: newelement,
            valuegenere: [...prevState.valuegenere, newelement],
        }))
        
        // this.call_me(...uniqueNames);

        console.log("valuegenere", this.state.valuegenere, "valuerating", this.state.valuerating);
       
    }
    saveTarget(event) {
        this.setState({ valuetarget: event.target.value });
    }
    saveRating(event) {
        this.setState({ valuerating: event.target.value });

    }
    componentDidMount() {
        this.props.genereapi();
        let tktoken = localStorage.getItem('user_token');
        if (!tktoken) {
            this.props.history.push("./");
        }
    }
    onChange = (e) => {
        switch (e.target.name) {
            case 'selectedFile':
                if (e.target.files.length > 0) {

                    this.setState({ fileName: e.target.files[0].name });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };
    logoutMethod = () => {
        this.props.logout();
        this.props.history.push("./")
    }
    submitstory = (event) => {
        event.prevntDefault();
    }

    handleselect = (e) => {
        console.log("selecttarget", e.target);

    }
    _handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log("filehereee", file);


        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    removeFeature = () => {
        this.setState({
            file: '',
            imagePreviewUrl: ''
        })
    }
    imageEmbeddedPoster = (event) => {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file, "filessssssssssss");
        console.log("filehereee", file);


        reader.onloadend = () => {
            this.setState({
                file2: file,
                imagePreviewUrl2: reader.result,
            });
        }


        reader.readAsDataURL(file)
    }
    removeEmbedPoster = () => {
        this.setState({
            file2: '',
            imagePreviewUrl2: ''
        })
    }
    // call_me=(uniqueNames) => {
    //     console.log(uniqueNames,"uniqqqqqqq");     
    // }
    removegenere = (index,currElement,event) => {

        console.log(index, "uniqueNameInTheddRemove",currElement,"currElement");
        var array = [...this.state.valuegenere];
        
       
        console.log(array,"array_in_splice",index);

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({unique: array,valuegenere:array});
          }
        // var index = array.indexOf(5);
        // if (index > -1) {
        //     array.splice(index, 1);
        // }
        // // array = [2, 9]
        // console.log(array);



    }


    sponsorLogo = (event) => {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        console.log("filehereee", file);


        reader.onloadend = () => {
            this.setState({
                file3: file,
                imagePreviewUrl3: reader.result,
            });
        }
        reader.readAsDataURL(file)
    }

    removeSponsorLogo = () => {
        this.setState({
            file3: '',
            imagePreviewUrl3: ''
        })
    }
    addtags = (event) => {
        alert("hello");
        this.setState({
            tags: event.target.value
        })
    }

    render() {
        //genere problem
        console.log(this.state.valuegenere,"valuegen=====",this.state.unique,"unique========");
        

        // genere DAta
        let genereData = this.props.genere.map(msgTemplate => (
            <option key={msgTemplate.id} value={msgTemplate.name}>
                {msgTemplate.name}
            </option>
        ))


        //image file

        let { imagePreviewUrl } = this.state;
        let { imagePreviewUrl2 } = this.state;
        let { imagePreviewUrl3 } = this.state;
        let $imagePreview = null;
        let $imagePreview2 = null;
        let $imagePreview3 = null;
        if (imagePreviewUrl) {
            $imagePreview =
                (<div>
                    <a className="danger ml-1" ><i onClick={this.removeFeature.bind(this)} className=" fa fa-remove"> </i></a>
                    <img src={imagePreviewUrl} width="100px" height="100px" alt="cool" />
                </div>);
        }
        if (imagePreviewUrl2) {
            $imagePreview2 = (
                <div>
                    <a className="danger ml-1" ><i onClick={this.removeEmbedPoster.bind(this)} className=" fa fa-remove"></i></a>
                    <img src={imagePreviewUrl2} width="100px" height="100px" />
                </div>);
        }
        if (imagePreviewUrl3) {
            $imagePreview3 = (
                <div>
                    <a className="danger ml-1" ><i onClick={this.removeSponsorLogo.bind(this)} className=" fa fa-remove"></i></a>
                    <img src={imagePreviewUrl3} width="100px" height="100px" />
                </div>);
        }
        //audio file

        const { fileName } = this.state;
        let file = null;
        file = fileName
            ? (<span> {fileName}</span>)
            : (<span>Choose a file...</span>);
        console.log(this.props, "here propas in Story", file, "fileeeee");




        return (
            <div className="container-fluid">
                <Navbar logout={this.logoutMethod} />

                <div className="is-auth col-md-12 mt-3">
                    <div className="card p-4 shadow-lg form-sm">
                        <form >
                            <div className="form-heading">
                                <h3 className="mt0">Create New Story</h3>
                            </div>
                            <div className="form-body">
                                <div className="form-row">
                                    <div className="col-md-4">
                                        <label className="col-form-label-sm">Name</label>
                                        <div className="form-group has-feedback">

                                            <input type="text" name="name" className="form-control" required placeholder="Enter name" />
                                            <div className="invalid-feedback">
                                                <div >Story Name is required</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <label className="col-form-label-sm">Overview</label>
                                        <div className="form-group has-feedback">


                                            <input type="text" name="overview" className="form-control " placeholder="overview" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="col-form-label-sm">Audio</label>
                                        <div className="form-group position-relative has-feedback">
                                            <input type="file" name="selectedFile" id="file" accept="audio/*" onChange={this.onChange} className="custom-file-input" />

                                            <label className="custom-file-label" htmlFor="file"> {file} </label>
                                        </div>

                                        <div className="form-row" >
                                            <div className="card1">

                                                <span className="badge badge-dark m-1">{file}</span>
                                                {/* <span className="badge badge-dark m-1">audio length</span> */}


                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="card px-3 pt-1 pb-3 border-1 mt-3 bg-light">
                                    <div className="form-row">

                                        <div className="col-md-1 d-sm-flex align-items-end">
                                            <div className="d-flex img-uploadBox" style={{ marginBottom: "32px" }}>
                                                <div className="box">
                                                    {$imagePreview}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="col-form-label-sm">Feature Page Poster</label>
                                            <div className="form-group position-relative has-feedback">
                                                <input type="file" onChange={this._handleImageChange.bind(this)} id="posterimageUpload" accept="image/*" name="posterimage" className="custom-file-input " />
                                                <label className="custom-file-label" htmlFor="posterimageUpload">{this.state.file.name} </label>

                                            </div>
                                        </div>

                                        <div className="col-md-1 d-sm-flex align-items-end">
                                            <div className="d-flex img-uploadBox" style={{ marginBottom: "32px" }}>
                                                <div className="box">
                                                    {$imagePreview2}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="col-form-label-sm">Search and Embed Poster</label>
                                            <div className="form-group position-relative has-feedback">
                                                <input type="file" id="embedimageUpload" accept="image/*" onChange={this.imageEmbeddedPoster.bind(this)} name="embedimage" className="custom-file-input " />
                                                <label className="custom-file-label" htmlFor="embedimageUpload">{this.state.file2.name} </label>

                                            </div>
                                        </div>
                                        <div className="col-md-1 d-sm-flex align-items-end">
                                            <div className="d-flex img-uploadBox" style={{ marginBottom: "32px" }}>
                                                <div className="box">
                                                    {$imagePreview3}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="col-form-label-sm">Sponsor Logo</label>
                                            <div className="form-group position-relative has-feedback">
                                                <input type="file" id="sponserimageUpload" accept="image/*" onChange={this.sponsorLogo.bind(this)} name="spsimage" className="custom-file-input " />
                                                <label className="custom-file-label" htmlFor="sponserimageUpload">{this.state.file3.name} </label>

                                            </div>
                                        </div>

                                    </div>
                                </div>



                                <div className="form-row">
                                    <div className="col-md-4">
                                        <label id="rating" className="col-form-label-sm">Ratings</label>
                                        <div className="form-group has-feedback">

                                            <select onChange={this.saveRating.bind(this)} value={this.state.valuerating} className="form-control " name="Ratings" required>
                                                <option value="">--Select Rating--</option>
                                                <option value="RESTRICTED">RESTRICTED</option>
                                                <option value="PARENTAL GUIDANCE">PARENTAL GUIDANCE</option>
                                                <option value="GENERAL AUDIENCES">GENERAL AUDIENCES</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                <div >Select any Rating</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label id="rating" className="col-form-label-sm">Genres</label>
                                        <div className="form-group has-feedback">
                                            <select value={this.state.currentvaluegenere} onChange={this.saveGenere.bind(this)} className="form-control " name="geners" >
                                                <option value="">--Select Genres--</option>
                                                {genereData}
                                            </select>
                                            <div className="invalid-feedback">
                                                <div >Select any Genres</div>
                                            </div>

                                        </div>

                                        <div className="d-flex flex-wrap ">
                                            <div>


                                                {this.state.valuegenere.map((currElement,index) => {
                                                    console.log("The current iteration is: " + index);
                                                    console.log("The current element is: " + currElement);
                                                    console.log("\n");
                                                    return <div  className="badge badge-dark m-1"><span > {currElement} </span><a className="danger ml-1" ><i onClick={this.removegenere.bind(this,index,currElement)} className=" fa fa-remove"></i></a> </div>;
                                                })}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">

                                    <div className="col-md-4">
                                        <label className="col-form-label-sm">Tags</label>
                                        <div className="input-group has-feedback">
                                            <a onClick={this.addtags} className="btn btn-dark rounded-0"><i className="fa fa-plus"></i></a>
                                            <input type="text" name="tag" className="form-control " placeholder="Enter tags" ></input>
                                        </div>

                                    </div>
                                    <div className="col-md">
                                        <label className="col-form-label-sm">Support Media</label>
                                        <div className="form-group position-relative has-feedback">
                                            <input type="file" id="imageUpload" accept="image/*" multiple name="image" className="custom-file-input " />
                                            <label className="custom-file-label" htmlFor="imageUpload">'Choose file</label>

                                        </div>

                                    </div>


                                    <div className="col-md d-sm-flex align-items-end">
                                        <div className="d-flex img-uploadBox">
                                            <div className="box"  >
                                                <img src="item" width="100" height="100" className="img-thumbnail" />
                                                <a className="danger ml-1" ><i className=" fa fa-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-4">
                                        <div className="d-flex flex-wrap ">
                                            <div className="badge badge-dark m-1">
                                                {this.state.tags}<a className="danger ml-1" ><i className=" fa fa-remove"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>





                                <div className="card px-3 pt-1 pb-3 border-1 mt-3 bg-light">
                                    <div className="form-row">

                                        <div className="col-md-4">
                                            <label className="col-form-label-sm">Video Url</label>
                                            <div className="input-group has-feedback">
                                                <input type="text" name="tags" className="form-control " placeholder="www.google.com" />
                                                <div className="invalid-feedback">

                                                    <div >Video url must be alphabetical</div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <label className="col-form-label-sm">Transcript</label>
                                            <div className="form-group position-relative">
                                                <input type="file" id="uploadFile" name="video" className="custom-file-input" />
                                                <label className="custom-file-label" htmlFor="uploadFile">Choose file</label>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <label className="col-form-label-sm">Video Length</label>
                                            <select className="form-control " name="duration">
                                                <option value="">--Select Length--</option>
                                                <option value="1">Under 5:00</option>
                                                <option value="2">5:00 - 10:00</option>
                                                <option value="3">10:00 - 20:00</option>
                                                <option value="4">20:00 +</option>
                                            </select>
                                        </div>
                                        <div className="col-md-1 d-sm-flex align-items-end">
                                            <a className="btn btn-dark rounded-0 ">Add</a>
                                        </div>


                                    </div>
                                    <div className="form-row">
                                        <div className="card1">

                                            <span className="badge badge-dark m-1">{"itemurl"}</span>


                                            <span className="badge badge-dark m-1">{"N/A"}</span>


                                            <span className="badge badge-dark m-1">vdoduration </span>




                                            <a className="danger ml-1" ><i className=" fa fa-remove"></i></a>

                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-12">
                                        <label className="col-form-label-sm">Description</label>
                                        <div className="form-group has-feedback">

                                            <textarea type="text" name="description" className="form-control " placeholder="Enter description">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="card px-3 pt-1 pb-3 border-1 mt-3 bg-light">

                                    <div className="col-md-4" >
                                        <a className="btn btn-success rounded-0"><i className="fa fa-plus"></i>
                                            Add Credit
                            </a>

                                    </div>
                                    <div className="form-row" >

                                        <div className="col-md-4">
                                            <label className="col-form-label-sm">Role</label>
                                            <div className="input-group has-feedback">
                                                <input type="text" name="role{{i}}" className="form-control " />

                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="col-form-label-sm">Name</label>
                                            <div className="form-group position-relative">
                                                <input type="text" name="Name{{i}}" className="form-control " />
                                            </div>
                                        </div>



                                        <div className="col-md-4" style={{ marginTop: "32px" }}>
                                            <a className="btn btn-dark rounded-0"><i className="fa fa-remove"></i></a>
                                        </div>

                                    </div>



                                </div>
                                <div className="form-row text-center">
                                    <button type="submit" className="btn btn-success mt-3"> Update or save</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToDispatchProps = (dispatch) => {
    return {
        logout: () => dispatch(AuthAction.logout()),
        genereapi: () => dispatch(AuthAction.genereapi()),
    }
}
const mapStateToProps = (state) => {
    return {
        genere: state.auth.genere,
    };
};
export default connect(mapStateToProps, mapToDispatchProps)(NewStory);
