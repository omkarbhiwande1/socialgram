const {Router} = require('express');
const {getPosts, createPost, likePost, unlikePost, commentPost, deletePost, getComments} = require('../controllers/postControllers');
const {auth} = require('../middleware/authMiddleware');
const route = Router();

route.get('/posts',auth,getPosts)
route.post('/post',auth,createPost)
route.post('/post/:id/delete',auth,deletePost)
route.post('/post/:id/like',auth,likePost)
route.post('/post/:id/unlike',auth,unlikePost)
route.post('/post/:id/comment',auth,commentPost)
route.get('/post/:id/comments',auth,getComments)
module.exports = route;