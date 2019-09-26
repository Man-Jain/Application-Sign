const crypto = require('crypto');

const config = {
  mnemonic : "voice banner fancy margin manage multiply call grape crumble brief toss donor young tag arena gaze nasty page wisdom park antenna grocery icon absorb fat",
  token : "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1",
  server : "http://hackathon.algodev.network",
  port : 9100,
  serverkmd: 'http://127.0.0.1/',
  port2: 33381,
  token2: '536812ce52461a7649e26c9eb2cdb2dc97a0f5b19fbc8a1f264330f9d9c604fa'
};

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc',config.mnemonic);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc',config.mnemonic)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

export {config, encrypt, decrypt};
