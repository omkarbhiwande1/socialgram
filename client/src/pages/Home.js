import React, { Component } from 'react'
import Posts from '../components/Posts';
import UserDetails from '../components/UserDetails';

class Home extends Component {

    render() {

        return (
            <div style={{height:"85vh"}} className="">
                
                <div className="pt-3 home-container">
                    
                    <div className="posts">
                        <p className="text-center mb-1d-block hden">Posts</p>
                        <Posts/>
                    </div>
                    <div className="userdetails">
                        <p className="text-center mb-1 hden">Profile</p>
                        <UserDetails/>
                    </div>
                </div>
                

                

                
 
            </div>
        )
    }
}

export default Home
