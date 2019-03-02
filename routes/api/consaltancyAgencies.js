const express = require('express');
const uuid =require('uuid');
const router = express.Router();
const Joi = require('joi');
const ConsaltancyAgency =require('../../models/ConsaltancyAgency');

const ConsaltancyAgencies =[
    new ConsaltancyAgency('experts','best consaltancy ever','education'
    ,'www.experts.org','experts@gmail.com','5214752','elrehab','exp12345'
    ,'3','655','eee','ddd','hhh'),
    new ConsaltancyAgency('experts1','best consaltancy ever','education'
    ,'www.experts.org','experts1@gmail.com','5214752','elrehab','exp12345'
    ,'3','655','eee','ddd','hhh')
];

// Get all consaltancy agancies
router.get('/', (req,res) => res.json({ConsaltancyAgencies : ConsaltancyAgencies}));

// Get a certain consaltancy agancy
router.get('/:id', (req, res) => {
    const consaltantId = req.params.id;
    const consaltant =ConsaltancyAgencies.find(consaltant => consaltant.id === consaltantId);
    res.json(consaltant);
});

// Create a consaltancy agancy
router.post('/', (req, res) => {
    const name = req.body.name;
    const description= req.body.description;
    const specialization=req.body.specialization;
    const website=req.body.website;
    const mail=req.body.mail;
    const fax=req.body.fax;
    const address=req.body.address;
    const password=req.body.password;
    
    const schema = {
		name: Joi.required(),
        description: Joi.required(),
        specialization: Joi.required(),
        website: Joi.required(),
        mail: Joi.required(),
        fax: Joi.required(),
        address: Joi.required(),
        password: Joi.required()
	}

    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    
    const consaltant = {
        name: name,
        description: description,
        specialization: specialization,
        website: website,
        mail: mail,
        fax: fax,
        address: address,
        password: password,
        rate: 0,
        reports: null,
        boardMembers: null,
        partners: null,
        events: null,
        id:uuid.v4()
    };
    ConsaltancyAgencies.push(consaltant);
    res.json({ConsaltancyAgencies : ConsaltancyAgencies});
});

// Update a consaltancy agancy info
router.put('/:id', (req, res) => {
    const consaltantId = req.params.id;
    const name = req.body.name;
    const description= req.body.description;
    const specialization=req.body.specialization;
    const website=req.body.website;
    const mail=req.body.mail;
    const fax=req.body.fax;
    const address=req.body.address;
    const password=req.body.password;
    const rate=req.body.rate;
    const reports=req.body.reports;
    const boardMembers=req.body.boardMembers;
    const partners=req.body.partners;
    const events=req.body.events; 
    const consaltant = ConsaltancyAgencies.find(consaltant => consaltant.id === consaltantId);
    if(name)consaltant.name=name;
    if(description)consaltant.description=description;
    if(specialization)consaltant.specialization=specialization;
    if(website)consaltant.website=website;
    if(mail)consaltant.mail=mail;
    if(fax)consaltant.fax=fax;
    if(address)consaltant.address=address;
    if(password)consaltant.password=password;
    if(rate)consaltant.rate=rate;
    if(reports)consaltant.reports=reports;
    if(boardMembers)consaltant.boardMembers=boardMembers;
    if(partners)consaltant.partners=partners;
    if(events)consaltant.events=events;
    res.json({ConsaltancyAgencies : ConsaltancyAgencies});
});


// Delete a consaltancy agancy
router.delete('/:id', (req, res) => {
    const consaltantId = req.params.id;
    const consaltant = ConsaltancyAgencies.find(consaltant => consaltant.id === consaltantId);
    const index = ConsaltancyAgencies.indexOf(consaltant);
    ConsaltancyAgencies.splice(index,1);
    res.json({ConsaltancyAgencies : ConsaltancyAgencies});
});

module.exports = router;