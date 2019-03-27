const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Review=require('../../models/Review')
const Joi = require('joi');


// Get all members
router.get('/', async (req,res) => {
    const reviews = await Review.find()
    res.json({data: reviews})
})

router.get('/:id', async(req, res) => {  
      const id = req.params.id 
       const review = await Review.findOne({"_id":id});   
       if(!review) return res.status(404).send({error: 'review does not exist'})
        
        return res.json({review});

  });
 
 
 router.post('/', async(req, res) => {

     const reviewer = req.body.reviewer
    const reviewed = req.body.reviewed
    const rate = req.body.rate 
    const comment = req.body.comment
    const reviewType = req.body.reviewType 

    const schema = {
        reviewer :  Joi.required(),
        reviewed : Joi.required(),
        rate :   Joi.number().required(),
        comment :  Joi.string(),
        reviewType :  Joi.any().valid([0, 1,2]).required()
    }
    const result = Joi.validate(req.body, schema)


    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    
    const newReview = await Review.create(req.body)
    
    return res.json({ msg:'Review was created successfully',data: newReview })
});

router.put('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const review = await Review.findOne({ "_id" : id });   
       if(!review) return res.status(404).send({error: 'review does not exist'})
        const schema = {
            rate :   Joi.number(),
            reviewType :  Joi.any().valid([0, 1,2])
        }
    const result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    
    const updatedReview = await Review.updateOne({ "_id" : id },req.body)
     res.json({data:updatedReview})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
})
router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const deletedReview = await Review.findByIdAndRemove(id)
        if(!deletedReview) return res.status(404).send({error: 'review does not exist' })
        res.json({msg:'review was deleted successfully', data: deletedReview})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
})


module.exports=router