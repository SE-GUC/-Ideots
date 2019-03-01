// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Event = require('../../models/Event');

// temporary data created as if it was pulled out of the database ...
const events = [
    new Event
    (
        'masr el gdida', 
        'event gamed gdn hakteb kteer 3shan ykon aktar mn 30 characterajkjdfajkdfajkds',
        'programming event',
        150,
        200,
        'magdy shatta',
        'java w python',
        66,
        5,
        '12/2/2012',
        uuid.v4(),
        uuid.v4()
    )
];

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all Events
router.get('/', (req, res) => res.json({ data: events }));
//----------------------------------------------\\

// Get a certain event 
router.get('/:id', (req, res) => {
    const requestedId = req.params.id
    const event = events.find(Event => Event.eventId === requestedId)
    res.send(event)
})
//-----------------------------------------------\\

router.post('/', (req, res) => {
	
    const location = req.body.location;
    const description = req.body.description;
    const type = req.body.type;
    const registrationPrice = req.body.registrationPrice;
    const numberOfSpaces = req.body.numberOfSpaces;
    const speakers = req.body.speakers;
    const topics = req.body.topics;
    const dateTime = req.body.dateTime;
    const organizerId = req.body.organizerId;
    const numberOfRegisterations = req.body.numberOfRegisterations;
    const eventRequestId = req.body.eventRequestId;

	const schema = {
        location :Joi.string().required(),
        description : Joi.string().min(30).required(),
        type :Joi.string().required(),
        registrationPrice :Joi.number().required(),
        numberOfSpaces :Joi.number().required(),
        speakers :Joi.string().required(),
        topics :Joi.string().required(),
        dateTime :Joi.date().required(),
        organizerId :Joi.required(),
        numberOfRegisterations :Joi.number().required(),
        eventRequestId :Joi.required()
    }
   

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    
    
    const newEvent =new Event
     (
        location ,
        description ,
        type,
        registrationPrice,
        numberOfSpaces,
        speakers,
        topics,
        numberOfRegisterations,
        dateTime,
        organizerId,
        eventRequestId
    )
    events.push(newEvent)
	return res.json({ data: newEvent });
});
//----------------------------------------\\

// Update Event  
router.put('/:id', (req, res) => {
    const requestedId = req.params.id 
    const location = req.body.location;
    const description = req.body.description;
    const type = req.body.type;
    const registrationPrice = req.body.registrationPrice;
    const numberOfSpaces = req.body.numberOfSpaces;
    const speakers = req.body.speakers;
    const topics = req.body.topics;
    const dateTime = req.body.dateTime;
    const organizerId = req.body.organizerId;
    const numberOfRegisterations = req.body.numberOfRegisterations;
    const eventRequestId = req.body.eventRequestId;

    const event = events.find(event => event.eventId === requestedId)
    
    if (location)event.location=location 
    if (description)event.description=description 
    if (type)event.type=type 
    if (registrationPrice)event.registrationPrice=registrationPrice 
    if (numberOfSpaces)event.numberOfSpaces=numberOfSpaces 
    if (speakers)event.speakers=speakers 
    if (topics)event.topics=topics 
    if (dateTime)event.dateTime=dateTime 
    if (organizerId)event.organizerId=organizerId 
    if (numberOfRegisterations)event.numberOfRegisterations=numberOfRegisterations 
    if (eventRequestId)event.eventRequestId=eventRequestId 
   
    res.send(events)
})
//-----------------------------------\\

// Delete a Event 
router.delete('/:id', (req, res) => {
    const requestedId = req.params.id 
    const Event = events.find(Event => Event.eventId === requestedId)
    const index = events.indexOf(Event)
    events.splice(index,1)
    res.send(events)
})
//---------------------------------\\

module.exports = router;
