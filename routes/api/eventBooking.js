// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const EventBooking = require('../../models/EventBooking');

// temporary data created as if it was pulled out of the database ...
const eventBookings = [
	new EventBooking(30,55,250,"cash")
];

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all EventBookings
router.get('/', (req, res) => res.json({ data: eventBookings }));
//----------------------------------------------\\

// Get a certain event booking
router.get('/:id', (req, res) => {
    const requestedId = req.params.id
    const EventBooking = eventBookings.find(EventBooking => EventBooking.eventBookingId === requestedId)
    res.send(EventBooking)
})
//-----------------------------------------------\\

router.post('/', (req, res) => {
	const eventId = req.body.eventId;
    const memberId = req.body.memberId;
    const registrationPrice = req.body.registrationPrice;
    const paymentMethod = req.body.paymentMethod;

	const schema = {
        eventId :Joi.required(),
        memberId : Joi.required(),
        registrationPrice :Joi.number().required(),
        paypmentMethod :Joi.required(),
    }
   

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const newEventBooking = new EventBooking(
        eventId,
        memberId ,
        registrationPrice,
        paymentMethod
    );
	return res.json({ data: newEventBooking });
});
//----------------------------------------\\

router.put('/:id', (req, res) => {
    const requestedId = req.params.id 
    const eventId = req.body.eventId;
    const memberId = req.body.memberId;
    const registrationPrice = req.body.registrationPrice;
    const paymentMethod = req.body.paymentMethod;
    
    const booking = eventBookings.find(request => booking.eventBookingId === requestedId)
    
    if(eventId)booking.eventId=eventId;
    if(memberId)booking.memberId=memberId;
    if(registrationPrice)booking.registrationPrice=registrationPrice;
    if(paymentMethod)booking.paymentMethod=paymentMethod;

    res.send(EventBookings)
})
//-----------------------------------\\

// Delete a Event Request
router.delete('/:id', (req, res) => {
    const requestedId = req.params.id 
    const EventBooking = eventBookings.find(EventBooking => EventBooking.eventBookingId === requestedId)
    const index = eventBookings.indexOf(EventBooking)
    eventBookings.splice(index,1)
    res.send(eventBookings)
})
//---------------------------------\\

module.exports = router;
