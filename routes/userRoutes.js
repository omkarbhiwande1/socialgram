const {Router} = require('express');
const {followUser, updateUserData,getUserData, getCurrentUserData, updateUserImage, getUsers, unfollowUser, getFollowerData} = require('../controllers/userControllers');
const {auth} = require('../middleware/authMiddleware');
const route = Router();

route.post('/follow/:id',auth,followUser);
route.get('/followerdata',auth,getFollowerData);
route.post('/unfollow/:id',auth,unfollowUser);
route.post('/user/data/update',auth,updateUserData);
route.get('/user',auth,getCurrentUserData);
route.get('/user/:id',auth,getUserData);
route.post('/search',auth,getUsers);
route.post('/user/image/update',auth,updateUserImage);
module.exports = route;