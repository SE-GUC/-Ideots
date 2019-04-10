const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            phone: Joi.number().required()  
        }

        return Joi.validate(request, createSchema)
    },
    updateValidation: request => {
        const updateSchema = {
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(8).alphanum(),
            phone: Joi.number()
        }

        return Joi.validate(request, updateSchema)
    }
}