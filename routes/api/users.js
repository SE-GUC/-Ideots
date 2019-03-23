const express = require('express');
const bcrypt =require('bcryptjs');
const router = express.Router();

const User =require('../../models/User');

// Get all users
router.get('/', async (req,res) => {
    try{
        const user = await User.find();
        if(user.length==0) res.status(404).send({error:"there is no user"});
        res.json({Users : user});   
    }catch{
        res.json({error:error.message});
    }
})

// Get all members 
router.get('/members/', async (req,res) => {
    try{
        const Member = await User.find({type:'member'});
        if(Member.length==0) res.status(404).send({error:"there is no Member"});
        res.json({Members : Member});
    }catch{
        res.json({error:error.message});
    }
})

module.exports = router