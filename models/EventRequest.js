// const uuid = require('uuid')
//Event Request Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const  user = require('./User')
const EventRequestSchema = new Schema ({

    location :{
        type:Object,
        required : true 

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
    speakers : [String],
    topics : [String],
    dateTime: Date,
    organizerId : {
        type : Schema.Types.ObjectId ,
      //  ref :user  ,
        required : true 
    } ,
    acceptenceState : Number   // -1 rejected , 0 pending , 1 accepted


})


module.exports = EventRequest = mongoose.model('eventRequests' ,EventRequestSchema ) ; 