import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addComment} from '../actions/postActions';
//Material Ui stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { red, blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    commentIcon: {
        color: 'blue',
        cursor: 'pointer'
    },
    submitButton: {

    }
  
});
class AddComment extends Component {
    state = {
        comment: '' 
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.addComment(this.props.postid,this.state.comment);
        this.setState({
            comment: ''
        })
    }
    handleChange=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })
        // console.log(this.state.bio);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h5">
                        Add Comment form
                </Typography>
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        name="comment"
                        type="text"
                        label="Comment"
                        multiline
                        rows="2"
                        variant="outlined"
                        value={this.state.comment}
                        // className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                    />
    
                    <br/>
                    <br/>
                    <Button variant="outlined" color="primary" type="submit" className={classes.submitButton}>Submit</Button>
                    

                </form>
            </div>
        )
    }
}
export default connect(
    ()=>({
        
    }),
    {
        addComment
    }
)(withStyles(styles, { withTheme: true })(AddComment))

