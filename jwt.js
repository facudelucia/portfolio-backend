const jwt = require("jsonwebtoken")

const generateJWT = (uid, email) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, email}
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: "2h"
        }, (err, token) => {
            if(err){
                console.log(err);
                reject("no se pudo generar el token")
            }
            resolve(token)
        })
    })
}


module.exports = {
    generateJWT
}