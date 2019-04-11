const express = require('express');
const bcrypt =require('bcryptjs');
const router = express.Router();

const Admin =require('../../models/Admin');
const validator =require('../../validations/adminValidations');

// Get all admins
router.get("/",async (req, res) =>{
    const admins = await Admin.find()
    res.json({ data: admins })
});

// Get a certain admin
router.get('/:id', async (req, res) => {
    try{
        const adminId = req.params.id;
        const admin =await Admin.findOne({"_id":adminId});
        // send status of bad request 400
        if(!admin) res.status(400).send({error:'Admin was not found'});
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

// Update a admin info
router.put('/:id', async (req, res) => {
    try {
            const id = req.params.id;
            const admin = await Admin.findOne({_id:id});
            // bad request
            if(!admin) res.status(400).send({error:'Admin was not found'});
            const isValidated = validator.updateValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const name =req.body.name;
            const email =req.body.email;
            const password =req.body.password;
            const phone =req.body.phone;

            if(name)await Admin.updateOne({_id:id},{$set:{name:name}});
            if(email)await Admin.updateOne({_id:id},{$set:{email:email}});
            if(password)await Admin.updateOne({_id:id},{$set:{password:password}});
            if(phone)await Admin.updateOne({_id:id},{$set:{phone:phone}});
            res.json({msg: 'Admin was updated successfully'});
       }
            catch(error) {
            res.json({msg:error.message});
       } 
});

// Delete a admin
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedAdmin = await Admin.deleteOne({"_id":id});
        if(!deletedAdmin) res.status(400).send({error:'Admin was not found'});
        res.json({msg:'Admin was deleted successfully', data: deletedAdmin});
    }catch(error) {
        res.json({error:error.message});
   }
});

module.exports = router