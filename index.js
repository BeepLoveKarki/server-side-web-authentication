const express=require('express');
const http=require('http');
const parser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const app= express();
const router=require('./router');


app.use(require('express-session')({
 secret: "hey you,yes you!",
 resave:true,
 saveUninitialized:true
}));


mongoose.connect("mongodb://localhost:27017/auth");

app.use(cors());
app.use(morgan('combined')); //only for development
app.use(parser.json({type:'*/*'}));
app.use(parser.urlencoded({extended:true}));
router(app);

const server=http.createServer(app);
const port=process.env.PORT||8080;
server.listen(port);