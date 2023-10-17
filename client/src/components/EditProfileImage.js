import React, { Component , Fragment} from 'react'
import {connect} from 'react-redux';
import {updateUserImage} from '../actions/userActions';
import Modal from 'react-modal';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
// import Input from '@material-ui/core/Input';
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
        top: 5,
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
    },
    fileInput: {
        visibility: 'hidden'
    }

});

class EditProfileImage extends Component {
    state={
        open: false,
        bio: ''
    }


    handleChange=(e)=>{
        const image = e.target.files[0];
        console.log(image.name);
        const formData = new FormData();
        formData.append('profilepic', image, image.name);
        this.props.updateUserImage(formData);

        // console.log(this.state.bio);
    }
    buttonClick=()=>{
        const input = document.getElementById('fileInput');
        input.click();
    }
    render() {
        const {classes} = this.props;
        // console.log(user.bio);
        return (
            <div >
                <EditIcon className={classes.editIcon} onClick={this.buttonClick}/>
                <input type="file" className={classes.customFileInput} id="fileInput" className={classes.fileInput} onChange={this.handleChange}/>
               
            </div>
        )
    }
}

export default connect(
    ()=>({}),
    {
        updateUserImage
    }
)(withStyles(styles, { withTheme: true })(EditProfileImage))
