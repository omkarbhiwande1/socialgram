const pool = require('../db');
const formidable =require('formidable');
const admin = require('firebase-admin');
const os = require('os');
const fs = require('fs');
const path = require('path');
var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "socialgram-8f52c.appspot.com"
});

module.exports.followUser = async (req,res)=>{
    try{
        fid = req.params.id;
        id = req.body.id;

        text="select * from follows where isfollowing=$1 and isfollowed=$2"
        const result = await pool.query(text,[id,fid]);
        // console.log(result.rows);
        if(result.rows.length > 0){
            throw new Error("Already followed user");
        }

        text = "insert into follows(isfollowing,isfollowed) values($1,$2)";
        await pool.query(text,[id,fid]);

        res.status(200).send("Successfully followed user");

    }catch(err){
        res.status(500).json({error:err.message, properties: err});
    }
}

module.exports.unfollowUser = async (req,res)=>{
    try{
        fid = req.params.id;
        id = req.body.id;

        text="select * from follows where isfollowing=$1 and isfollowed=$2"
        const result = await pool.query(text,[id,fid]);
        // console.log(result.rows);
        if(result.rows.length == 0){
            throw new Error("You havent followed the user");
        }

        text = "delete from follows where isfollowing=$1 and isfollowed=$2";
        await pool.query(text,[id,fid]);

        res.status(200).send("Successfully followed user");

    }catch(err){
        res.status(500).json({error:err.message, properties: err});
    }
}

module.exports.updateUserData = async (req,res)=>{
    try{
        const {id, bio} = req.body;
        console.log(req.body);

        // const
        text = "update users set bio=$1 where userid=$2";
        result = await pool.query(text,[bio,id]);

        res.status(200).send("User updated successfully");

    }catch(err){
        res.status(500).json({error:err.message, properties: err});
    }
}

module.exports.updateUserImage = async (req,res)=>{
    try{

        const { id } = req.body;
        let text = "select profilepic from users where userid=$1";
        let result = await pool.query(text,[id]);
        const oldImageName = result.rows[0].profilepic.split('/o/')[1].split('?')[0];
        // console.log(oldImageName)
        if(oldImageName !== 'no-image.png' ){
            await admin.storage().bucket().file(oldImageName).delete();
        }

        var form = new formidable.IncomingForm();
        var files = await new Promise(function (resolve, reject) {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err);
                    return;
                }
                // console.log("within form.parse method, subject field of fields object is: " + fields.subjects);
                resolve(files);
            }); // form.parse
        });
        // console.log("here");
        var oldpath = files.profilepic.path;
        // console.log(oldpath);
        var extension = files.profilepic.name.split('.')[1]
        var newImageName=Math.round(Math.random()*10000000000).toString()+'.'+extension;
        var newpath = path.join(os.tmpdir(), newImageName);
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
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/socialgram-8f52c.appspot.com/o/${
            newImageName
        }?alt=media`;
        // console.log(imageUrl)
        text = "update users set profilepic=$1 where userid=$2";
        result = await pool.query(text,[imageUrl,id]);
        
        res.status(200).send(imageUrl);
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

// module.exports.uppdateUserImage = (req,res)=>{
//     const { id } = req.body;
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         // console.log(files)
//         var oldpath = files.profilepic.path;
//         var extension = files.profilepic.name.split('.')[1]
//         var newImageName=Math.round(Math.random()*10000000000).toString()+'.'+extension;
//         var newpath = path.join(os.tmpdir(), newImageName);
//         console.log(newpath);
//         fs.rename(oldpath, newpath, function (err) {
//             if (err) res.status(500).json({error: "Could not change profile picture", properties: err});
//             else{

//                 admin
//                 .storage()
//                 .bucket()
//                 .upload(newpath, {
//                     resumable: false,
//                     metadata: {
//                         metadata: {
//                             contentType: 'image/jpeg'
//                         }
//                     }
//                 })
//                 .then(() => {
//                     console.log("image uploaded successfully");
//                     const imageUrl = `https://firebasestorage.googleapis.com/v0/b/socialgram-8f52c.appspot.com/o/${
//                         newImageName
//                     }?alt=media`;
//                     // console.log(imageUrl)
//                     let text = "update users set profilepic=$1 where userid=$2";
//                     pool.query(text,[imageUrl,id], (err, result) => {
//                         if (err) {
//                             // console.log("image uploaded successfully");
//                             res.status(500).json({error: "Could not change profile picture", properties: err})
//                         }
//                         // console.log("image uploaded successfully");
//                         res.status(200).json({imageUrl})
//                     })
                    
                    
//                 })
//                 .catch((err)=>{
//                     res.status(500).json({error: "Could not change profile picture", properties: err})
//                 })
//             }

