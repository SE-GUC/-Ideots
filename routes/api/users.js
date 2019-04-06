const express = require('express');
const bcrypt =require('bcryptjs');
const router = express.Router();

const User =require('../../models/User');
const validator =require('../../validations/userValidations');

const Task =require('../../models/Task');
var taskController = require('../../controllers/taskController');


//////////////////////////////for the task \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//view all tasks
router.get('/tasks', taskController.viewAllTasks)


//apply for the task ??????????
router.put('/tasks/:id',taskController.updateOneTask)






//////////////////////////////////////////////////////////////////////////////

// Get all users
router.get('/', async (req,res) => {
    try{
        const user = await User.find();
        if(user.length==0) res.status(404).send({error:"there is no user"});
        res.json({data : user});   
    }catch(error){
        res.json({error:error.message});
    }
})

// Get all members 
router.get('/members/', async (req,res) => {
    try{
        const Member = await User.find({type:'member'});
        if(Member.length==0) res.status(404).send({error:"there is no Member"});
        res.json({data : Member});
    }catch(error){
        res.json({error:error.message});
    }
})

router.get('/:id', async (req, res,next) => {
    try{   
        const id = req.params.id;
        console.log(id);
        const user =await User.findOne({_id:id});
        console.log(user);
        if(!user) res.status(404).send({error:"there is no User with this Id"});
        res.json(user);
    }catch(error) {
        console.log("laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        res.json({error: error.message});
   } 
});




// Create a user
router.post('/', async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user) return res.status(400).json({error:"There are User with this email"});
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
});


// Update a user info 
// router.put('/:id', async (req, res) => {
//     try {
//             const id = req.params.id;
//             const user = await User.findOne({_id:id});
//             if(!user) return res.status(404).send({error: 'User does not exist'});
            
