const initialState={
    posts: [],
    likes: [],
    comments: []
}

export default function(state=initialState, action){
    let newPosts={}
    switch(action.type){
        case 'SET_POSTS_DATA':
            return {
                ...state,
                posts: action.payload.posts,
                likes: action.payload.likes
            }
        case 'DELETE_POST':
            newPosts = state.posts.filter((post)=>{
                return post.postid != action.payload
            });
            
            return {
                ...state,
                posts: newPosts
            }
        case 'ADD_NEW_POST':
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case 'LIKE_POST':
            newPosts = state.posts.map((post)=>{
                if(post.postid === action.payload){
                    return {
                        ...post,
                        likecount: post.likecount + 1
                    }
                }
                return post;
            });
            return {
                ...state,
                posts: newPosts
            }
        case 'UNLIKE_POST':
            newPosts = state.posts.map((post)=>{
                if(post.postid === action.payload){
                    return {
                        ...post,
                        likecount: post.likecount - 1
                    }
                }
                return post;
            });
            return {
                ...state,
                posts: newPosts
            }
        case 'SET_COMMENTS':
            
            return {
                ...state,
                comments: action.payload
            }
        case 'ADD_COMMENT':
            newPosts = state.posts.map((post)=>{
                if(post.postid === action.payload){
                    return {
                        ...post,
                        commentcount: post.commentcount + 1
                    }
                }
                return post;
            });
            return {
                ...state,
                posts: newPosts
            }
        default:
            return state
    }
}