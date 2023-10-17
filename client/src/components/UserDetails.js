import React, { Component } from 'react'
import {connect} from 'react-redux';
import EditProifleImage from '../components/EditProfileImage';
import EditProifleData from '../components/EditProfileData';
import {Link} from 'react-router-dom';

//Mui stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// import classes from '*.module.css';

const styles = theme => ({
    detailsParent: {
        // minHeight: 400,
        display: 'fixed',
        // border: '1px solid black'
    },
    card: {
        position: 'relative',
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
        textAlign: 'center'
    },
    circularProgress: {
        display: 'block',
        margin: '100px auto 0 auto'
    },
    link: {
        textDecoration: 'none',
        color: blue[800]
    }
});
class UserDetails extends Component {
 
    render() {
        const {classes, user, followerscount, followingcount} = this.props;
        // console.log(user.profilepic);
        // console.log(user);
        return (
            <div className="">
                {
                    this.props.loadingUser?<CircularProgress className={classes.circularProgress}/>:(
                        user && (
                        <Card className={classes.card}>
                            <CardMedia 
                                component="img"
                                alt="User Image"
                                src={user.profilepic}
                                className={classes.userImage}
                            />
                            <CardContent className={classes.content}>

                                <Typography className={classes.username}><Link to="follow" className={classes.link}>Follwers:</Link> {followerscount}</Typography>
                                <Typography className={classes.username}><Link to="follow" className={classes.link}>Following:</Link> {followingcount}</Typography>
                                <EditProifleImage/>
                                
                                <Typography className={classes.username}>{user.username}</Typography>
                                <div className={classes.bio}>
                                    <span>{user.bio}</span>
                                </div>
                                <EditProifleData/>

                            </CardContent>
                        </Card>
                        )
                    )
                }
            </div>
        )
    }
}

export default connect(
    (state)=>({
      user: state.user.user,
      loadingUser: state.ui.loadingUser,
      followerscount: state.user.followerscount,
      followingcount: state.user.followingcount
    })
  )(withStyles(styles, { withTheme: true })(UserDetails))

