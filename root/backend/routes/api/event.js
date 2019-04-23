// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
// Models
const Event = require("../../models/Event");
const User = require("../../models/User");
Joi.objectId = require("joi-objectid")(Joi);

const notificationController = require("../../controllers/sendNotificationController");
// make sure to notify about object id  and pretty method

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all Events
router.get("/", async (req, res) => {
  const events = await Event.find()
    .populate("organizerId")
    .populate("eventRequestId");
  res.json({ data: events }); // make sure of pretty
});
//----------------------------------------------\\

// Read Events in specific range
router.get("/withRange/:limit/:offset", async (req, res) => {
  const schema = {
    limit: Joi.required(),
    offset: Joi.required()
  };

  const result = Joi.validate(req.params, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const limit = parseInt(req.params.limit, 10);
  const offset = parseInt(req.params.offset, 10);
  const events = await Event.find()
    .skip(offset)
    .limit(limit);
  res.json({ data: events });
});
//----------------------------------------------\\

router.get("/Organizer/organizer", async (req, res) => {
  const organizerId = req.user._id;
  const event = await Event.findOne({ organizerId: organizerId })
    .populate("organizerId")
    .populate("eventRequestId");
  if (!event)
    return res
      .status(400)
      .send({ error: "The Event you are tryinig to show does not exist " });
  res.send({ data: event });
});

// Get a certain event
router.get("/:id", async (req, res) => {
  const requestedId = req.params.id;
  // console.log(requestedId);
  const event = await Event.findOne({ _id: requestedId })
    .populate("organizerId")
    .populate("eventRequestId");
  // console.log(event); //bad req
  if (!event)
    return res
      .status(400)
      .send({ error: "The Event you are tryinig to show does not exist " });
  res.send({ data: event });
});
//-----------------------------------------------\\
//Get a certain event by location  /////////////////////////////THINK OF USING REGEX\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.get("/search/:city/:Area/:Street", async (req, res) => {
  let city = req.params.city;
  let Street = req.params.Street;
  let Area = req.params.Area;
  const event = await Event.find({
    "location.city": city,
    "location.Street": Street,
    "location.Area": Area
  })
    .populate("organizerId")
    .populate("eventRequestId");
  if (!event)
    return res
      .status(400)
      .send({ error: " there is no such event with these attributes " }); //bad req
  res.send({ data: event });
});
//----------------------------------------------------\\
//Get a certain event by type
router.get("/search/:type", async (req, res) => {
  const type = req.params.type;
  const event = await Event.find({ type: { $regex: type, $options: "i" } })
    .populate("organizerId")
    .populate("eventRequestId");
  res.send({ data: event });
});
//----------------------------------------------------\\
//Get recommended events for a user  /////STILL BASED ON PAST EVENTS TO BE IMPLEMENTED

/*
this method should be handled appropriatly

*/

router.get("/recommended/:userID", async (req, res) => {
  const requestedId = req.params.userID;

  const user = await User.findOne({ _id: requestedId })
    .populate("organizerId")
    .populate("eventRequestId");
  let userInterrests = user.interests;
  // let userLocation=user.location
  // if (!userInterrests.length === 0)
  // return res.status(400).send({ error: "you do not have interests " });
  // let userCity=userLocation.city
  // let userStreet =userLocation.Street
  // let userArea = userLocation.Area

  //{'location.city':userCity , 'location.Street':userStreet ,'location.Area':userArea})

  const events = await Event.find({ type: { $in: userInterrests } })
    .populate("organizerId")
    .populate("eventRequestId");
  // if (!events)
  // return res
  // .status(400)
  //.send({ error: "No recommended Events currently try again later!!" });

  res.json({ data: events });
});

//----------------------------------------------------\\
// FEEDBACK FORM

// });
//----------------------------------------------------\\

router.post("/", async (req, res) => {
  const schema = {
    location: Joi.object()
      .keys({
        city: Joi.string(),
        Street: Joi.string(),
        Area: Joi.string()
      })
      .required(),
    description: Joi.string()
      .min(30)
      .required(),
    type: Joi.string().required(),
    registrationPrice: Joi.number().required(),
    numberOfSpaces: Joi.number().required(),
    speakers: Joi.array()
      .items(Joi.string())
      .required(),
    topics: Joi.array()
      .items(Joi.string())
      .required(),
    dateTime: Joi.date().required(),
    organizerId: Joi.objectId().required(),
    numberOfRegisterations: Joi.number().required(),
    eventRequestId: Joi.objectId().required(),
    rate: Joi.number()
      .min(0)
      .max(5)
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const newEvent = await Event.create(req.body);
  //------------------------(Notify members)-------------------------------------
  const eventId = newEvent._id;
  await notificationController.notifyAllMembers(eventId, `New Event is posted`);
  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(eventId, `New Event is posted`);
  //------------------------(Notify Partner that his request is accepted)-------------------------------------
  const recieverId = newEvent.organizerId;
  await notificationController.notifyUser(
    eventId,
    recieverId,
    `Your event request has been accepted and your event is posted`
  );
  //------------------------------------------------------------------
  return res.json({ data: newEvent });
});
//----------------------------------------\\

// Update Event
router.put("/:id", async (req, res) => {
  const requestedId = req.params.id;

  const schema = {
    location: Joi.object().keys({
      city: Joi.string(),
      Street: Joi.string(),
      Area: Joi.string()
    }),
    description: Joi.string().min(30),
    type: Joi.string(),
    registrationPrice: Joi.number(),
    numberOfSpaces: Joi.number(),
    speakers: Joi.array().items(Joi.string()),
    topics: Joi.array().items(Joi.string()),
    dateTime: Joi.date(),
    organizerId: Joi.objectId(),
    numberOfRegisterations: Joi.number(),
    eventRequestId: Joi.objectId(),
    rate: Joi.number()
      .min(0)
      .max(5)
  };
  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  const updatedEvent = await Event.updateOne({ _id: requestedId }, req.body); //test $set as it's not in the lab

  res.send({ data: updatedEvent });
});
//-----------------------------------\\

// Delete a Event
router.delete("/:id", async (req, res) => {
  const requestedId = req.params.id;
  const event = Event.findOne({ requestedId });
  if (!event)
    return res
      .status(404)
      .send({ error: "The Event you are tryinig to edit does not exist" });

  const deletedEvent = await Event.findByIdAndRemove(requestedId);
  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(requestedId, `Event is deleted`);
  //----------------------------------------------------------------------------
  res.send({ "you have deleted ": deletedEvent });
});
//---------------------------------\\

module.exports = router;
