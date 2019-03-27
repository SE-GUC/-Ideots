const Joi = require('joi')

module.exports = {
requestCreateValidation : request => {
    const createSchema = {
        partnerID : Joi.string().required(),
        description : Joi.string().required(),
        consult : Joi.boolean().required(),
        accepted : Joi.any().valid([-1,0,1]),        //-1 rejected , 0 pending , 1 accepted
        feedback : Joi.string(),
        date : Joi.string()
        }
        return Joi.validate(request,createSchema)
},
requestUpdateValidation: request=> {
    const updateSchema = {
      //  partnerID : Joi.string().required(),
        description : Joi.string().required(),
        consult : Joi.boolean().required(),
        accepted : Joi.any().valid([-1,0,1]),        //-1 rejected , 0 pending , 1 accepted
        feedback : Joi.string().min(0).max(500),
        date : Joi.string()
        }
        return Joi.validate(request,updateSchema)
    }

}