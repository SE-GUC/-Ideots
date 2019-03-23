// Dependencies
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Models
const Application = require('../../models/Application');
const User = require('../../models/User');
const Task = require('../../models/Task');



// Get all application

router.get('/',async(req,res)=>{
    const applications=await Application.find();
    res.json({data:applications});


})

//Get a specific application

router.get('/:id',async(req,res)=>{
    const applicationId=req.params.id;
    const application=await Application.findById(applicationId);
    if(!application) 
        return res.status(404).send({error: "Application does not exist"});
    return res.json({application});


})


// Create a new application
router.post('/',async(req,res)=>{
    try{
        const schema = {
            applicantId:  Joi.objectId().required(), 
            taskId:  Joi.objectId().required(), 
            date:Joi.date()
        }
        
        const result = Joi.validate(req.body, schema);
        
        if (result.error) {
            return res.status(400).send({ error: result.error.details[0].message });
        }
        const applicant = User.findOne({applicantId});
        const task = Task.findOne({taskId});
         if(!applicant)
           return res.status(404).send({error:'Applicant does not exist'}); 
         if(!task)
           return res.status(404).send({error:'Task does not exist'}); 
    
        const newApplication=await Application.create(req.body);
        return res.json({msg:'Application was created successfully',data:newApplication });
    }
    catch(error){
        console.log(error)
    }
})

router.put('/:id',async (req, res) => {
   try{

       const applicationId = req.params.id;  
       const application = Application.findOne({applicationId});
       if(!application)
         return res.status(404).send({error:'Application does not exist'});
       
    //    const taskId = req.body.taskId;
       const schema={
           acceptence:Joi.any().valid([-1,0,1])
        }
        
        const result = Joi.validate(req.body, schema);
        if (result.error) 
          return res.status(400).send({ error: result.error.details[0].message });
        const updatedApplication=await Application.updateOne({"_id":applicationId},req.body);
        res.json({data : updatedApplication});
    }
    catch(error){
        // will be handled
        console.log(error)
    }
    
});
 router.delete('/:id', async (req,res) => {
    try {
        const  applicationId = req.params.id;  
        const application = Application.findOne({applicationId});
        if(!application)
          return res.status(404).send({error:'Application does not exist'});
        const deletedApplication = await Application.findByIdAndRemove(applicationId)
        res.json({msg:'Neview was deleted successfully', data: deletedApplication})
    }
    catch(error) {
        //error will be handled later
        console.log(error)
    }  
})


module.exports = router;