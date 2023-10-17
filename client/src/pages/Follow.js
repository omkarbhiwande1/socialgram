import React, { Component } from 'react'
import {connect} from 'react-redux';
import FindPeople from '../components/FindPeople';
import DisplayFollowerData from '../components/DisplayFollowerData';
//Mui stuff
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: '10px'
    },
    postParent: {
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginRight: '10px',
        // border: '1px solid black'
    },
    userDetailParent: {
        // border: '1px solid black',
        marginRight: 'auto'
        
    }

});

class Follow extends Component {
    render() {

        return (
            <div>
                
                <Grid container spacing={0} className="flex-grow-1 p-10 d-flex">
                    <Grid item xs={12} md={4} className="ml-auto mr-auto follower-data mt-3">
                        <DisplayFollowerData/>
                        
                    </Grid>
                    <Grid item xs={12} md={4} className="mr-auto search-user mt-3">
                        <FindPeople/>
                    </Grid>
                </Grid>
               
            </div>
        )
    }
}

export default withStyles(styles,{withThem: true})(Follow)

