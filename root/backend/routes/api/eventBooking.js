// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();
// Models
const EventBooking = require("../../models/EventBooking");
const Event= require("../../models/Event");
const notificationController = require("../../controllers/sendNotificationController");
///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all EventBookings
router.get("/", async (req, res) => {
  eventBookings = await EventBooking.find().populate('eventId').populate('memberId')
  // .populate('eventId').populate('memberId').exec(function(err,res){
  //   if (err) return handleError(err)
  // });;
  res.json({ data: eventBookings });
});
//----------------------------------------------\\

// Get a certain event booking
router.get("/:id", async (req, res) => {
  const requestedId = req.params.id;
  
  const eventBooking = await EventBooking.findOne({'_id': requestedId }).populate('eventId').populate('memberId')
  // .populate('eventId').populate('memberId').exec(function(err,res){
  //   if (err) return handleError(err)
  // });
  res.send(eventBooking);
});
//-----------------------------------------------\\

// search if user booked an event 
router.get("/:Event/:theUser" , async (req,res) =>{
  theEvent = req.params.Event 
  theUser =  req.params.theUser;
  console.log("HAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
  console.log(theUser)
  console.log(theEvent)
  const eventBooking = await EventBooking.find({'eventId' :theEvent , 'memberId' :theUser})
  return res.send({data:eventBooking})

})
router.post("/", async (req, res) => {
  const schema = {
    eventId: Joi.objectId().required() ,
    memberId: Joi.objectId().required() ,
    registrationPrice: Joi.number().required(),
    paymentMethod: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
 
  const newEventBooking = await EventBooking.create(req.body);
  
  //-------------(Notify partner that someone has booked a place in the event)--------------------
  const event = await Event.findOne({'_id': newEventBooking.eventId });
  await notificationController.notifyUser(newEventBooking.eventId,event.organizerId,`someone has booked a place in the event `);
  //------------------------(Notify Admins)-------------------------------------
  await notificationController.notifyAdmins(newEventBooking.eventId,`someone has booked a place in the event`);
  //------------------------------------------------------------------
  return res.json({ data: newEventBooking });
});
//----------------------------------------\\

router.put("/:id", async (req, res) => {
  const requestedId = req.params.id;
  const schema = {
    eventId: Joi.objectId(),
    memberId: Joi.objectId(),
    registrationPrice: Joi.number(),
    paymentMethod: Joi.string()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

 const updatedBooking  = await EventBooking.updateOne({ '_id': requestedId }, req.body);
 //-------------(Notify member that the booking was edited)--------------------
 await notificationController.notifyUser(updatedBooking.eventId,updatedBooking.memberId,`Booking was edited`);
 //------------------------(Notify Admins)-------------------------------------
 await notificationController.notifyAdmins(newEventBooking.eventId,`someone has booked a place in the event`);
 //------------------------------------------------------------------

  res.send(updatedBooking);
});
//-----------------------------------\\

// Delete a Event Request
router.delete("/:id", async (req, res) => {
  const requestedId = req.params.id;
  const eventBooking = await EventBooking.findByIdAndRemove(requestedId);
  if (!eventBooking)
    return res
      .status(400)
      .send({ error: "The Booking you are tryinig to delete does not exist" });
//-------------(Notify member that the booking was edited)--------------------
await notificationController.notifyUser(requestedId,eventBooking.memberId,`Your booking was rejected`);
//------------------------------------------------------------------
  res.send(eventBooking);
});
//---------------------------------\\

module.exports = router;
