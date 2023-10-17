const initialState={
    user: null,
    isAuthenticated: false,
    search: null,
    followers: null,
    following: null,
    followerscount: null,
    followingcount: null,
    tempUser: null,
    userid: null
}

export default function(state=initialState, action){
    switch(action.type){
        case 'LOGIN_USER':
            // console.log("inside reducer");
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                following: action.payload.following,
                followers: action.payload.followers,
                followerscount: action.payload.followerscount,
                followingcount: action.payload.followingcount,
                userid: action.payload.user.userid
            }
        case 'LOGOUT_USER':
            return {
                user: {},
                isAuthenticated: false
            }
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: true
            }
        case 'USER_DATA_UPDATE':
            return {
                ...state,
                user: {
                    ...state.user,
                    bio: action.payload.bio
                }
            }
        case 'USER_IMAGE_UPDATE':
            return {
                ...state,
                user: {
                    ...state.user,
                    profilepic: action.payload
                }
            }
        case 'SET_USERS':
            return {
                ...state,
                search: action.payload
            }
        case 'FOLLOWED_NEW_USER':
            return{
                ...state,
                following: [
                    ...state.following,
                    action.payload
                ],
                followingcount: state.followingcount + 1
            }
        case 'UNFOLLOWED_USER':
            // console.log("reducer",action.payload);
            let newFollowing = state.following.filter((id)=>{
                return id!==action.payload
            })
            return{
                ...state,
                following: newFollowing,
                followingcount: state.followingcount - 1
            }
        case 'SET_TEMP_USER':
            return{
                ...state,
                tempUser: action.payload
            }
        default:
            return state
    }
}
