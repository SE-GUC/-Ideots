// Dependencies
const express = require('express');
const Joi = require('joi');
const router = express.Router();
Joi.objectId = require('joi-objectid')(Joi);
// Models
const Notification = require('../../models/Notification');
// const User = require('../../models/User');

// Get all notification
router.get('/',async(req,res)=>{
    const notifications=await Notification.find();
    res.json({data:notifications});


})

// Get specific notification
 router.get('/:id',async(req,res)=>{
    const notificationId=req.params.id;
    const notification=await Notification.findById(notificationId);
    if(!notification) 
        return res.status(404).send({error: "Notification does not exist"});
    return res.json({notification});


})

// Create a new notification
router.post('/',async(req,res)=>{
   try{
       const schema = {
           content: Joi.string().required(),
           recieverId: Joi.objectId().required(), 
           notifierId:Joi.objectId().required()
        }
        
        const result = Joi.validate(req.body, schema);
        
        if (result.error) {
            return res.status(400).send({ error: result.error.details[0].message });
        }
        /*
        const reciever = User.findOne({recieverId});
        if(!reciever)
          return res.status(404).send({error:'reciever does not exist'}); 
          */       
        const newNotification=await Notification.create(req.body);
        return res.json({msg:'Notification was created successfully',data:newNotification });
    }
    catch(error){
        console.log(error)
    }

})

//update notification
router.put('/:id',async (req, res) => {
    try{
 
        const notificationId = req.params.id;  
        const notification = Notification.findOne({notificationId});
        if(!notification)
          return res.status(404).send({error:'Notification does not exist'});
        
        const schema={
            isRead:Joi.boolean()
         }
         
         const result = Joi.validate(req.body, schema);
         if (result.error) 
           return res.status(400).send({ error: result.error.details[0].message });
         const updatedNotification=await Notification.updateOne({"_id":notificationId},req.body);
         res.json({data : updatedNotification});
     }
     catch(error){
         // will be handled
         console.log(error)
     }
     
 });

//delete notification
router.delete('/:id', async (req,res) => {
    try {
        const  notificationId = req.params.id;  
        const notification = Notification.findOne({notificationId});
        if(!notification)
          return res.status(404).send({error:'Notification does not exist'});
        const deletedNotification = await Notification.findByIdAndRemove(notificationId)
        res.json({msg:'Notification was deleted successfully', data: deletedNotification})
    }
    catch(error) {
        //error will be handled later
        console.log(error)
    }  
})
module.exports = router;