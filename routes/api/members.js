const express = require('express')
const router = express.Router()
const Member=require('../../models/Member')
const Joi = require('joi');
module.exports=router

let memberList=[
    new Member('ahmed','mahmoud',2468,'2000-01-01','aswan','no','cs','c#','painting','7oot','harvard','dardar@3w3w.com','Aa112233'),
    new Member('mohammed','ali basha',2468,'1800-01-01','ecuador','no','drawing','many colors','painting','sokkar','KLJ','dardardodo@3w3w.com','Aa888888'),
    new Member('mohammed','ali basha',2468,'1800-01-01','ecuador','no','drawing','many colors','painting','sokkar','KLJ','dardardodo@3w3w.com','Aa888888')
];



    // Get all members
router.get('/', (req, res) => res.json({ data: memberList }));


router.post('/', (req, res) => {
	const firstName = req.body.firstName
    const lastName = req.body.lastName
    const phoneNumber = req.body.phoneNumber
	const birthDate = req.body.birthDate
    const location = req.body.location
	const otherContacts = req.body.otherContacts
    const field = req.body.field
	const skills = req.body.skills
	const interests = req.body.interests
	const experience = req.body.experience
	const certificates = req.body.certificates
	const email = req.body.email
	const password = req.body.password
	
	const schema = {
        firstName:   Joi.string().min(3).required(),
        lastName:    Joi.string().min(3).required(),
        phoneNumber: Joi.number().required(),
        birthDate:   Joi.date().max('1-1-2002').iso(),
        location:    Joi.string().min(5).required(),
        otherContacts:Joi.string(),
        field:       Joi.string().min(3).required(),
        skills:      Joi.string().min(3).required(),
        interests:   Joi.string().min(3),
        experience:  Joi.string().min(3).required(),
        certificates:Joi.string(),
        email:       Joi.string().email().required(),
        password:    Joi.string().min(8).alphanum().required(),
	}

	const result = Joi.validate(req.body, schema)

	if (result.error) return res.status(400).send({ error: result.error.details[0].message })

	const newMember = new Member(firstName,lastName,phoneNumber,birthDate,location,otherContacts,field,skills,interests,experience,certificates,email,password)
    memberList.push(newMember)
    return res.json({ data: newMember })
});

router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const member = memberList.find(x => x.id===id)
     if(!member) return res.status(404).send({error: 'member does not exist '})
     const  firstName           =req.body.firstName
     const  lastName            =req.body.lastName
     const  phoneNumber         =req.body.phoneNumber
     const  birthDate           =req.body.birthDate
     const  location            =req.body.location
     const  otherContacts       =req.body.otherContacts
     const  field               =req.body.field
     const  skills              =req.body.skills
     const  interests           =req.body.interests
     const  tasks               =req.body.tasks
     const  attendedEvents      =req.body.attendedEvents
     const  email               =req.body.email
     const  password            =req.body.password
     const  experience          =req.body.experience
     const  rate                =req.body.rate
     const  certificates        =req.body.certificates






     
     if(firstName)      member.firstName=firstName
     if(lastName)       member.lastName=lastName
     if(phoneNumber)    member.phoneNumber=phoneNumber
     if(birthDate)      member.birthDate=birthDate
     if(location)       member.location=location
     if(otherContacts)  member.otherContacts=otherContacts
     if(field)          member.field=field
     if(skills)         member.skills=skills
     if(interests)      member.interests=interests
     if(tasks)          member.tasks.push(tasks)
     if(attendedEvents) member.attendedEvents.push(attendedEvents)
     if(email)          member.email=email
     if(password)       member.password=password
     if(experience)     member.experience=experience
     if(rate)           member.rate=rate
     if(certificates)   member.certificates=certificates

     res.json({member})

    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedMember = memberList.find(x => x.id===id)
     if(!deletedMember) return res.status(404).send({error: 'member does not exist '})
     let index =memberList.findIndex(x => x.id===id)
     memberList.splice(index,1)
     res.json({msg:'Member was deleted successfully', data: deletedMember , data2:memberList})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
