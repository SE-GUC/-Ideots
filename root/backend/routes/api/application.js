// Dependencies
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const router = express.Router();

const notificationController=require('../../controllers/notificationController');
const taskController=require('../../controllers/taskController');


// Models
const Application = require('../../models/Application');


//Get all applications
router.get('/',async(req,res)=>{
    try{
    const applications=await Application.find().populate('applicantId').populate('taskId');
    console.log(applications);
    res.json({data:applications});
    }catch(error){
        res.json({error:error.message});
    }
})

//Get a specific application

router.get('/:id',async(req,res)=>{
    try{
        const applicationId=req.params.id;
        const application=await Application.findById(applicationId).populate('applicantId').populate('taskId');
        if(!application) // send bad req
            return res.status(400).send({error: "Application does not exist"});
        return res.json({data:application});
    }catch(error){
        res.json({error:error.message});
    }

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
     
        const newApplication=await Application.create(req.body);
       
       const taskId=req.body.taskId
        const task=await taskController.getOneTask(taskId);
        recieverId=task.partnerID

        body={           
               "content": "New applicant applied on task",
               "recieverId": recieverId,
               "notifierId": taskId
           }        
       await notificationController.postNotification(body);

        
        return res.json({msg:'Application was created successfully',data:newApplication });
    }
    catch(error){
        res.json({error:error.message});
    }
})

router.put('/:id',async (req, res) => {
   try{
    
       const applicationId = req.params.id;  
       const application = Application.findById(applicationId);
       if(!application) //send bad req
         return res.status(400).send({error:'Application does not exist'});
       
       const schema={
            date:Joi.date(),
            acceptance:Joi.any().valid([-1,0,1])
        }
        
        const result = Joi.validate(req.body, schema);
        if (result.error) 
          return res.status(400).send({ error: result.error.details[0].message });
        const updatedApplication=await Application.updateOne({"_id":applicationId},req.body);
        res.json({msg:'Application was updated successfully',data : updatedApplication});
    }
    catch(error){
        res.json({error:error.message});
    }
    
});
 router.delete('/:id', async (req,res) => {
    try {
        const  applicationId = req.params.id;  
        const application = Application.findById(applicationId);
        if(!application)// send bad req
          return res.status(400).send({error:'Application does not exist'});
        const deletedApplication = await Application.findByIdAndRemove(applicationId)
        res.json({msg:'Neview was deleted successfully', data: deletedApplication})
    }
    catch(error) {
        res.json({error:error.message});
    }  
})


module.exports = router;