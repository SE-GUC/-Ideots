const express = require('express');
const bcrypt =require('bcryptjs');
const router = express.Router();
const jwt = require ('jsonwebtoken')
const User =require('../../models/User');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const tokenKey = "verysecretkey";
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey;


router.post('/',async (req,res1)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:"wrong email"});
   await bcrypt.compare(req.body.password, user.password, function(err, res) {
        if(res) {
         // Passwords match
         jwt.sign({user},'verysecretkey',(err,token)=>{
            res1.json({
                token
            })
        }); 
       //  msg={msg:'welcome'}
        } else {
         // Passwords don't match
         res1.send({msg:"wrong password"})
        } 
      }); 
    
})


router.get('/tryget',verifyToken,async(req,res)=>{
    const user=await(jwt.decode(req.token, 'verysecretkey'))
    console.log(user.user._id)
    jwt.verify(req.token,'verysecretkey',async (err,data)=>{
        if (err){
            res.sendStatus(403)
        }else{
            const notifications=await Notification.find({'recieverId':user.user._id});
           return res.json({data:notifications});
            
        }
    }
    
    )


})

function verifyToken (req,res,next){
    const bearerHeader =req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token =bearer[1];
        req.token=token;
        next();
    }
    else{
        res.send(err)
    }
   
}


module.exports = router

