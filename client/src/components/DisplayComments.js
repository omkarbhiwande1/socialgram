import React, { Component } from 'react'
import {connect} from 'react-redux';
//Material Ui stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';


const styles = theme => ({
    loadCommentButton: {
        backgorundColor: 'blue',
        color: blue[400]
    },
    comments: {
        height: '300px'
    },
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        flexWrap: 'wrap'
    },
    image: {
        minWidth: 200,
        minHeight: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },

    username:{
    
        textDecoration: 'none',
        color: blue[500],
        fontSize: '0.8em'
    },
    
  
});
class DisplayComments extends Component {
    render() {
        const { classes, comments, isLoading} = this.props;
        // console.log("comments are",comments);
        return (
            
            <div style={{height: '300px', overflow: 'auto'}} className="">
                {
                    !isLoading && comments.map((comment)=>{
                        return (<Card className={classes.card} key={comment.commentid}>
                            
                            <CardContent className={classes.content}>  
                               <Typography variant="body1">{comment.comment}</Typography> 
                               <Typography className={classes.username}>By {comment.username}</Typography> 
                            </CardContent>
                            
                        </Card>);
                    })
                }
                
            </div>
        )
    }
}
export default connect(
    (state)=>({
        comments: state.posts.comments,
        isLoading: state.ui.isLoading
    }),
    {
        
    }
)(withStyles(styles, { withTheme: true })(DisplayComments))

