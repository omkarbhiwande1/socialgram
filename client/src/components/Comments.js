import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import AddComment from './AddComment';
import DisplayComments from './DisplayComments';
import {getComments} from '../actions/postActions'

class Comments extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getComments(this.props.postid);
    };
    handleClose = () => {
        this.setState({ open: false });

    };
    
      
    render() {
        // const { classes } = this.props;

        return (
            <Fragment>
                <span onClick={this.handleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{color: 'blue', cursor: 'pointer'}} width="22" height="22" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </span>
                <div className="modal-parent p-2" style={{display: this.state.open?'block':'none'}}>

              
                    <div className="modal-body comment-modal-body p-2">
                        <button onClick={this.handleClose} className="d-block btn btn-sm btn-danger ml-auto">
                            Close
                        </button>
                        <AddComment postid={this.props.postid}/>
                        <hr/>
                        <br/>
                        <br/>
                        <DisplayComments/>
                    </div>
                </div>
           
            </Fragment>
        );
    }
}
export default connect(
    ()=>({}),
    {
        getComments
    }
)(Comments);


