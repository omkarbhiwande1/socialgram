import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTempUserData, unfollowUser, followUser} from '../actions/userActions';
//Mui stuff

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
const styles = theme => ({
   
    detailsParent: {
        // minHeight: 400,
        display: 'fixed',
        // border: '1px solid black'
    },
    card: {
        position: 'relative',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15px'
    },
    userImage:{
        display: 'block',
        width: 200,
        height: 200,
        borderRadius: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        margin: '0 auto',
        // border: '1px solid black'
    },
    content: {
        padding: 0,
        objectFit: 'cover',
    // marginLeft: '0px',
    },
    username:{
        textAlign: 'center',
        // color: blue[500],
        marginBottom: 5
    },
    bio:{
        textAlign: 'center',
        marginBottom: '10px'
    },
    circularProgress: {
        display: 'block',
        margin: '100px auto 0 auto'
    },
    link: {
        textDecoration: 'none',
        color: blue[800]
    },
    followButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'red',
    },
});
class User extends Component {
    componentDidMount(){
        // console.log(this.props);
        this.props.getTempUserData(this.props.match.params.id);
    }
    handleUnfollow=(id)=>{
        this.props.unfollowUser(id);
    }
    handleFollow=(id)=>{
        this.props.followUser(id,'none');
        
    }
    render() {
        const {classes, tempUser, following, currentUser} = this.props;
        const id = parseInt(this.props.match.params.id);
        // console.log(following);
        return (
            <div className={classes.detailsParent}>
                {
                    !tempUser?<CircularProgress className={classes.circularProgress}/>:(

                        <Card className={classes.card}>
                            <CardMedia 
                                component="img"
                                alt="User Image"
                                src={tempUser.user.profilepic}
                                className={classes.userImage}
                            />
                            <CardContent className={classes.content}>

                                <Typography className={classes.username}>Followers:{tempUser.followerscount}</Typography>
                                <Typography className={classes.username}>Following:{tempUser.followingcount}</Typography>
                                
                                
                                <Typography className={classes.username}>{tempUser.user.username}</Typography>
                                <div className={classes.bio}>
                                    <span>{tempUser.user.bio}</span>
                                    
                                </div>
                                {
                                    currentUser && currentUser.userid === id? null: (!following?(null):(
                                        (following.indexOf(id) !== -1)? (
                                            <Button variant="outlined" className={classes.followButton} onClick={()=>this.handleUnfollow(id)}>Unfollow</Button>

                                        ):(

                                            <Button variant="outlined" className={classes.followButton} onClick={()=>this.handleFollow(id)}>Follow</Button>
                                        )
                                    ))
                                }

                            </CardContent>
                        </Card>
                    )
                }
            </div>
        )
    }
}

export default connect(
    (state)=>({
        tempUser: state.user.tempUser,
        following: state.user.following,
        currentUser: state.user.user
        
    }),
    {
        getTempUserData,
        unfollowUser,
        followUser
    }
)(withStyles(styles, { withTheme: true })(User))
