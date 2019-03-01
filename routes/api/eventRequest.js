// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const EventRequest = require('../../models/EventRequest');

// temporary data created as if it was pulled out of the database ...
const eventRequests = [
    new EventRequest
    (
        true,
        'masr el gdida', 
        'event gamed gdn hakteb kteer 3shan ykon aktar mn 30 characterajkjdfajkdfajkds',
        'programming event',
        150,
        200,
        'magdy shatta',
        'java w python',
        '12/2/2012',
        uuid.v4()
    )
	
];

///////////CRUDZZZZZZZ\\\\\\\\\\\\
// Read all eventRequests
router.get('/', (req, res) => res.json({ data: eventRequests }));
//----------------------------------------------\\

// Get a certain event request
router.get('/:id', (req, res) => {
    const requestedId = req.params.id
    const eventRequest = eventRequests.find(eventRequest => eventRequest.eventRequestId === requestedId)
    res.send(eventRequest)
})
//-----------------------------------------------\\

router.post('/', (req, res) => {
	const accepted = false;
    const location = req.body.location;
    const description = req.body.description;
    const type = req.body.type;
    const registrationPrice = req.body.registrationPrice;
    const numberOfSpaces = req.body.numberOfSpaces;
    const speakers = req.body.speakers;
    const topics = req.body.topics;
    const dateTime = req.body.dateTime;
    const organizerId = req.body.organizerId;

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
        accepted: Joi.boolean()
    }
    

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newEventRequest = new EventRequest(
        accepted,
        location ,
        description ,
        type,
        registrationPrice,
        numberOfSpaces,
        speakers,
        topics,
        dateTime,
        organizerId,
    );
	return res.json({ data: newEventRequest });
});
//----------------------------------------\\

// Update Event Request acceptance state
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
    const accepted = req.body.accepted;

    const eventRequest = eventRequests.find(eventRequest => eventRequest.eventRequestId === requestedId)
    
    if(typeof(accepted)!=undefined)    eventRequest.accepted = accepted

    else
    { 
    if(location)eventRequest.location=location;
    if(description)eventRequest.description=description;
    if(type)eventRequest.type=type;
    if(registrationPrice)eventRequest.registrationPrice=registrationPrice;
    if(numberOfSpaces)eventRequest.numberOfSpaces=numberOfSpaces;
    if(speakers)eventRequest.speakers=speakers;
    if(topics)eventRequest.topics=topics;
    if(dateTime)eventRequest.dateTime=dateTime;
    if(organizerId)eventRequest.organizerId=organizerId;
}
res.send(eventRequests)
})
//-----------------------------------\\

// Delete a Event Request
router.delete('/:id', (req, res) => {
    const requestedId = req.params.id 
    const eventRequest = eventRequests.find(eventRequest => eventRequest.eventRequestId === requestedId)
    const index = eventRequests.indexOf(eventRequest)
    eventRequests.splice(index,1)
    res.send(eventRequests)
})
//---------------------------------\\

module.exports = router;
