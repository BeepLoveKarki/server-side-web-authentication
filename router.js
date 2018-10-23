const Authentication=require('./controllers/authentication');
const passportService=require('./services/passport');
const passport=require('passport');
const enc=require('./enc-dec');
const requireAuth=passport.authenticate('jwt',{session:false});
const localAuth=passport.authenticate('local',{session:false});

module.exports=function(app){
  app.get('/',seeit,requireAuth,(req,res)=>{
     res.json(enc.encrypt(JSON.stringify({status:"OK"})));
  });
  app.post('/signin',doso,localAuth,Authentication.signin);
  app.post('/signup',Authentication.signup);
}

function doso(req,res,next){
    enc.regain(req);
	next();
}

function seeit(req,res,next){
    req.headers["authorization"]=enc.decrypt(req.headers["authorization"]);
	next();
}