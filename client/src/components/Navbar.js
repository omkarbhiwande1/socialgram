import React, { Fragment } from 'react';
//Components and react stuff
import {connect} from 'react-redux';
import {logout} from '../actions/userActions';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import AddPost from './AddPost.js';





function ButtonAppBar({isAuthenticated, logout}) {
  const history = useHistory();
  const handleLogout = (e) =>{
    logout();
    history.push({pathname:'/login'});
  }
  return (
    <div >
      <nav className="d-flex flex-row navbar navbar-dark navbar">
        <Link className="navbar-brand" to="/">Socialgram</Link>
        {
          isAuthenticated?(
            <Fragment>
              <div  className="mr-auto ml-auto add-button-lg">
                <AddPost/>
              </div>
              <ul className="d-flex flex-row navbar-nav mr-2">
                  
                  
                  <li  className="nav-item ml-5 add-button-sm">
                    <AddPost/>
                  </li>
                  <li  className="nav-item ml-5">
                      <Link style={{fontSize: '1.3em'}} className="nav-link text-white" to="/follow">Find People</Link>
                  </li>
                  <li className="nav-item ml-4">
                      <a style={{fontSize: '1.3em', color: 'white', 'cursor': 'pointer'}} className="nav-link text-white text-lg" onClick={handleLogout}>Logout</a>
                  </li>
              </ul>
            </Fragment>
            ):(
              <ul className="d-flex flex-row navbar-nav ml-auto mr-2">
                  <li  className="nav-item">
                      <Link style={{fontSize: '1.3em'}} className="nav-link text-white" to="/signup">Signup</Link>
                  </li>
                  <li className="nav-item ml-4">
                      <Link style={{fontSize: '1.3em'}} className="nav-link text-white" to="/login">Login</Link>
                  </li>
              </ul>
            
          )
        }
          
      </nav>
  
    </div>
  );
}

export default connect(
  (state)=>({
    isAuthenticated: state.user.isAuthenticated,
    // username: state.user.user
  }),{
    logout
  }
)(ButtonAppBar);