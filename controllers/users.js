const bcrypt =require('bcryptjs');

const User =require('../models/User');
const validator =require('../validations/userValidations');

const users = {
    postUser :async (req, res) => {
        try{
            const email = req.body.email;
            const user = await User.findOne({email});
            if(user) return res.status(400).json({error:"There are User with this email"});
            const type = req.body.type;
            if(type=='member'){
                const isValidated = validator.createValidationMember(req.body);
                if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
                const salt =bcrypt.genSaltSync(10);
                const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
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
                const salt =bcrypt.genSaltSync(10);
                const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
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
                const salt =bcrypt.genSaltSync(10);
                const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
                const newUser =await User.create({
                    type:"consultancy_agency",
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
    },
    putUser :async (req, res) => {     
        const id = req.params.id;
        const user = await User.findOne({_id:id});
        if(!user) return res.status(404).send({error: 'User does not exist'});   
       
        if(email){
            const user = await User.findOne({email});
            if(user & user._id != id) return res.status(400).json({error:"There are User with this emial"});
        }
        let result =null ;
        if (user.type=='member')
        {result = validator.updateValidationMember(req.body) }
        if (user.type=='partner')
        {  result = validator.updateValidationPartner(req.body)} 
         else
        { result = validator.updateValidationConsaltancyAgency(req.body) }
        
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
        const updatedUser = await User.updateOne({ "_id" : id },req.body)
        res.json({data:updatedUser})
    }
};
module.exports = users;