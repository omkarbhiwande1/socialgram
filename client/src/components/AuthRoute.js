import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
class AuthRoute extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            // console.log(this.props.isAuthenticated);
            return <Redirect to="/login"/>
        }
        else{
            // console.log(this.props.isAuthenticated);
            return <Route {...this.props} />
        }

    }
}

export default connect(
    (state)=>({
        isAuthenticated: state.user.isAuthenticated
    })
)(AuthRoute);
