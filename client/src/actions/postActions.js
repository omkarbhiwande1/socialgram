import axios from "axios"

export const getPostData = () => async (dispatch) => {
    try{
        const res = await axios.get('/posts');
        // console.log(res.data);
        dispatch({type: 'SET_POSTS_DATA',payload: res.data});

    }catch(err){
        // dispatch({type: 'IS_NOT_LOADING', payload: []})
        // console.log(err.response.data);
        let errors = []
        // errors.push('Error while logging in');
        console.log(err);
        dispatch({type: 'SET_ERRORS', payload: errors});
    }
}

export const deletePost = (postid) => async (dispatch) =>{
    console.log(postid);
    try{
        dispatch({type: 'LOADING_POSTS', payload: false})
        await axios.post(`/post/${postid}/delete`);
        dispatch({type: 'DELETE_POST', payload: postid});
    }catch(err){
        console.log(err.error,err.properties);
    }finally{
        dispatch({type: 'FINISH_LOADING_POSTS', payload: false})
    }
}

export const addPost = (post) => async (dispatch) =>{
    try{
        dispatch({type: 'LOADING_POSTS', payload: false})
        // console.log(post);
        const res = await axios.post(`/post`,post);
        // console.log(res.data);
        dispatch({type: 'ADD_NEW_POST', payload: res.data});
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({type: 'FINISH_LOADING_POSTS', payload: false})
    }
}

export const likePost = (id) => async (dispatch) =>{
    try{
        console.log(id);
        await axios.post(`/post/${id}/like`);
        dispatch({type: 'LIKE_POST', payload: id});
    }catch(err){
        console.log(err.error);
    }
}

export const unlikePost = (id) => async (dispatch) =>{
    try{
        console.log(id);
        await axios.post(`/post/${id}/unlike`);
        dispatch({type: 'UNLIKE_POST', payload: id});
    }catch(err){
        console.log(err.error);
    }
}

export const getComments = (id) => async (dispatch) =>{
    try{
        // console.log(id);
        // console.log('Hello2');
        dispatch({type: 'IS_LOADING', payload: true});
        const res = await axios.get(`/post/${id}/comments`);
        dispatch({type: 'SET_COMMENTS', payload: res.data});
        dispatch({type: 'IS_NOT_LOADING', payload: false});
    }catch(err){
        console.log(err.error);
    }
}
export const addComment = (id,comment) => async (dispatch) =>{
    try{
        await axios.post(`/post/${id}/comment`,{comment});
        dispatch({type:'ADD_COMMENT', payload: id})
        dispatch(getComments(id))
        
    }catch(err){
        console.log(err.error);
    }
}