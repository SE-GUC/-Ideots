const express = require('express');
const router = express.Router();

const Admin =require('../../models/Admin');

// Get all admins
router.get('/', async (req,res) => {
    try{
        const admins = await Admin.find();
        if(admins.length==0) res.status(404).send({error:'Admin was not found'});
        res.json({admins : admins});
    }catch(error) {
        res.json({error:error.message});
    } 
})

// Get a certain admin
router.get('/:id', async (req, res) => {
    try{
        const adminId = req.params.id;
        const admin =await Admin.findOne({_id:adminId});
        if(!admin) res.status(404).send({error:'Admin was not found'});
        res.json(admin);
    }catch(error) {
        res.json({error:error.message});
   } 
});


module.exports = router