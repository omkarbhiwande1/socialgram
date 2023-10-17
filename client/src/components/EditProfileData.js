import React, { Component , Fragment} from 'react'
import {connect} from 'react-redux';
import {updateUserData} from '../actions/userActions';
import Modal from 'react-modal';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core';

const customStyles = {
    content : {
        margin: 'auto',
        width: 500,
        height: 'fit-content',
        padding: '20px'
        
    }
};
Modal.setAppElement('#root')

const styles = theme => ({
    editIcon:{
        color: blue[700],
        position: 'absolute',
        left: '90%',
        top: 225,
        cursor: 'pointer'
    },
    submitButton:{
        // display: 'block',
        marginTop: '10px',
        // margin: '5px auto 0 auto',
        '&:hover': {
            backgroundColor: blue[100],
        }
    },
    title:{
        paddingBottom: '20px'
    }

});

class EditProfileData extends Component {
    state={
        open: false,
        bio: ''
    }

    handleOpen=()=>{
        this.setState({
            open: true
        }) 
    }
    handleClose=()=>{
        this.setState({
            open: false
        }) 
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const data = {
            bio: this.state.bio
        }
        console.log(data);
        this.props.updateUserData(data);
        this.setState({
            open: false,
            bio: ''
        })
    }
    handleChange=(e)=>{

        this.setState({
            bio : e.target.value
        })
        // console.log(this.state.bio);
    }
    render() {
        const {classes} = this.props;
        // console.log(user.bio);
        return (
            <div >
                <EditIcon className={classes.editIcon} onClick={this.handleOpen}/>
                <Modal
                    isOpen={this.state.open}
                    onRequestClose={this.handleClose}
                    style={customStyles}
                >
        
                    <Typography variant="h5" className={classes.title}>
                        Edit user details form
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="2"
                            variant="outlined"
                            value={this.state.bio}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <Button variant="outlined" color="primary" type="submit" className={classes.submitButton}>Submit</Button>

                    </form>
                </Modal>
                
            </div>
        )
    }
}

export default connect(
    ()=>({}),
    {
        updateUserData
    }
)(withStyles(styles, { withTheme: true })(EditProfileData))
