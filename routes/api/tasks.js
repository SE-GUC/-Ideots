
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const validator = require('../../validations/taskValidations')
// We will be connecting using database
const Task = require("../../models/Task");

/*const tasks=[

    new Task(1,1,"hello it is me " , "js and css " , 1500 , "link here " , "dunno " , "dont know " , "computer science " ,
    15 , false , 5.0 , 4.8 , "ahmad 3loka " ) 
    , new Task(2,2,"i want a car  " , "mechanics" , 1780 , "link here " , "dunno " , "dont know " , "mechanical science  " ,
    10 , true  , 5.0 , 3.1 , "ibrahem ahmed  " ) 
]; */


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
     res.json({msg:'Task was deleted successfully', data: deletedTask})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 }) 

module.exports = router ; 