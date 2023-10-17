import axios from "axios";

export const signup = (user, history) => async (dispatch, getState)=>{
    try{
        dispatch({type: 'IS_LOADING', payload: []})
        dispatch({type: 'CLEAR_ERRORS', payload: []})

        const res = await axios.post('/signup',user);

        const token = res.data.token;
        saveToken(token);

        dispatch(getUserData());
        
        history.push("/");
        
    }
    catch(err){
        // console.log("error is",err.response);
        let message = "Something went wrong"
        if(err.response.data && typeof err.response.data.message === 'string'){
            message = err.response.data.message;
        }
        dispatch({type: 'SET_ERRORS', payload: [message]})
        
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: []})

    }

    
}

export const login = (user, history) => async (dispatch, getState)=>{
    
    try{
        dispatch({type: 'IS_LOADING', payload: []})
        dispatch({type: 'CLEAR_ERRORS', payload: []})
        // await new Promise(resolve => setTimeout(resolve, 3000))
        const res = await axios.post('/login',user);
        // console.log(res.data);
        const token = res.data.token;
        saveToken(token);
        // console.log(token);
        // console.log(res.data);
        // const userData = {
        //     username: res.data.user.username,
        //     bio: res.data.user.bio,
        //     profilepic: res.data.user.profilepic,
        //     userid: res.data.user.userid
        // }
        dispatch(getUserData());
        
        history.push("/");
        
    }
    catch(err){
        // console.log("error is",err.response);
        // console.log(err.response.data);
        // console.log("error is",err);
        let message = "Something went wrong"
        if(err.response.data && typeof err.response.data.message === 'string'){
            message = err.response.data.message;
        }
        dispatch({type: 'SET_ERRORS', payload: [message]})
        
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: []})

    }
}

export const logout = (history) => (dispatch) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['authorization'];
    dispatch({type: 'LOGOUT_USER', payload: false});
}
export const getUserData = (history) => async (dispatch) => {
    try{
        const res = await axios.get('/user');
        // console.log(res.data);
        dispatch({'type':'LOGIN_USER','payload': res.data})
    }catch(err){
        console.log(err);
    }
}

export const updateUserImage = (newData) => async (dispatch) => {
    try{
        dispatch({type: 'LOADING_USER', payload: []})
        const res = await axios.post('/user/image/update',newData);
        // console.log(res.data);
        dispatch({'type':'USER_IMAGE_UPDATE','payload': res.data})
        dispatch({type: 'LOADING_USER_DONE', payload: []})
    }catch(err){
        console.log(err.response.data);
    }
}

export const updateUserData = (userData) => async (dispatch) => {
    try{
        const res = await axios.post('/user/data/update', userData);
        console.log(res);
        dispatch({'type':'USER_DATA_UPDATE','payload': userData})
    }catch(err){
        console.log(err);
    }
}

const saveToken = (token) =>{
    const finalToken = `Bearer ${token}`;
    // console.log('token');
    localStorage.setItem('token', finalToken);
    axios.defaults.headers.common['authorization'] = finalToken;
    // console.log(finalToken);
}
export const findUsers = (searchText)=> async (dispatch) =>{
    
    try{
        dispatch({type: 'IS_LOADING', payload: true})
        
        const res = await axios.post('/search',{searchText});
        // console.log("Users are",res.data);
        dispatch({type: 'SET_USERS', payload: res.data})
    }catch(err){
        console.log(err.response.data);
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: false})

    }
}

export const followUser = (id, searchText)=> async (dispatch, getState) =>{
    
    try{        
        const res = await axios.post(`/follow/${id}`);
        // console.log("Result is",res.data);
        // console.log(getState());
        dispatch({type: 'FOLLOWED_NEW_USER', payload: id});
        if(searchText!=='none'){

            dispatch(findUsers(searchText));
        }
        
    }catch(err){
        console.log(err.response.data);
    }
}
export const unfollowUser = (id)=> async (dispatch, getState) =>{
    
    try{        
        await axios.post(`/unfollow/${id}`);
        dispatch({type: 'UNFOLLOWED_USER', payload: id});
        
    }catch(err){
        console.log(err);
    }
}
export const getTempUserData = (id) => async (dispatch, get) => {
    try{
        
        dispatch({type: 'IS_LOADING', payload: true})
        const res = await axios.get(`/user/${id}`);
        // console.log(res.data);
        dispatch({'type':'SET_TEMP_USER','payload': res.data})
    }catch(err){
        console.log(err);
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: false})

    }
}
export const getFollowerData = () => async (dispatch) => {
    try{
        console.log("Here");
        const res = await axios.get(`/followerdata`);
        console.log(res.data);
    }catch(err){
        console.log(err);
    }
}

// export const addPost = (post) => (dispatch, getState) =>{
//     // console.log("state is",getState().post.post);
//     post.id=uuidv4();
//     let newPosts = [...getState().post.posts,post]
//     localStorage.setItem(POSTS_STORAGE,JSON.stringify(newPosts));
//     dispatch({type: 'ADD_POST', payload: newPosts});
// }