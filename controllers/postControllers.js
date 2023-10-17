const pool = require('../db');
const formidable =require('formidable');
const admin = require('firebase-admin');
const os = require('os');
const fs = require('fs');
const path = require('path');
var serviceAccount = require("../serviceAccount.json");
module.exports.getPosts = async (req,res)=>{
    try{
        // console.log(req.headers);
        const {id} = req.body;
        // console.log(id);
        
        let result = null;
        text = "select isfollowed from follows where isfollowing=$1"
        result = await pool.query(text,[id]);
        let following = `${id}`
        for(let i of result.rows){
            following=following+","+i['isfollowed'].toString();
        }
        // following = following.slice(0,-1);
        // console.log(following);
        const postData={};
        posts = []
        text = "select posts.*,users.username from posts inner join users on posts.userid=users.userid where posts.userid in ("+following+") order by postedat desc";
        result = await pool.query(text);
        let poststring="-1";
        for(let i of result.rows){
            poststring+=","+i['postid'];
            posts.push(i);
        }
        postData.posts = posts;
        // console.log(poststring)

        text = "select postid from likes where postid in ("+poststring+");"
        result = await pool.query(text);
        let likes = []
        for(let i of result.rows){
            likes.push(i['postid']);
        }
        // console.log(likes);
        postData.likes = likes;
        // console.log(postData);
        res.status(200).json(postData);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Error while loading posts", properties: err});
    }
}
module.exports.createPost = async (req,res)=>{
    try{
        const {id} = req.body;
        // console.log(req.body);
        let text = null;
        
        //Taking form data and uploading image
        var form = new formidable.IncomingForm();
        var formData = await new Promise(function (resolve, reject) {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err);
                    return;
                }
                // console.log(files,fields);
                temp = {}
                temp.content = fields.content;
                temp.time = fields.time;
                temp.postimg = {
                    path : files.postimg.path,
                    name : files.postimg.name
                }
                // console.log("within form.parse method, subject field of fields object is: " + fields.subjects);
                resolve(temp);
            }); // form.parse
        });
        const content = formData.content;
        const time = formData.time;
        // console.log(time);
        // console.log(formData);
        
        var oldpath = formData.postimg.path;
        var extension = formData.postimg.name.split('.')[1]
        var newImageName=Math.round(Math.random()*10000000000).toString()+'.'+extension;
        var newpath = path.join(os.tmpdir(), newImageName);
        // console.log(oldpath,extension,newImageName)
        await fs.promises.rename(oldpath, newpath);
        await admin.storage().bucket().upload(newpath, {
            resumable: false,
            gzip: true,
            metadata: {
                metadata: {
                    contentType: 'image/jpeg'
                }
            }
        })
        
        // console.log('here');
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/socialgram-8f52c.appspot.com/o/${
            newImageName
        }?alt=media`;
        // console.log("here");
        //Inserting rest of the feilds in the posts table
        text = "insert into posts(content,userid,likecount,commentcount,postimg,postedat) values($1,$2,$3,$4,$5,$6) RETURNING posts.*";
        let result = await pool.query(text,[content,id,0,0,imageUrl,time]);
        let post = result.rows[0];

        text = "select username from users where userid=$1";
        result = await pool.query(text,[post.userid]);

        post.username = result.rows[0].username;

        res.status(200).send(post);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Error while creating post", properties: err});
    }
}
module.exports.likePost = async (req,res)=>{
    try{
        const {id} = req.body;
        let result = null;
        
        text = "select * from likes where postid=$1 and userid=$2";
        result = await pool.query(text,[req.params.id,id]);
        if(result.rows.length!==0){
            throw new Error('Post already liked');
        }

        text = "insert into likes(postid,userid) values($1,$2)";
        result = await pool.query(text,[req.params.id,id]);

        text = "update posts set likecount=likecount+1 where postid=$1";
        result = await pool.query(text,[req.params.id]);

        res.status(200).send("Post liked successfully");
    }catch(err){
        message = "Error while liking post";
        if(err.message == "Post already liked"){
            message = "Post already liked";
        }
        res.status(500).json({error: message, properties: err});
    }
}
module.exports.unlikePost = async (req,res)=>{
    try{
        const {id} = req.body;
        let result = null;
        
        text = "select * from likes where postid=$1 and userid=$2";
        result = await pool.query(text,[req.params.id,id]);
        if(result.rows.length===0){
            throw new Error('Post has not been liked');
        }

        text = "delete from likes where postid=$1 and userid=$2";
        result = await pool.query(text,[req.params.id,id]);

        text = "update posts set likecount=likecount-1 where postid=$1";
        result = await pool.query(text,[req.params.id]);

        res.status(200).send("Post unliked successfully");
    }catch(err){
        message = "Error while unliking post";
        if(err.message == 'Post has not been liked'){
            message = 'Post has not been liked';
        }
        res.status(500).json({error: message, properties: err});
    }
}
module.exports.commentPost = async (req,res)=>{
    try{
        const {comment,id} = req.body;
        let result = null;
        
    
        text = "insert into comments(comment,postid,userid) values($1,$2,$3)";
        result = await pool.query(text,[comment,req.params.id,id]);

        text = "update posts set commentcount=commentcount+1 where postid=$1";
        result = await pool.query(text,[req.params.id]);

        res.status(200).send("Comment added successfully successfully");
    }catch(err){
        message = "Error while adding comment";
        if(err.message == "Post already liked"){
            message = "Post already liked";
        }
        res.status(500).json({error: message, properties: err});
    }
}

module.exports.deletePost = async (req,res)=>{
    try{
        console.log("Trying to delete post");
        let text = null;
        let result = null;
        const {id} = req.body;
        const postid = req.params.id;

        text = "select userid,postimg from posts where postid=$1";
        result = await pool.query(text,[postid]);
        if(result.rows.length === 0){
            throw new Error("Post does not exist");
        }
        const userid = result.rows[0].userid;
        let imageName = result.rows[0].postimg;
        // console.log(userid);
        if(id !== userid){
            throw new Error("You are not authorized to delete the post");
        }

        if(imageName !== null){
            imageName = imageName.split('/o/')[1].split('?')[0]
            await admin.storage().bucket().file(imageName).delete();
        }

        text = "delete from likes where postid=$1";
        result = await pool.query(text,[postid]);

        text = "delete from comments where postid=$1";
        result = await pool.query(text,[postid]);

        text = "delete from posts where postid=$1";
        result = await pool.query(text,[postid]);

        res.status(200).send("post deleted successfully");
    }catch(err){
        console.log(err);
        res.status(500).send({error: err.message, properties: err});
    }
}

module.exports.getComments = async (req,res)=>{
    try{
        
        let text = null;
        let result = null;
        const postid = req.params.id;

        text = "select comments.commentid,comments.comment,users.username from comments inner join users on comments.userid=users.userid where comments.postid=$1";
        result = await pool.query(text,[postid]);
        let comments = []
        for(let i of result.rows){
            comments.push(i);
        }
        res.status(200).send(comments);
    }catch(err){
        console.log(err);
        res.status(500).send({error: err.message, properties: err});
    }
}