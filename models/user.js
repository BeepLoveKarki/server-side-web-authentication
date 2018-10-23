const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


const userSchema=new mongoose.Schema({
  email:{type:String,unique:true,lowercase:true},
  password:String
});

userSchema.pre('save',function(next){
  if(this.isModified('password')){
     bcrypt.genSalt(10,(err,salt)=>{
	  if(err){
		   return next(err);
	   }else{
	    bcrypt.hash(this.password,salt,(err,hash)=>{
		  if(err){
		      return next(err);
		  }else{
			  this.password=hash;
		      next();
		  }
		});
	   }
	 });
  }
});

userSchema.methods.comparePassword=function(pwd,callback){
  bcrypt.compare(pwd,this.password,function(err,match){
     if(err){
	   callback(err,null);
	 }else{
	   callback(null,match);
	 }
  });
};


const ModelClass=mongoose.model('user',userSchema);

module.exports=ModelClass;