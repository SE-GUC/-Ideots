const express = require('express')
const router = express.Router()
const Review=require('../../models/Review')
const Joi = require('joi');
module.exports=router

const reviewList =[
new Review(123,567,5,'no',0),
new Review(246,135,2,'bad',1),
new Review(037,456,5,'very good',2),
];

   // Get all members
   router.get('/', (req, res) => res.json({ data: reviewList }));


   router.post('/', (req, res) => {

    const reviewer = req.body.reviewer
    const reviewed = req.body.reviewed
    const rate = req.body.rate 
    const comment = req.body.comment
    const type = req.body.type 

    const schema = {
        reviewer :  Joi.required(),
        reviewed : Joi.required(),
        rate :   Joi.number().required(),
        comment :  Joi.string(),
        type :  Joi.any().valid([0, 1,2]).required()
    }
    const result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })

    const newReview = new Review (reviewer,reviewed,rate,comment,type)
    reviewList.push(newReview)

    return res.json({ data: newReview })
});
        
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const review = reviewList.find(x => x.id===id)
     if(!review) return res.status(404).send({error: 'review does not exist '})
    
     const reviewer = req.body.reviewer
     const reviewed = req.body.reviewed
     const rate = req.body.rate 
     const comment = req.body.comment
     const type = req.body.type

     if(reviewer)  review.reviewer = reviewer
     if(reviewed)  review.reviewed = reviewed
     if(rate) review.rate = rate
     if(comment) review.comment = comment
     if(type) review.type = type

     res.json({review , data:reviewList})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedReview = reviewList.find(x => x.id===id)
     if(!deletedReview) return res.status(404).send({error: 'review does not exist '})
     let index =reviewList.findIndex(x => x.id===id)
     reviewList.splice(index,1)
     res.json({msg:'review was deleted successfully', data: deletedReview , data2:reviewList})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

