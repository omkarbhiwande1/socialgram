import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getFollowerData} from '../actions/userActions';
//Mui stuff 
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { blue, red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    detailsParent: {
        // minHeight: 400,
        // display: 'fixed',
        // border: '1px solid black',
        // width: '500px',
        height: '300px',
        marginBottom: '10px'
        // border: '1px solid black'
    },
    card: {
        position: 'relative',
        height: '500px'
    },
  
    searchParent: {
        display: 'flex',
        
    },
    content: {
        padding: '5px',
        // display: 'flex'
    },
    textField: {
        fontSize: '11'
    },
    circularProgress: {
        display: 'block',
        margin: '100px auto 0 auto'
    },
    submitButton: {
        color: blue[900],
        height: '40px',
        marginLeft: '5px',
        "&:hover": {
            backgroundColor: blue[100]
        }
    },
    text: {
        textAlign: 'center'
    },
    username:{
    
        textDecoration: 'none',
        color: blue[500],
        fontSize: '1em',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px'
    },
    userCard: {
        display: 'flex',
        // borderBottom: '1px solid black',
       
    },
    followButton: {
        marginLeft: 'auto',
        color: 'red',
    },
    link: {
        textDecoration: 'none',
        "&:active": {
            color: blue[500]
        },
        "&:visited": {
            color: blue[500]
        }
    },
    noMessage: {
        display: 'block',
        textAlign: 'center',
        margin: 'auto'
    },
    hrule: {
        width: '100%'
    },
    title: {
        display: 'block',
        // width: 'fit-content',
        padding: '20px',
    }
});

class DisplayFollowerData extends Component {
    state = {
        followdata: null
    }
    async componentDidMount(){
        try {
            const res = await axios.get("/followerdata");
            this.setState({
                followdata: res.data
            })
         
        } catch (error) {
            console.log(error);
        }
   
    }
    handleRefresh = async () =>{
        try {
            const res = await axios.get("/followerdata");
            this.setState({
                followdata: res.data
            })
         
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const {classes} = this.props;
        const {followdata} = this.state
        // console.log(followdata);
        return (
            <Fragment>
                <Button variant="outlined" onClick={this.handleRefresh}>Refresh</Button>

                <Card className={classes.detailsParent}>
                    <Typography className={classes.title}>Followers</Typography>
                    {
                        followdata && (
                        
                            followdata.followersdata.length == 0?(
                                <div className={classes.noMessage}>No followers</div>
                            ):(followdata.followersdata.map((user)=>{

                                return (
                                    <div key={user.userid}>

                                        <CardContent className={classes.userCard} >  
                                            <Avatar alt="Remy Sharp" src={user.profilepic} />
                                            <Typography className={classes.username}><Link style={{textDecoration: 'none'}} className="text-primary" to={`/user/${user.userid}`}>{user.username}</Link></Typography>
                                            
                                        </CardContent>
                                        <hr className={classes.hrule}/>
                                    </div>
                                )
                            })
                            )
                        )
                    }
                </Card>
                <Card className={classes.detailsParent}>
                    <Typography className={classes.title}>Following</Typography>
                    {
                        followdata && (
                            
                            followdata.followingdata.length == 0?(
                                <div className={classes.noMessage}>You have not followed anybody</div>
                                ):(followdata.followingdata.map((user)=>{
                                    
                                    return (
                                        <div key={user.userid}>

                                        <CardContent className={classes.userCard} >  
                                            <Avatar alt="Remy Sharp" src={user.profilepic} />
                                            <Typography className={classes.username}><Link style={{textDecoration: 'none'}} className="text-primary" to={`/user/${user.userid}`}>{user.username}</Link></Typography>
                                            
                                            
                                        </CardContent>
                                        <hr className={classes.hrule}/>
                                    </div>
                                )
                            })
                            )
                            )
                        }
                    
                </Card>
            </Fragment>
        )
    }
}

export default connect(
    ()=>({
     
    }),
    {
        getFollowerData
    }
  )(withStyles(styles, { withTheme: true })(DisplayFollowerData))

