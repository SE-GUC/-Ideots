// const uuid = require('uuid')
//Event Request Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const  user = require('./User')
const EventRequestSchema = new Schema ({

    location :{
        type:Object,
        

    } ,
    description : {
        type : String 
    } ,
    type : String  , 
    registrationPrice : {
        type : Number , 
        required : true 
    },
    numberOfSpaces :  { 
        type : Number , 
        required : true 
    },
    speakers : {type: [String]},
    topics :  {type: [String]},
    dateTime: {type: Date},
    organizerId : {
        type : Schema.Types.ObjectId ,
        ref : 'Users'  ,
        required : true 
    } ,
    acceptenceState :{type: Number}   // -1 rejected , 0 pending , 1 accepted


})


module.exports = EventRequest = mongoose.model('eventRequests' ,EventRequestSchema ) ; 