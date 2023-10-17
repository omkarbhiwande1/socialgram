import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {findUsers, followUser} from '../actions/userActions';
//Mui stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    detailsParent: {
        // minHeight: 400,
        display: 'fixed',
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
        borderBottom: '1px solid black'
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
    }

});

class FindPeople extends Component {
    state = {
        searchText: '',
        users: null
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.findUsers(this.state.searchText);
        this.setState();

    }
    handleFollow=(id)=>{
        this.props.followUser(id,this.state.searchText);
        
    }
    render() {
        const {classes, isLoading, search,followers, following} = this.props;
        // console.log("follow data",followers);
        return (
            <div className={classes.detailsParent}>
                <Card className={classes.card}>
                            
                    <CardContent className={classes.content}>
                        <form onSubmit={this.handleSubmit}>
                            <div className={classes.searchParent}>
                                <TextField
                                    name="searchText"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    className={classes.textField}
                                    value={this.state.searchText}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <Button variant="outlined" type="submit" className={classes.submitButton}>Search</Button>

                            </div>
                            
                        </form>
                        <hr/>
                        {
                            isLoading?<CircularProgress className={classes.circularProgress}/>:(
                                !search?(
                                    <Typography variant="body1" className={classes.text}>
                                        Search  for users above
                                    </Typography>
                                ):(
                                    <div>

                                        {
                                            search.map((user)=>{
                                                return (
                                                    <CardContent className={classes.userCard} key={user.userid}>  
                                                        <Avatar alt="Remy Sharp" src={user.profilepic} />
                                                        <Typography className={classes.username}><Link style={{textDecoration: 'none'}} className="text-primary" to={`/user/${user.userid}`}>{user.username}</Link></Typography>
                                                        {
                                                            (following.indexOf(user.userid) !== -1)? (
                                                                <Button variant="outlined" className={classes.followButton}>Following</Button>

                                                            ):(

                                                                <Button variant="outlined" className={classes.followButton} onClick={()=>this.handleFollow(user.userid)}>Follow</Button>
                                                            )
                                                        }
                                                        
                                                    </CardContent>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            ) 
                        }

                    </CardContent>
                </Card>
                    
                
            </div>
        )
    }
}

export default connect(
    (state)=>({
        isLoading: state.ui.isLoading,
        search: state.user.search,
        following: state.user.following,
        followers: state.user.followers
    }),
    {
        findUsers,
        followUser
    }
  )(withStyles(styles, { withTheme: true })(FindPeople))