//       });
//     });
// }

module.exports.getCurrentUserData = async (req,res)=>{
    try{
        id = req.body.id;
        let data = {}
        text = "select userid,username,profilepic,bio from users where userid=$1";
        let result = await pool.query(text,[id]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        data.user = result.rows[0];

        text = "select follows.isfollowing , users.username, users.profilepic from follows inner join users on follows.isfollowing=users.userid where isfollowed=$1";
        result = await pool.query(text,[id]);
        data.followers = []
        for(let i of result.rows){
            data.followers.push(i["isfollowing"]);
        }
        data.followerscount = data.followers.length;

        text = "select follows.isfollowed, users.username,users.profilepic from follows inner join users on follows.isfollowed=users.userid where isfollowing=$1";
        result = await pool.query(text,[id]);
        data.following = []
        for(let i of result.rows){
            data.following.push(i["isfollowed"]);
        }
        data.followingcount = data.following.length;
        // console.log(data);
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message, properties: err});
    }
}
module.exports.getUserData = async (req,res)=>{
    try{
        uid = req.params.id;
        let data = {}
        text = "select userid,username,profilepic,bio from users where userid=$1";
        let result = await pool.query(text,[uid]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        data.user = result.rows[0];

        text = "select isfollowing from follows where isfollowed=$1";
        result = await pool.query(text,[uid]);
        data.isfollowed = []
        for(let i of result.rows){
            data.isfollowed.push(i["isfollowing"]);
        }
        data.followerscount = data.isfollowed.length;

        text = "select isfollowed from follows where isfollowing=$1";
        result = await pool.query(text,[uid]);
        data.isfollowing = []
        for(let i of result.rows){
            data.isfollowing.push(i["isfollowed"]);
        }
        data.followingcount = data.isfollowing.length;
        // console.log(data);
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({error:err.message, properties: err});
    }
}

module.exports.getUsers = async (req,res)=>{
    try{
        let searchText = req.body.searchText;
        searchText = searchText.toLowerCase();
        let users = [];

        searchText = '%'+searchText+'%' 
        // console.log(req.body);
        text = "select userid,username,profilepic from users where username like $1 and userid<>$2";
        const result = await pool.query(text,[searchText,req.body.id]);
        // console.log(result.rows);
        for(let i of result.rows){
            users.push(i);
        }

        res.status(200).json(users);

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message, properties: err});
    }
}
module.exports.getFollowerData = async (req,res)=>{
    try{
        id = req.body.id;
        let data = {}


        text = "select follows.isfollowing as userid, users.username, users.profilepic from follows inner join users on follows.isfollowing=users.userid where isfollowed=$1";
        result = await pool.query(text,[id]);
        data.followersdata = []
        for(let i of result.rows){
            data.followersdata.push(i);
        }
        // data.followerscount = data.followers.length;

        text = "select follows.isfollowed as userid, users.username,users.profilepic from follows inner join users on follows.isfollowed=users.userid where isfollowing=$1";
        result = await pool.query(text,[id]);
        data.followingdata = []
        for(let i of result.rows){
            data.followingdata.push(i);
        }
        // data.followingcount = data.following.length;
        // console.log(data);
        res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message, properties: err});
    }
}