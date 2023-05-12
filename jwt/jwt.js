const base64url = require('base64url')
const { log } = require('console')
const crypto = require('crypto')
const signatureFunction = crypto.createSign('RSA-SHA256')
const verifyFunction  = crypto.createVerify('RSA-SHA256')
const fs = require('fs')


/**
 * ISSUANCE
 */

const headerObj ={
    alg : 'RS256',
    typ : 'JWT'
}

const payloadObj = {
    sub :'1234567890',
    name :'John Doe',
    admin : true,
    iat : 1516239022
}

const headerObjString = JSON.stringify(headerObj)
const payloadObjString = JSON.stringify(payloadObj)

const base64urlheader = base64url(headerObjString)
const base64urlPayload = base64url(payloadObjString)

signatureFunction.write(base64urlheader + '.' +base64urlPayload)
signatureFunction.end()

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem' , 'utf-8')
const signatureBase64 = signatureFunction.sign(PRIV_KEY , 'base64')

const signatureBase64Url = base64url.fromBase64(signatureBase64)

console.log(signatureBase64Url);

