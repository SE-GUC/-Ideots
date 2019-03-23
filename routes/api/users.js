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

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const user =await User.findOne({_id:id});
        console.log(user);
        if(!user) res.status(404).send({error:"there is no User with this Id"});
        res.json(user);
    }catch(error) {
        res.json({error: error.message});
   } 
});

module.exports = router