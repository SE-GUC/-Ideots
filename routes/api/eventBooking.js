// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const EventBooking = require('../../models/EventBooking');


///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all EventBookings
router.get('/', async (req, res) => {
    eventBookings = await EventBooking.find() 
    res.json({ data: eventBookings })
});
//----------------------------------------------\\

// Get a certain event booking
router.get('/:id', async (req, res) => {
    const requestedId = req.params.id
    const booking = await EventBooking.findOne({requestedId})
    if(!booking) return res.status(404).send({error: 'The Booking you are tryinig to edit does not exist'})
    const eventBooking = await EventBooking.find({'_id':requestedId})
    res.send(eventBooking)
})
//-----------------------------------------------\\

router.post('/', async (req, res) => {
	

	const schema = {
     //   eventId : Joi.objectId().required(),
     //   memberId :  Joi.objectId().required(),
        registrationPrice :Joi.number().required(),
        paypmentMethod :Joi.string().required()
    }
   

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const newEventBooking = await EventBooking.create(req.body)
  
	return res.json({ data: newEventBooking });
});
//----------------------------------------\\

router.put('/:id', async (req, res) => {
   
    const requestedId = req.params.id
   
    const booking = EventBooking.findOne({requestedId})
    if(!booking) return res.status(404).send({error: 'The Booking you are tryinig to edit does not exist'})

    const schema = {
    //    eventId : Joi.objectId().required(),
    //    memberId :  Joi.objectId().required(),
        registrationPrice :Joi.number().required(),
        paypmentMethod :Joi.string().required(),
    }
   

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });


     booking = await eventBookings.find({'_id':requestedId},req.body)
    
    res.send(booking)
})
//-----------------------------------\\

// Delete a Event Request
router.delete('/:id', async (req, res) => {
    const requestedId = req.params.id 
    const EventBooking = await EventBooking.findByIdAndRemove(requestedId);
    if(!EventBooking) return res.status(404).send({error: 'The Booking you are tryinig to edit does not exist'})
    
    res.send(EventBooking)
})
//---------------------------------\\

module.exports = router;
