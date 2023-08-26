const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
router.post("/login", (req, res) => {
    const { email, password}= req.body
    User.findOne({ email:email}, (err,user) => {
        // if(user){
        //      if(password===user.password){
        //         // if(bcrypt.compare(password, user.password)){
        //         res.send({message: "Login Successfull", user:user})
        //      }
        //      else{
        //         res.send({message: "Password didn't match"})
        //      }
        // }
        // else{
        //     res.send({message: "User Not Found"})
        // }
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
          }
          bcrypt.compare(password, user.password).then(isMatch => {
            // if (isMatch) {
            //     res.send({message: "Login Successfull", user:user})
            // } else {
            //   return res
            //     .status(400)
            //     .json({ passwordincorrect: "Password incorrect" });
            // }
            ////////////////////////////////////////////////////
            if (isMatch) {
                // User matched
                // Create JWT Payload
                // res.send({message: "Login Successfull", user:user})
                const payload = {
                  id: user.id,
                  name: user.name
                };
        // Sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 1200 // 1 year in seconds
                  },
                  (err, token) => {
                    res.json({
                        message: "Login Successfull",
                      success: true,
                      email: user.email,
                      token: "Bearer " + token
                    });
                  }
                );
              } else {
                return res
                  .status(400)
                  .json({ passwordincorrect: "Password incorrect" });
              }

            ////////////////////////////////////////////////////////
          });
    })
})

module.exports = router;