const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const { sign } = require('crypto')

const PUB_KEY = fs.readFileSync(__dirname + "/pub_key.pem" ,'utf-8')
const PRIV_KEY = fs.readFileSync(__dirname + "/priv_key.pem" ,'utf-8')

const payload ={
    sub : '1234567890',
     name : 'John Doe',
    admin : true,
    iat : 1516239022
}

const signJwt = jsonwebtoken.sign(payload , PRIV_KEY ,{algorithm : 'RS256'})

console.log(signJwt);

jsonwebtoken.verify(signJwt , PUB_KEY ,{algorithm :['RS256']}, (err , payload)=>{})

