// const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const user = require ('./User')
const eventRequest = require ('./EventRequest')

const EventSchema = new Schema({
    location :{
        type:Object  , 
        required : true 
    } ,
    description : {
        type : String ,
        required : true 
    } ,
    type : {
        type : String ,
        required : true 
    },
    registrationPrice:{
        type : Number ,
        required : true 
    },
    numberOfSpaces:{
        type : Number ,
        required : true 
    },
    speakers : {
        type : [String] // becauese there may exist alot of speakers 
    },
    topics : {
        type : [String] ,
        required : true 
    },
    numberOfRegisterations : {
       type : Number 
    },
    dateTime:{
        type : Date , 
        required : true 
    },
    organizerId:{
        type : Schema.Types.ObjectId ,
        ref:'Users',
        required : true  
    },
    eventRequestId :{
        type : Schema.Types.ObjectId ,
        ref: 'eventRequests' , 
        required :true 
    } ,
    rate:{
        type:Number           
    }
}) ; 


module.exports = Event = mongoose.model('events' , EventSchema)
