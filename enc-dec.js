const config=require('./config');
const cryptojs=require('crypto-js');

function encrypt(value){
   return cryptojs.AES.encrypt(value,config.dsecret).toString();
}

function decrypt(value){
  return cryptojs.AES.decrypt(value,config.dsecret).toString(cryptojs.enc.Utf8);
}

function regain(req){
    req.body=JSON.parse(decrypt(req.body.data));
}

module.exports={
  encrypt:encrypt,
  decrypt:decrypt,
  regain:regain
}
