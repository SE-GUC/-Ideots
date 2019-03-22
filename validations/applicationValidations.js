const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            applicantId: Joi.required(),
            taskId: Joi.required(),
            date: Joi.date(),
            acceptence: joi.valid([-1,0, 1]).required(),
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const createSchema = {
            acceptence: joi.valid([-1,0, 1]),
        }
        return Joi.validate(request, createSchema)
    }, 
}