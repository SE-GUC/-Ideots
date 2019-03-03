// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const application = require('../../models/Application');

// temporary data created as if it was pulled out of the database ...
const applicationList = [
    
	new application(1,1),
	new application(2,2),
	new application(3,3),
	new application(4,4),
	new application(5,5)
];


// Get all application
router.get('/', (req, res) => res.json({ data: applicationList }));

//Get a specific application
router.get('/:id', (req, res) => 
    {   const  applicationId = req.params.id;  
        const application = applicationList.find(app => app.id === applicationId);
        return res.json({application}); 
});


// Create a new application
router.post('/', (req, res) => {
     
	const applicantId = req.body.applicantId
    const taskId = req.body.taskId
        
	const schema = {
		applicantId: Joi.required(),
        taskId: Joi.required(),       
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    
    
    const app=new application(applicantId,taskId);
    applicationList.push(app)
    return res.json({app });
    
});

router.put('/:id', (req, res) => {
    const  applicationId = req.params.id;  
    
	const applicantId = req.body.applicantId
    const taskId = req.body.taskId

    const application = applicationList.find(app => app.id === applicationId);
    
    if(applicantId)application.applicantId=applicantId;
    if(taskId)application.taskId=taskId;
    res.json({application : applicationList});
});



router.delete('/:id', (req, res) => {  
   const  applicationId = req.params.id;  
   const application = applicationList.find(app => app.id === applicationId);
   const index = applicationList.indexOf(application);
   applicationList.splice(index,1);
   
   return res.json({applicationList});
});


module.exports = router;
