// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();
// Models
const EventBooking = require("../../models/EventBooking");

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all EventBookings
router.get("/", async (req, res) => {
  eventBookings = await EventBooking.find()
  // .populate('eventId').populate('memberId').exec(function(err,res){
  //   if (err) return handleError(err)
  // });;
  res.json({ data: eventBookings });
});
//----------------------------------------------\\

// Get a certain event booking
router.get("/:id", async (req, res) => {
  const requestedId = req.params.id;
  
  const eventBooking = await EventBooking.findOne({' _id': requestedId })
  // .populate('eventId').populate('memberId').exec(function(err,res){
  //   if (err) return handleError(err)
  // });
  res.send(eventBooking);
});
//-----------------------------------------------\\

router.post("/", async (req, res) => {
  const schema = {
    eventId: Joi.objectId().require() ,
    memberId: Joi.objectId().required(),
    registrationPrice: Joi.number().required(),
    paymentMethod: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
 
  const newEventBooking = await EventBooking.create(req.body);

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

  res.send(updatedBooking);
});
//-----------------------------------\\

// Delete a Event Request
router.delete("/:id", async (req, res) => {
  const requestedId = req.params.id;
  const eventBooking = await EventBooking.findByIdAndRemove(requestedId);
  if (!eventBooking)
    return res
      .status(404)
      .send({ error: "The Booking you are tryinig to delete does not exist" });

  res.send(eventBooking);
});
//---------------------------------\\

module.exports = router;
