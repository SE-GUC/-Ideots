const uuid = require('uuid')
//Event Bookin Model
class EventBooking {
    constructor(
        eventId,
        memberId ,
        registrationPrice,
        //bookingClass
        paymentMethod
        
        )

        {
        this.eventBookingId= uuid.v4();
        this.eventId=eventId;
        this.memberId=memberId; 
        this.registrationPrice=registrationPrice;
        this.paymentMethod=paymentMethod;
       // this.bookingClass=bookingClass;
    };
}

module.exports = EventBooking