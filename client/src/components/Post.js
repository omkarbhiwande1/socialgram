import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import DeletePost from './DeletePost';
import {connect} from 'react-redux';
import {likePost, unlikePost} from '../actions/postActions'
import Comments from './Comments';
import moment from 'moment';

import {Card, Button} from 'react-bootstrap';

class Post extends Component {
    handleLike = () =>{
      this.props.likePost(this.props.post.postid);
    }
    handleUnlike = () =>{
      this.props.unlikePost(this.props.post.postid);
    }
    render() {
        const { post , user} = this.props;
        const time = moment.unix(post.postedat).format("MMMM Do YYYY, HH:mm");
        console.log(user);
        // console.log(window.innerHeight);
        return (
          <div style={{ width: '100%' }} className="card-parent mb-2">
            <Card.Img style={{ width: '250px', height: '200px'}}  className="card-image" src={post.postimg} />
            <Card.Body className="card-content">
              <Card.Text>
                {post.content}
              </Card.Text>
              {post.likecount} 
              &nbsp;
              <span onClick={this.handleLike}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{color: 'blue', cursor: 'pointer'}} width="22" height="22" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.964.22.817.533 2.512.062 4.51a9.84 9.84 0 0 1 .443-.05c.713-.065 1.669-.072 2.516.21.518.173.994.68 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.162 3.162 0 0 1-.488.9c.054.153.076.313.076.465 0 .306-.089.626-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.826 4.826 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.616.849-.231 1.574-.786 2.132-1.41.56-.626.914-1.279 1.039-1.638.199-.575.356-1.54.428-2.59z"/>
                </svg>

              </span>
              &nbsp;&nbsp;&nbsp;
              <span onClick={this.handleUnlike}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{color: 'blue', cursor: 'pointer'}} width="22" height="22" fill="currentColor" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                  <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                </svg>

              </span>
              &nbsp;&nbsp;&nbsp;
              {post.commentcount} 
              &nbsp;
              <Comments postid={post.postid}/>
              <p className="text-secondary mt-1">{time}</p>

              <div>
                Posted By { user && (user.userid===post.userid?<span className="text-primary">{post.username}</span>:<Link to={`/user/${post.userid}`} style={{textDecoration: 'none'}} className="text-primary">{post.username}</Link>)}
              </div>
              {user && (user.userid===post.userid?<DeletePost postid={post.postid}/>:null)}
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </div>
          // <Card className={classes.card}>
          //   {
          //     user && (
          //     <Fragment>

          //       <CardMedia
          //         image={post.postimg}
          //         title="Post image"
          //         className={classes.image}
          //       />
          //       <CardContent className={classes.content}>
                
                  
          //         <Typography variant="body1">{post.content}</Typography>

          //         <div className={classes.likeIconParent}>
          //           {post.likecount} &nbsp; 
          //           <ThumbUpIcon className={classes.likeIcon} onClick={this.handleLike}/> &nbsp;&nbsp;&nbsp;&nbsp;
          //           <ThumbDownAltIcon className={classes.likeIcon} onClick={this.handleUnlike}/> &nbsp;&nbsp;&nbsp;&nbsp;
          //           {post.commentcount} &nbsp;
          //           <Comments postid={post.postid}/>
          //           {/* <InsertCommentIcon className={classes.commentIcon}/> */}
          //         </div>

          //         <br />
          //         {user.userid===post.userid?<DeletePost postid={post.postid}/>:null}

          //         <Typography variant="body2" color="textSecondary" className={classes.postedAt}>
                  
          //           {time}
                  
          //         </Typography>
                  
          //         <div className={classes.usernameParent}>
          //           Posted By { user.userid===post.userid?<span className={classes.username}>{post.username}</span>:<Link className={classes.username} to={`/user/${post.userid}`}>{post.username}</Link>}
          //         </div>

          //       </CardContent>
          //     </Fragment>
          //     )
          //   }
          // </Card>
        )
    }
}

export default connect(
  (state)=>({
    user: state.user.user
  }),
  {
    likePost,
    unlikePost
  }
)(Post)
