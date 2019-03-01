// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const partner = require('../../models/Partner');

// temporary data created as if it was pulled out of the database ...
const partnersList = [
    //basicBussinesInformation,boardMembers,fieldOfWork,partnersList,eventOrganized,formFeedBack,pastProjects
	new partner('a','a','a','a','a','a','a'),
	new partner('b','b','b','b','b','b','b'),
	new partner('c','c','c','c','c','c','c'),
	new partner('d','d','d','d','d','d','d'),
	new partner('e','e','e','e','e','e','e')
];



// Get all partner
router.get('/', (req, res) => res.json({ data: partnersList }));

// Get specific partner
router.get('/:id', (req, res) => {  
    const  partnerId = req.params.id;  
    const partner = partnersList.find(partner => partner.id === partnerId);
    return res.json({partner});
});

// Create a new partner

router.post('/', (req, res) => {
    
	const basicBussinesInformation = req.body.basicBussinesInformation;
    const boardMembers = req.body.boardMembers;
    const fieldOfWork = req.body.fieldOfWork;
    const partners = req.body.partners;
    const eventOrganized = req.body.eventOrganized;
    const formFeedBack = req.body.formFeedBack;
    const pastProjects = req.body.pastProjects;
    const name = req.body.name;
    const contactInfo = req.body.contactInfo;
    const email = req.body.email;
    const password = req.body.password;
    


	const schema = {
		basicBussinesInformation: Joi.required(),
        boardMembers: Joi.required(),
        fieldOfWork: Joi.required(),
        partners: Joi.required(),
        eventOrganized: Joi.required(),
        formFeedBack: Joi.required(),
        pastProjects: Joi.required(),
        name: Joi.required().string(),
        contactInfo: Joi.required(),
        email: Joi.required().email(),
        password: Joi.required().alphanum().min(8)
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const Partner = new partner(
        basicBussinesInformation, boardMembers,
        fieldOfWork,partners,eventOrganized,formFeedBack,
        pastProjects,name,contactInfo,email,password);
    
    return res.json({Partner });
    
});


router.put('/:id', (req, res) => {
  
    const  partnerId =req.params.id;  

    const basicBussinesInformation = req.body.basicBussinesInformation;
    const boardMembers = req.body.boardMembers;
    const fieldOfWork = req.body.fieldOfWork;
    const partners = req.body.partners;
    const eventOrganized = req.body.eventOrganized;
    const formFeedBack = req.body.formFeedBack;
    const pastProjects = req.body.pastProjects;
    const name = req.body.name;
    const contactInfo = req.body.contactInfo;
    const email = req.body.email;
    const password = req.body.password;
   
   const partner = partnersList.find(partner => partner.id === partnerId);
   
   if(basicBussinesInformation) partner.basicBussinesInformation=basicBussinesInformation;
   if(boardMembers) partner.boardMembers=boardMembers;
   if(fieldOfWork) partner.fieldOfWork=fieldOfWork;
   if(partners) partner.partners=partners;
   if(eventOrganized) partner.eventOrganized=eventOrganized;
   if(formFeedBack) partner.formFeedBack=formFeedBack;
   if(pastProjects) partner.pastProjects=pastProjects;
   if(name) partner.name=name;
   if(contactInfo) partner.contactInfo=contactInfo;
   if(email) partner.email=email;
   if(password) partner.password=password;
 
   return res.json({partnersList});
});


router.delete('/:id', (req, res) => {  
    const  partnerId =req.params.id;  
    const partner = partnersList.find(partner => partner.id === partnerId);
    const index = partnersList.indexOf(partner);
    partnersList.splice(index,1);
   return res.json({partnersList});
});


module.exports = router;