//             const type=user.type;
//             const name =req.body.name;
//             const email =req.body.email;
//             const password =req.body.password;
//             const rate =req.body.rate;
//             const phoneNumber=req.body.phoneNumber;
//             const birthDate=req.body.birthDate;
//             const location=req.body.location;
//             const otherContacts=req.body.otherContacts;
//             const field=req.body.field;
//             const skills=req.body.skills;
//             const interests=req.body.interests;
//             const tasks=req.body.tasks;
//             const attendedEvents=req.body.attendedEvents;
//             const experiencereq= req.body.experience;
//             const certificates=req.body.certificates;
//             const basicBussinesInformation=req.body.basicBussinesInformation;
//             const boardMembers=req.body.boardMembers;
//             const fieldOfWork=req.body.fieldOfWork;
//             const partners=req.body.partners;
//             const eventOrganized=req.body.eventOrganized;
//             const formFeedBack=req.body.formFeedBack;
//             const pastProjects=req.body.pastProjects;
//             const contactInfo=req.body.contactInfo;
//             const description=req.body.description;
//             const specialization=req.body.specialization;
//             const website=req.body.website;
//             const fax=req.body.fax;
//             const address=req.body.address;
//             const reports=req.body.reports;
//             const events=req.body.events;
//             if(email){
//                 const user = await User.findOne({email});
//                 if(user & user._id != id) return res.status(400).json({error:"There are User with this emial"});
//             }
//             if(type=='member'){
//                 const isValidated = validator.updateValidationMember(req.body);
//                 if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
//                 if(name)await User.updateOne({_id:id},{$set:{name:name}});
//                 if(email)await User.updateOne({_id:id},{$set:{email:email}});
//                 if(password)await User.updateOne({_id:id},{$set:{password:password}});
//                 if(rate)await user.updateOne({_id:id},{$set:{rate:rate}});
//                 if(phoneNumber)await user.updateOne({_id:id},{$set:{phoneNumber:phoneNumber}});
//                 if(birthDate)await user.updateOne({_id:id},{$set:{birthDate:birthDate}});
//                 if(location)await user.updateOne({_id:id},{$set:{location:location}});
//                 if(otherContacts)await user.updateOne({_id:id},{$set:{otherContacts:otherContacts}});
//                 if(field)await user.updateOne({_id:id},{$set:{field:field}});
//                 if(skills)await user.updateOne({_id:id},{$set:{skills:skills}});
//                 if(interests)await user.updateOne({_id:id},{$set:{interests:interests}});
//                 if(tasks)await user.updateOne({_id:id},{$set:{tasks:tasks}});
//                 if(attendedEvents)await user.updateOne({_id:id},{$set:{attendedEvents:attendedEvents}});
//                 if(experiencereq)await user.updateOne({_id:id},{$set:{experiencereq:experiencereq}});
//                 if(certificates)await user.updateOne({_id:id},{$set:{certificates:certificates}});
//             }else if(type=='partner'){
//                 const isValidated = validator.updateValidationPartner(req.body);
//                 if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
//                 if(name)await User.updateOne({_id:id},{$set:{name:name}});
//                 if(email)await User.updateOne({_id:id},{$set:{email:email}});
//                 if(password)await User.updateOne({_id:id},{$set:{password:password}});
//                 if(rate)await user.updateOne({_id:id},{$set:{rate:rate}});
//                 if(basicBussinesInformation)await user.updateOne({_id:id},{$set:{basicBussinesInformation:basicBussinesInformation}});
//                 if(boardMembers)await user.updateOne({_id:id},{$set:{boardMembers:boardMembers}});
//                 if(fieldOfWork)await user.updateOne({_id:id},{$set:{fieldOfWork:fieldOfWork}});
//                 if(partners)await user.updateOne({_id:id},{$set:{partners:partners}});
//                 if(eventOrganized)await user.updateOne({_id:id},{$set:{eventOrganized:eventOrganized}});
//                 if(formFeedBack)await user.updateOne({_id:id},{$set:{formFeedBack:formFeedBack}});
//                 if(pastProjects)await user.updateOne({_id:id},{$set:{pastProjects:pastProjects}});
//                 if(contactInfo)await user.updateOne({_id:id},{$set:{contactInfo:contactInfo}});
//             }else{
//                 const isValidated = validator.updateValidationConsaltancyAgency(req.body);
//                 if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
//                 if(name)await User.updateOne({_id:id},{$set:{name:name}});
//                 if(email)await User.updateOne({_id:id},{$set:{email:email}});
//                 if(password)await User.updateOne({_id:id},{$set:{password:password}});
//                 if(rate)await user.updateOne({_id:id},{$set:{rate:rate}});
//                 if(description)await user.updateOne({_id:id},{$set:{description:description}});
//                 if(specialization)await user.updateOne({_id:id},{$set:{specialization:specialization}});
//                 if(website)await user.updateOne({_id:id},{$set:{'website':website}});
//                 if(fax)await user.updateOne({_id:id},{$set:{fax:fax}});
//                 if(address)await user.updateOne({_id:id},{$set:{address:address}});
//                 if(reports)await user.updateOne({_id:id},{$set:{reports:reports}});
//                 if(boardMembers)await user.updateOne({_id:id},{$set:{boardMembers:boardMembers}});
//                 if(partners)await user.updateOne({_id:id},{$set:{partners:partners}});
//                 if(events)await user.updateOne({_id:id},{$set:{events:events}});
//             }
//             res.json({msg: 'User was updated successfully'});
//        }
//             catch(error) {
//             res.json({error: error.message});
//        } 
// });
        router.put('/:id', async (req, res) => {
           
                    const id = req.params.id;
                    const user = await User.findOne({_id:id});
                    if(!user) return res.status(404).send({error: 'User does not exist'});
                    
                    if (user.type=='member')
                    {let result = validator.updateValidationMember(req.body) }
                    if (user.type=='partner')
                   {  result = validator.updateValidationPartner(req.body)} 
                   else
                   { result = validator.updateValidationConsaltancyAgency(req.body) }
                    
                    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
                    const updatedUser = await User.updateOne({ "_id" : id },req.body)
                    res.json({data:updatedUser})
        
                   
        });


router.delete('/:id', async (req, res) => {
     const requestedId = req.params.id;
     const user =await User.findOne({'_id':requestedId});
    //  console.log(user)
    if(!user) return res.status(404).send({error:"there is no User with this Id"});
        const deletedUser = await User.findByIdAndRemove(requestedId)
       res.json({data:deletedUser})
       

        });
        

        // router.put('/:id', async (req,res) => {
        //     try {
        //         const id = req.params.id
        //         const review = await Review.findOne({ "_id" : id });   
        //        if(!review) return res.status(404).send({error: 'review does not exist'})
        //         const schema = {
        //             rate :   Joi.number(),
        //             reviewType :  Joi.any().valid([0, 1,2])
        //         }
        //     const result = Joi.validate(req.body, schema)
        //     if (result.error) return res.status(400).send({ error: result.error.details[0].message })
            
        //     const updatedReview = await Review.updateOne({ "_id" : id },req.body)
        //      res.json({data:updatedReview})
        //     }
        //     catch(error) {
        //         // We will be handling the error later
        //         console.log(error)
        //     }  
        // })



        ///////////////////////////candidate controllers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     



module.exports = router


///CHANGES
//ghayart el response kollo gwa data ella elli bykkon b id
//zawedt crud delete

