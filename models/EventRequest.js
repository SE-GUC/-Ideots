// const uuid = require('uuid')
//Event Request Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required : true 
    } ,
    acceptenceState : Number   // -1 rejected , 0 pending , 1 accepted


})
// class EventRequest {
//     constructor(
//         location ,
//         description ,
//         type,
//         registrationPrice,
//         numberOfSpaces,
//         speakers,
//         topics,
//         dateTime,
//         organizerId
//         )

//         {
//         this.eventRequestId=uuid.v4();
//         this.acceptenceState = 0;                                   // -1 rejected , 0 accepted , 1 accepted
//         this.location=location;
//         this.description=description;
//         this.registrationPrice=registrationPrice;
//         this.speakers=speakers;
//         this.topics=topics;
//         this.type=type;
//         this.numberOfSpaces = numberOfSpaces;
//         this.dateTime=dateTime;
//         this.organizerId=organizerId;
//     };
    
    
// }

module.exports = EventRequest = mongoose.model('eventRequests' ,EventRequestSchema ) ; 