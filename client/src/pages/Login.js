import React, { Component } from 'react'
//Components and react stuff
import {login} from '../actions/userActions'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//Material Ui stuff
import { Form, Button, Spinner } from 'react-bootstrap'


class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.login(this.state, this.props.history);
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
        // console.log(this.state.username);
    }
    render() {
        const {  errors, isAuthenticated, isLoading } = this.props;
        // console.log(errors);
        if(isAuthenticated){
            return <Redirect to="/"/>
        }
        else{

            return (
                <div style={{'height': '85vh'}} className="row ml-2 mr-2">
                    <div className="col-md-4 m-auto p-2">
                        {isLoading? <Spinner animation="border" className="d-block ml-auto mb-2"/>: null}
                        <div style={{fontSize: '1.3em', cursor: 'pointer'}} className="mb-2 text-secondary">Login Form</div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="d-flex mb-2">
                                <Form.Control type="text" placeholder="Username" name="username" onChange={this.handleChange} value={this.state.username} required/>
                            </Form.Group>
                            <Form.Group className="d-flex mb-2">
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="ml-0">
                                Submit
                            </Button>
                        </Form>
                        <div className="mt-2">
                            {errors.length!==0 && errors.map((error,index)=>{
                                // console.log(index);
                                return <p style={{backgroundColor: 'red', padding: '4px', color: 'white', width: 'fit-content', marginBottom: '4px', borderRadius: '5%', float: 'right'}} key={index}>{error}</p>
                            })}

                        </div>
                    </div>	
                </div>
            )
        }
    }
}

export default connect(
    (state)=>({
        errors: state.ui.errors,
        isLoading: state.ui.isLoading,
        isAuthenticated: state.user.isAuthenticated
    }),
    {
        login
    }
)(Login);

