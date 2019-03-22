// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
// Models
const Event = require("../../models/Event");
Joi.objectId = require('joi-objectid')(Joi);

// temporary data created as if it was pulled out of the database ...
// const events = [
//     new Event
//     (
//         'masr el gdida',
//         'event gamed gdn hakteb kteer 3shan ykon aktar mn 30 characterajkjdfajkdfajkds',
//         'programming event',
//         150,
//         200,
//         'magdy shatta',
//         'java w python',
//         66,
//         5,
//         '12/2/2012',
//         uuid.v4(),
//         uuid.v4()
//     )
// ];
// make sure to notify about object id  and pretty method 

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all Events
router.get("/", async(req, res) => {
    const events = await Event.find() 
  res.json({ data: events }.pretty()); // make sure of pretty
});
//----------------------------------------------\\

// Get a certain event
router.get("/:id", async(req, res) => {
  const requestedId = req.params.id
  const event =await Event.find({requestedId}); 
  res.send(event).pretty()
});
//-----------------------------------------------\\

router.post("/", async (req, res) => {
  const schema = {
    location: Joi.object().keys(
        {  // we want to test thiss 
            city :Joi.string(),
            Street :Joi.string() , 
            Area :Joi.string() , 
        }
    ).required(), // remember it is a json 
    description: Joi.string().min(30).required(),
    type: Joi.string().required(),
    registrationPrice: Joi.number().required(),
    numberOfSpaces: Joi.number().required(),
    speakers: Joi.string().required(),
    topics: Joi.string().required(),
    dateTime: Joi.date().required(),
    organizerId: Joi.objectId().required(),
    numberOfRegisterations: Joi.number().required(),
    eventRequestId: Joi.objectId().required() , 
    rate : Joi.number().min(0).max(5) 
  };

  const result =  Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const newEvent = await Event.create(req.body)
  return res.json({ data: newEvent }.pretty());
});
//----------------------------------------\\

// Update Event
router.put("/:id",async (req, res) => {
  const requestedId = req.params.id;

  const event = Event.findOne({requestedId})
  if(!event) return res.status(404).send({error: 'The Event you are tryinig to edit does not exist'})

  const schema = {
    location: Joi.object().keys(
        {  // we want to test thiss 
            city :Joi.string(),
            Street :Joi.string() , 
            Area :Joi.string() , 
        }
    ), // remember it is a json 
    description: Joi.string().min(30),
    type: Joi.string(),
    registrationPrice: Joi.number(),
    numberOfSpaces: Joi.number(),
    speakers: Joi.string(),
    topics: Joi.string(),
    dateTime: Joi.date(),
    organizerId: Joi.objectId(),
    numberOfRegisterations: Joi.number(),
    eventRequestId: Joi.objectId(), 
    rate : Joi.number().min(0).max(5) 
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  const updatedEvent = await Event.updateOne(req.body)

  res.send(updatedEvent.pretty());
});
//-----------------------------------\\

// Delete a Event
router.delete("/:id", async(req, res) => {
  const requestedId = req.params.id;
  const deletedEvent = await Event.findByIdAndRemove(requestedId)
  res.send({'you have deleted ' : deletedEvent.pretty()})
});
//---------------------------------\\

module.exports = router;
