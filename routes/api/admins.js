const express = require('express');
const bcrypt =require('bcryptjs');
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

// Create a admin
router.post('/', async (req, res) => {
    try{
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const salt =bcrypt.genSaltSync(10);
        const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
        const newAdmin =await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password: passAfterHashing,
            phone:req.body.phone
        });
        res.json({msg:'Admin was created successfully', data: newAdmin});
   }
   catch(error) {
        res.json({error:error.message});
   } 
});


module.exports = router