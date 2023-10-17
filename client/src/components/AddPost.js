import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPost} from '../actions/postActions';
//Material ui stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress, TextareaAutosize } from '@material-ui/core';

class AddPost extends Component {
    state={
        open: false,
        content: '',
        postimg: null,
        imageName: '',
        time: ''
    }

    handleOpen=()=>{
        this.setState({
            open: true
        }) 
        // console.log(this.props.history);
    }
    handleClose=()=>{
        this.setState({
            open: false
        }) 
    }

  
    handleSubmit = async (e)=>{
        e.preventDefault();
        // var timestamp = moment.unix(Math.floor((Date.now())/1000));
        const timeField = document.querySelector('#time');
        // timeField.value = timestamp.format("MMMM Do YYYY, HH:mm") ;
        timeField.value=Math.floor((Date.now())/1000);
        const formElem = document.querySelector('#addPostForm');
        const formData = new FormData(formElem);
        // console.log(formElem);
        await this.props.addPost(formData);
        this.setState({
            open: false,
            imageName: ''
        }) 

        
    }
    handleChange=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })
        // console.log(this.state.bio);
    }
    handleImageChange=(e)=>{
        const image = e.target.files[0];
        // const formData = new FormData();
        // formData.append('postimg', image, image.name);
        // this.setState({
        //     postimg: formData
        // })
        this.setState({
            imageName: image.name
        });
    }
    buttonClick=(e)=>{
        const input = document.getElementById('postImageInput');
        input.click();
    }
    render() {
        const {loadingPost} = this.props;
        // console.log(user.bio);
        return (
            
            <div className="">
                <span onClick={this.handleOpen} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{color: 'white', cursor: 'pointer'}} width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </span>
                {/* <AddIcon className={classes.addIcon} onClick={this.handleOpen}/> */}
                
                <div className="modal-parent p-2" style={{display: this.state.open?'block':'none'}}>

              
                    <div className="modal-body p-2">
                        <div >
                        {
                            loadingPost?
                            
                            <div className="">
                
                                <CircularProgress className="d-block m-auto"/>
                            </div>:
                            <div>
                            <button className="d-block btn btn-sm btn-danger ml-auto" onClick={this.handleClose}>Close</button>

                            <p className="h5">
                                Add Post form
                            </p>
                            <form onSubmit={this.handleSubmit} id="addPostForm" encType="multipart/form-data">
                                <TextField
                                    name="content"
                                    type="text"
                                    label="Content"
                                    multiline
                                    rows="2"
                                    variant="outlined"
                                    value={this.state.bio}
                                    className=""
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <input type="file" id="postImageInput" style={{visibility: 'hidden'}} className="" name="postimg" onChange={this.handleImageChange}/>
                                {/* <input type="text"  style={{visibility: 'hidden'}} name="time" id='time' /> */}
                                <input type="text"  style={{visibility: 'hidden'}} name="time" id='time' />

                                <div className="">
                                    <Button variant="contained" className="" onClick={this.buttonClick}>Add Image</Button>
                                    
                                    <input type="text" className="ml-2" value={this.state.imageName} onChange={()=>{}}/>
                                </div>
                                <br/>
                                <Button variant="outlined" color="primary" type="submit" className="">Submit</Button>

                            </form>
                            </div>
                        }
                        </div>

                    </div>

                </div>
                
                
            </div>
        )
    }
}

export default connect(
    (state)=>({
        loadingPost: state.ui.loadingPost
    }),
    {
        addPost
    }
)(AddPost)
  
