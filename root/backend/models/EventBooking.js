// const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const event=require('./Event')
//const user = require('./User')
const EventBookingSchema = new Schema ({
 
    eventId:{
        type : Schema.Types.ObjectId ,
        ref:'events',
        required :true 
    },
    memberId :{
        type : Schema.Types.ObjectId ,
        ref:'Users',
        required : true 
    } ,
    registrationPrice:{
        type : Number , 
        required : true 
    },
    paymentMethod : {
        type : String , 
        required : true 
    }
}) ; 

//Event Bookin Model
// class EventBooking {
//     constructor(
//         eventId,
//         memberId ,
//         registrationPrice,
//         //bookingClass
//         paymentMethod
        
//         )

//         {
//         this.eventBookingId= uuid.v4();
//         this.eventId=eventId;
//         this.memberId=memberId; 
//         this.registrationPrice=registrationPrice;
//         this.paymentMethod=paymentMethod;
//        // this.bookingClass=bookingClass;
//     };
// }

module.exports = EventBooking = mongoose.model('eventBookings' , EventBookingSchema)