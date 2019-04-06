const Joi = require('joi')

Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
     //consaltancyAgency
    createValidationConsaltancyAgency: request => {
        const createSchema = {
            type: Joi.string().required().valid('partner','member','consultancy_agency'),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            description:Joi.string().required(),
            specialization:Joi.array().items(Joi.string()).required(),
            website:Joi.string().required(),
            fax:Joi.strict().required(),
            address:Joi.object().required(),
            reports:Joi.array().items(Joi.string()),
            boardMembers:Joi.array().items(Joi.objectId()),
            partners:Joi.array().items(Joi.objectId()),
            events:Joi.array().items(Joi.objectId())
        }
        return Joi.validate(request, createSchema)
    },
            //member
    createValidationMember: request => {
        const createSchema = {
            type: Joi.string().required().valid('partner','member','consultancy_agency'),
            name: Joi.object().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            phoneNumber:Joi.array().items(Joi.string()).required(),
            birthDate:Joi.date().required(),
            location:Joi.object().required(),
            otherContacts:Joi.array().items(Joi.string()).required(),
            field:Joi.array().items(Joi.string()).required(),
            skills:Joi.array().items(Joi.string()).required(),
            interests:Joi.array().items(Joi.string()).required(),
            tasks:Joi.array().items(Joi.objectId()),
            attendedEvents:Joi.array().items(Joi.objectId()),
            experience:Joi.array().items(Joi.string()).required(),
            certificates:Joi.array().items(Joi.string())
        }
        return Joi.validate(request, createSchema)
    },
    createValidationPartner: request => {
        const createSchema = {
            type: Joi.string().required().valid('partner','member','consultancy_agency'),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            basicBussinesInformation:Joi.object().required(),
            boardMembers:Joi.array().items(Joi.objectId()).required(),
            fieldOfWork:Joi.array().items(Joi.string()).required(),
            partners:Joi.array().items(Joi.objectId()).required(),
            eventOrganized:Joi.array().items(Joi.objectId()),
            formFeedBack:Joi.object(),
            pastProjects:Joi.array().items(Joi.objectId()),
            contactInfo:Joi.object().required()
        }

        return Joi.validate(request, createSchema)
    },
    //consaltancyAgency
    updateValidationConsaltancyAgency: request => {
        const updateSchema = {
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(8).alphanum(),
            rate:Joi.number(),
            description:Joi.string(),
            specialization:Joi.array().items(Joi.string()),
            website:Joi.string(),
            fax:Joi.strict(),
            address:Joi.object(),
            reports:Joi.array().items(Joi.string()),
            boardMembers:Joi.array().items(Joi.objectId()),
            partners:Joi.array().items(Joi.objectId()),
            events:Joi.array().items(Joi.objectId())
        }
        return Joi.validate(request, updateSchema)
    },
    //member
    updateValidationMember: request => {
        const updateSchema = {
            name: Joi.object(),
            email: Joi.string().email(),
            password: Joi.string().min(8).alphanum(),
            rate:Joi.number(),
            phoneNumber:Joi.array().items(Joi.string()),
            birthDate:Joi.date(),
            location:Joi.object(),
            otherContacts:Joi.array().items(Joi.string()),
            field:Joi.array().items(Joi.string()),
            skills:Joi.array().items(Joi.string()),
            interests:Joi.array().items(Joi.string()),
            tasks:Joi.array().items(Joi.objectId()),
            attendedEvents:Joi.array().items(Joi.objectId()),
            experience:Joi.array().items(Joi.string()),
            certificates:Joi.array().items(Joi.string())
        }
        return Joi.validate(request, updateSchema)
    },
    //partner
    updateValidationPartner: request => {
        const updateSchema = {
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(8).alphanum(),
            rate:Joi.number(),
            basicBussinesInformation:Joi.object(),
            boardMembers:Joi.array().items(Joi.objectId()),
            fieldOfWork:Joi.array().items(Joi.string()),
            partners:Joi.array().items(Joi.objectId()),
            eventOrganized:Joi.array().items(Joi.objectId()),
            formFeedBack:Joi.object(),
            pastProjects:Joi.array().items(Joi.objectId()),
            contactInfo:Joi.object()
        }
        return Joi.validate(request, updateSchema)
    },
}
