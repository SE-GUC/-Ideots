// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Models
const EventRequest = require("../../models/EventRequest");
const notificationController = require("../../controllers/sendNotificationController");

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all eventRequests
router.get("/", async (req, res) => {
    eventRequests = await EventRequest.find().populate('organizerId')
    // .populate('organizerId').exec(function(err,res){
    //   if (err) return handleError(err)
    // })
    res.json({ data: eventRequests });
});
//----------------------------------------------\\

// Get a certain event request
router.get("/:id", async (req, res) => {
  const requestedId = req.params.id;
  const request = await EventRequest.find({"_id":requestedId}).populate('organizerId')
  // .populate('organizerId').exec(function(err,res){
  //   if (err) return handleError(err)
  // });
 // if(!request) return res.status(404).send({error: 'The request you are tryinig to get does not exist'})
  res.send(request);
});
//-----------------------------------------------\\

router.post("/", async (req, res) => {
  

  const schema = {
    location: Joi.object(),
    description: Joi.string().min(30).required(),
    type: Joi.string(),
    registrationPrice: Joi.number().required(),
    numberOfSpaces: Joi.number().required(),
    speakers: Joi.array().items(Joi.string()),
    topics:Joi.array().items(Joi.string()),
    dateTime: Joi.date(),
    organizerId: Joi.objectId().required(),
    acceptenceState: Joi.number()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

    const newEventRequest = await EventRequest.create(req.body)
  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(newEventRequest._id,`New Event request is posted`);
  //----------------------------------------------------------------------------

  return res.json({msg:"Event request created successfully", data: newEventRequest });
});
//----------------------------------------\\

// Update Event Request acceptance state
router.put("/:id", async(req, res) => {
  const requestedId = req.params.id;


  const request = await EventRequest.findOne({'_id':requestedId})
  if(!request) return res.status(400).send({error: 'The request you are tryinig to edit does not exist'})
  
  const schema = {
    location: Joi.object().keys(
        {  
            city :Joi.string(),
            Street :Joi.string() , 
            Area :Joi.string() , 
        }
    ),
    description: Joi.string().min(30),
    type: Joi.string(),
    registrationPrice: Joi.number(),
    numberOfSpaces: Joi.number(),
    speakers: Joi.array().items(Joi.string()),
    topics:Joi.array().items(Joi.string()),
    dateTime: Joi.date(),
    organizerId: Joi.objectId(),
    acceptenceState:Joi.number().max(1).min(-1)
    
  };


  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const eventRequest = await EventRequest.updateOne({'_id' :requestedId } , req.body);// comment 

  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(eventRequest._id,`Event request was updated`);
  //----------------------------------------------------------------------------
  res.send(eventRequest);
});
//-----------------------------------\\

// Delete a Event Request
router.delete("/:id", async (req, res) => {
  const requestedId = req.params.id;
  // const eventRequest = await EventRequest.find({'_id':requestedId});
  const eventRequest = await EventRequest.findByIdAndRemove(requestedId);
  if(!eventRequest) return res.status(400).send({error: 'The request you are tryinig to delete does not exist'})
  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(eventRequest._id,`Event request was deleted`);
  //----------------------------------------------------------------------------
  res.send(eventRequest);
});
//---------------------------------\\

module.exports = router;


