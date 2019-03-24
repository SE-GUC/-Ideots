const express = require('express');
const router = express.Router();

const User =require('../../models/User');

router.get('/members/events/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user =await User.findOne({  _id:id,type:'member'} );
        if(!user) res.status(404).send({error:"there is no Member with this Id"});
        res.json(user.events);
    }catch(error) {
        res.json({error: error.message});
   } 
});

router.get('/members/tasks/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user =await User.findOne({_id:id,type:'member'});
        if(!user) res.status(404).send({error:"there is no Member with this Id"});
        res.json(user.tasks);
    }catch(error) {
        res.json({error: error.message});
   } 
});

router.get('/consultancy_agency/', async (req,res) => {
    try{
        const ConsaltancyAgency = await User.find({type:'consultancy_agency'});
        if(ConsaltancyAgency.length==0) res.status(404).send({error:"there is no ConsaltancyAgency"});
        res.json({consaltancyAgencies : ConsaltancyAgency});
    }catch(error) {
        res.json({error: error.message});
    } 
});

router.get('/partners/', async (req,res) => {
    try{
        const Partner = await User.find({type:'partner'});
        if(Partner.length==0) res.status(404).send({error:"there is no Partner"});
        res.json({Partner : Partner});  
    }catch(error) {
        res.json({error: error.message});
    } 
})

router.get('/partners/events/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user =await User.findOne({_id:id,type:'partner'});
        if(!user) res.status(404).send({error:"there is no Partner with this Id"});
        res.json(user.eventOrganized);
    }catch(error) {
        res.json({error: error.message});
   } 
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndRemove(id);
        if(user==null)  res.status(404).send({error:'User was not found'});
        res.json({msg:'User was deleted successfully', data: user});
    }catch(error){
        res.json({error: error.message});
    }
});

module.exports = router