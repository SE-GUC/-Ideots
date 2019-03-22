// const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required : false 
    },
    eventRequestId :{
        type : Schema.Types.ObjectId ,
        required :false 
    } ,
    rate:{
        type:Number           
    }
}) ; 
// The Event Model
// class Event {
//     constructor(
//         location ,
//         description ,
//         type,
//         registrationPrice,
//         numberOfSpaces,
//         speakers,
//         topics,
//         numberOfRegisterations,
//         dateTime,
//         organizerId,
//         eventRequestId
//         )
        
//         {
//         this.eventId = uuid.v4();
//         this.location=location;
//         this.description=description;
//         this.type=type;
//         this.registrationPrice=registrationPrice;
//         this.speakers=speakers;
//         this.topics=topics;
//         this.numberOfSpaces = numberOfSpaces;
//         this.numberOfRegisterations=numberOfRegisterations;
//         this.rate=5;
//         this.dateTime=dateTime;
//         this.organizerId=organizerId; // partner aw consultancy aw admin 
//         this.eventRequestId=eventRequestId;
//     };
// }

module.exports = Event = mongoose.model('events' , EventSchema)