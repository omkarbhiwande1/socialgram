import React, { Component, Fragment } from 'react';
import {deletePost} from '../actions/postActions';
import {connect} from 'react-redux';
import Modal from 'react-modal';
// MUI Stuff
import DeleteIcon from '@material-ui/icons/Delete';
import { CircularProgress } from '@material-ui/core';
const customStyles = {
  content : {
      margin: 'auto',
      width: 500,
      height: 'fit-content',
      padding: '20px'
      
  }
};
Modal.setAppElement('#root')

class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = async () => {
    await this.props.deletePost(this.props.postid);
    this.setState({ open: false });
  };
  
  render() {
    const {classes, loadingPost} = this.props;
    return (
      <div>
        <DeleteIcon className="post-delete-icon" onClick={this.handleOpen}/>
        <div id="myModal" className="modal-parent " style={{display: this.state.open?'block':'none'}}>

              
          <div className="modal-body delete-modal-body">
            {
            loadingPost?(
              <div className="">
                  <CircularProgress className="d-block m-auto"/>
              </div>
            ):(
              <Fragment>
                <p>
                  Are you sure you want to delete this post
                </p>
                <button className="btn btn-sm btn-secondary mr-3" onClick={this.handleClose}>
                  Close
                </button>
                <button className="btn btn-sm btn-danger" onClick={this.deletePost}>
                  Delete
                </button>
              </Fragment>
            )
            }            

          </div>
        </div>
                
      </div>
    );
  }
}


export default connect(
    (state)=>({
      loadingPost: state.ui.loadingPost
    }),
    {
        deletePost
    }
)(DeletePost)
