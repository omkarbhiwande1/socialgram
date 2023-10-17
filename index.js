const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const PORT = process.env.PORT || 4000
// const io = require('socket.io')(app, { origins: '*:*'})

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use(express.static(path.join(__dirname,"client/build")));
if(process.env.NODE_ENV === "production"){
    // app.use(expres.static("./client/buil"));
    app.use(express.static(path.join(__dirname,"client/build")));
}

app.use(postRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.get("*",(req,res)=>{
    res.redirect("/");
});

app.listen(PORT);


