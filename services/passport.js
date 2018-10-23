const passport=require('passport');
const User=require('../models/user');
const config=require('../config');
const {Strategy,ExtractJwt}=require('passport-jwt');
const LocalStrategy=require('passport-local');


const localOptions={
   usernameField:'email'   
};

const localLogin=new LocalStrategy(localOptions,function(email,password,done){
  User.findOne({email:email},function(err,user){
    if(err){
	   done(err,false);
	}else{
	   if(!user){
	     done(null,false);
	   }else{
	     user.comparePassword(password,function(err,isit){
		   if(err){
		     done(err,false);
		   }else{
		      if(isit){
			     done(null,user);
			  }else{
			     done(null,false);
			  }
		   }
		 });
	   }
	}
  });
});

const jwtOptions={
  jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey:config.secret
};


const jwtLogin=new Strategy(jwtOptions,function(payload,done){
 User.findById(payload.sub,function(err,user){
    if(err){
	  done(err,false);
	}else{
	  if(user){
	    done(null,true);
	  }else{
	    done(null,false);
	  }
	}
 });
});

passport.use(jwtLogin);
passport.use(localLogin);