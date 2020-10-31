const {response} = require("express");
const express = require("express")
const router = express.Router();
const {validateJWT} = require("../validate-token")
const User = require("../models/User");
const { generateJWT } = require("../jwt")

router.post("/", async (req, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "user does not exists"
            })
        }
        const correctPassword = await User.findOne({password:password});
        if(!correctPassword){
            return res.status(401).json({
                ok: false,
                msg: "password incorrecto"
            })
        }

        //generar JWT 
        const token = await generateJWT(user.id, user.email)
        res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "contact the administrator"
        })
    }


})

router.get("/renew", validateJWT, async (req, res = response) => {

    const uid = req.uid;
    const email = req.email;
    const token = await generateJWT(uid, email)
    res.json({
        ok: true,
        uid,
        email,
        token
    })
})

module.exports = router;