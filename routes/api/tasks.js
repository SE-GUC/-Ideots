
const express = require('express') 
const router = express.Router();
const mongoose = require('mongoose')
const validator = require('../../validations/taskValidations')
// We will be connecting using database
const Task = require("../../models/Task");

router.get("/",async (req, res) =>{
    const tasks = await Task.find()
    res.json({ data: tasks })
});

router.get('/:id', async (req, res) => {  
    try{
    const  taskID = req.params.id;  
    const task = await Task.findOne({"_id":taskID})
    if(!task) return res.status(404).send({error: 'Task does not exist'})
    return res.json({task});
    }
    catch(error)
    {
      console.log(error)
    }
  });

  router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newTask = await Task.create(req.body)
     res.json({msg:'Task was created successfully', data: newTask})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })


 router.put('/:id', async (req,res) => {
    try {
     const taskID = req.params.id
     const taskApplicant = req.body.applicant

     const task = await Task.findById(taskID)
     if(!task) return res.status(404).send({error: 'Task does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     if(!taskApplicant){}
     else{Task.update({"_id":taskID},{$addToSet:{"applicants":taskApplicant}})}
     const updatedTask = await Task.updateOne({'_id':taskID},req.body)
     res.json({msg: 'Task updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })


 router.delete('/:id', async (req,res) => {
    try {
     const taskID = req.params.id
     const deletedTask = await Task.findByIdAndRemove(taskID)
     if(!deletedTask) return res.status(404).send({error: 'task does not exist' })
     res.json({msg:'Task was deleted successfully', data: deletedTask})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 }) 

// **searching for tasks**

//search by category
router.get('/search/category=:cat', async(req, res) => { 
const cat = req.params.cat
const tasks = await Task.find({"category":cat})
if(tasks.length==0)return res.status(404).send({error: 'no tasks found'})
return res.json({tasks});

});

//search by year of experience
router.get('/search/experience=:exp', async(req, res) => { 
const exp = req.params.exp
const tasks = await Task.find({"yearsOfExperience":exp})
if(tasks.length==0) return res.status(404).send({error: 'no tasks found'})
return res.json({tasks});

});

//search by monetary compensation *********************************************************************************************
router.get('/search/payment=:pay', async(req, res) => { 
const pay = req.params.pay
const min =Number(pay)-50
const max=Number(pay)+50
const tasks = await Task.find({"payment":{ $lte:max ,$gte:min} })
if(tasks.length==0) return res.status(404).send({error: 'no tasks found'})
return res.json({tasks});

});

//recommended tasks
router.get('/recommended/:id', async(req, res) => { 
const id = req.params.id
const user =await User.findById(id)
const userSkills = user.skills
const tasks = await Task.find({"requiredSkills":{$in:userSkills}})
if(tasks.length==0) return res.status(404).send({error: 'No tasks suitable for you at the moment, Try something new ?'})
return res.json({tasks});

}); 

module.exports = router ; 
