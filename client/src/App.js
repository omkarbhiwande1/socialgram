import Navbar from './components/Navbar.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Follow from './pages/Follow.js';
import Home from './pages/Home.js';
import Chat from './pages/Chat.js';
import User from './pages/User';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import {logout, getUserData} from './actions/userActions';
import Demo from './pages/Demo.js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthRoute from './components/AuthRoute';
import "./styles/global.css"

const token = localStorage.token;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = '/login';
  } else {
    // console.log("In main app");
    store.dispatch({type: 'SET_AUTHENTICATED', payload: true});
    axios.defaults.headers.common['authorization'] = token;
    
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Navbar/>
          <Switch>
            <AuthRoute exact path='/' component={Home}/>
            <AuthRoute path='/follow' component={Follow}/>
            <AuthRoute path='/user/:id' component={User}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <Route path='/demo' component={Demo}/>
            <Route path='/chat/:id' component={Chat}/>
          </Switch>
      </BrowserRouter>
    </Provider>

  

  );
}

export default App;
