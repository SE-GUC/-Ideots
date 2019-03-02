const express = require('express');
const uuid =require('uuid');
const router = express.Router();
const Admin =require('../../models/Admin');
const Joi = require('joi');

const admins =[
    new Admin('admin1','admin1@gmail.com','Ad1233','123456'),
    new Admin('admin2','admin2@gmail.com','Ad1234','133456'),
    new Admin('admin3','admin3@gmail.com','Ad1235','143456')
];
// Get all admins
router.get('/', (req,res) => res.json({admins : admins}));

// Get a certain admin
router.get('/:id', (req, res) => {
    const adminId = req.params.id;
    const admin =admins.find(admin => admin.id === adminId);  
    res.json(admin);
});


// Create a admin
router.post('/', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const phone = req.body.phone;

    const schema = {
		name: Joi.required(),
        mail: Joi.required(),
        password: Joi.required(),
        phone: Joi.required()     
	}

    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const admin = {
        name: name,
        mail: mail,
        password: password,
        phone: phone,
        id:uuid.v4()
    };
    
    admins.push(admin);
    res.json({admins : admins});
});

// Update a admin info
router.put('/:id', (req, res) => {
    const adminId = req.params.id; 
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const phone = req.body.phone;
    const admin = admins.find(admin => admin.id === adminId);
    if(name)admin.name=name;
    if(mail)admin.mail=mail;
    if(password)admin.password=password;
    if(phone)admin.phone=phone;
    res.json({admins : admins});
});


// Delete a admin
router.delete('/:id', (req, res) => {
    const adminId = req.params.id;
    const admin = admins.find(admin => admin.id === adminId);
    const index = admins.indexOf(admin);
    admins.splice(index,1);
    res.json({admins : admins});
});

module.exports = router