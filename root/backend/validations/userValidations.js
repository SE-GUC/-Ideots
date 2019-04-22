const Joi = require('joi')

Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
     //consaltancyAgency
    createValidationConsaltancyAgency: request => {
        const createSchema = {
            type: Joi.string().valid('partner','member','consultancy_agency').required(),
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            description:Joi.string(),
            specialization:Joi.array().items(Joi.string()),
            website:Joi.string(),
            fax:Joi.strict(),
            address:Joi.object(),
            reports:Joi.array().items(Joi.string()),
            boardMembers:Joi.array().items(Joi.objectId()),
            partners:Joi.array().items(Joi.objectId()),
            events:Joi.array().items(Joi.objectId()),
            registrationPhase:Joi.number()
        }
        return Joi.validate(request, createSchema)
    },
            //member
    createValidationMember: request => {
        const createSchema = {
            type: Joi.string().valid('partner','member','consultancy_agency').required(),
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
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
        return Joi.validate(request, createSchema)
    },
    createValidationPartner: request => {
        const createSchema = {
            type: Joi.string().valid('partner','member','consultancy_agency').required(),
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            basicBussinesInformation:Joi.object(),
            boardMembers:Joi.array().items(Joi.objectId()),
            fieldOfWork:Joi.array().items(Joi.string()),
            partners:Joi.array().items(Joi.objectId()),
            eventOrganized:Joi.array().items(Joi.objectId()),
            formFeedBack:Joi.object(),
            pastProjects:Joi.array().items(Joi.objectId()),
            contactInfo:Joi.object()
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
            name: Joi.string(),
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




//////CHANGES
//create Partner kan 3ndo partners array of object IDs required 
//w board members bardo