import React, { Component, Fragment } from 'react'
import Post from './Post.js';
import {connect} from 'react-redux';
import {getPostData} from '../actions/postActions'

class Posts extends Component {
    componentDidMount(){
        this.props.getPostData();
    }
    render() {
        
        return (
            <div className="">
                {
                    this.props.posts.length === 0 ?(
                        <div style={{display: 'flex', height: '100%'}}>
                            <div style={{margin: 'auto'}}>

                                You have no new posts
                            </div>
                        </div>
                    )
                    :(
                        this.props.posts.map((post)=>{
                            return <Post post={post} key={post.postid}/>
                        })
                    )
                }
            </div>

        
        )
    }
}

export default connect(
    (state)=>({
        posts: state.posts.posts
    }),{
        getPostData
    }
)(Posts)
