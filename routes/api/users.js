const express = require('express');
const bcrypt =require('bcryptjs');
const router = express.Router();

const User =require('../../models/User');

// Get all users
router.get('/', async (req,res) => {
    try{
        const user = await User.find();
        if(user.length==0) res.status(404).send({error:"there is no user"});
        res.json({Users : user});   
    }catch{
        res.json({error:error.message});
    }
})

// Get all members 
router.get('/members/', async (req,res) => {
    try{
        const Member = await User.find({type:'member'});
        if(Member.length==0) res.status(404).send({error:"there is no Member"});
        res.json({Members : Member});
    }catch{
        res.json({error:error.message});
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const user =await User.findOne({_id:id});
        console.log(user);
        if(!user) res.status(404).send({error:"there is no User with this Id"});
        res.json(user);
    }catch(error) {
        res.json({error: error.message});
   } 
});

// Create a user
router.post('/', async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user) return res.status(400).json({error:"There are User with this emial"});
        const salt =bcrypt.genSaltSync(10);
        const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
        const type = req.body.type;
        if(type=='member'){
            const isValidated = validator.createValidationMember(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const newUser =await User.create({
                type:"member",
                name:req.body.name,
                email:req.body.email,
                password: passAfterHashing,
                phoneNumber:req.body.phoneNumber,
                birthDate:req.body.birthDate,
                location:req.body.location,
                otherContacts:req.body.otherContacts,
                field:req.body.field,
                skills:req.body.skills,
                interests:req.body.interests,
                tasks:req.body.tasks,
                attendedEvents:req.body.attendedEvents,
                experience:req.body.experience,
                certificates:req.body.certificates
            });
            res.json({msg:'User was created successfully', data: newUser});
        }else if(type=='partner'){
            const isValidated = validator.createValidationPartner(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const newUser =await User.create({
                type:"partner",
                name:req.body.name,
                email:req.body.email,
                password: passAfterHashing,
                basicBussinesInformation:req.body.basicBussinesInformation,
                boardMembers:req.body.boardMembers,
                fieldOfWork:req.body.fieldOfWork,
                partners:req.body.partners,
                eventOrganized:req.body.eventOrganized,
                formFeedBack:req.body.formFeedBack,
                pastProjects:req.body.pastProjects,
                contactInfo:req.body.contactInfo
            });
            res.json({msg:'User was created successfully', data: newUser});
        }else{
            const isValidated = validator.createValidationConsaltancyAgency(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const newUser =await User.create({
                type:"consaltancyAgency",
                name:req.body.name,
                email:req.body.email,
                password: passAfterHashing,
                description:req.body.description,
                specialization:req.body.specialization,
                website:req.body.website,
                fax:req.body.fax,
                address:req.body.address,
                reports:req.body.reports,
                boardMembers:req.body.boardMembers,
                partners:req.body.partners,
                events:req.body.events
            });
            res.json({msg:'User was created successfully', data: newUser});
        }
   }
   catch(error) {
        res.json({error:error.message});
   } 
});

module.exports = router