const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require("bcryptjs");
// const { body, validationResult } = require('express-validator');


// router.post('/creatuser', (req, res) => {
//     User.create({
//         name : req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }).then(user => res.json(user));
//   });
  router.post("/creatuser", (req, res) => {
    const {name, email, password}= req.body
    User.findOne({email: email}, async (err, user)=>{
        // const salt = await bcrypt.genSalt(10);
        // let password = await bcrypt.hash(password, salt)
        if(user){
            res.send({message: "User Already Registered"})
        }
        else{
            const user= new User({
                name,
                email,
                password
            })
            //error checking
/////////////////////////////////////////////////////////

// Hash password before saving in database
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
        res.send({ message: "Successfully Registerd, Please login now.!" });
    });
  });





///////////////////////////////////////////////////////////////
            // user .save(err => {
            //     if(err){
            //         res.send(err)
            //     }
            //     else{
            //         res.send({ message: "Successfully Registerd, Please login now.!" })
            //     }
            // })
        }
    })
    
})
// router.post("/creatuser", 
// [body('email', 'email is not good').isEmail(),
// body('name', 'name is not good').isLength({ min: 1 }),
// body('password', 'Password not strong enough').isLength({ min: 1 })],
// async(req, res)=>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         await User.create({
//             name : req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             location: req.body.location
//         })

//         res.json({success:true});
//     } catch (error) {
//         console.log(error)
//         res.json({success:false});
//     }
// })

module.exports = router;