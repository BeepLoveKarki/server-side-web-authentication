const User=require('../models/user');
const jwt=require('jwt-simple');
const config=require('../config');
const cryptojs=require('crypto-js');
const enc=require('../enc-dec');


function tokenit(user){
    const tstamp=new Date().getTime();
	return jwt.encode({sub:user["_id"],iat:tstamp},config.secret);
}

exports.signin=function(req,res,next){
  res.json({token:enc.encrypt(tokenit(req.user))});
}

exports.signup=function(req,res,next){
  enc.regain(req);
  let email=req.body.email;
  let password=req.body.password;
  if(!email || !password){
     res.status(422).send({error:'Please pass'});
  }else{
   User.findOne({email:email},(err,result)=>{
     if(err){
	 
	 }else{
	    if(result){
		   res.status(422).send({error:'Error finding'});
		}else{
		   let user=new User({
		     email:email,
			 password:password
		   });
		   user.save().then((doc)=>{
		      res.json({token: enc.encrypt(tokenit(doc))});
		   });
		}
	 }
   });
  }
}