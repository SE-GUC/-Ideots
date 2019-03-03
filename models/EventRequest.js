const uuid = require('uuid')
//Event Request Model
class EventRequest {
    constructor(
        location ,
        description ,
        type,
        registrationPrice,
        numberOfSpaces,
        speakers,
        topics,
        dateTime,
        organizerId
        )

        {
        this.eventRequestId=uuid.v4();
        this.acceptenceState = 0;                                   // -1 rejected , 0 accepted , 1 accepted
        this.location=location;
        this.description=description;
        this.registrationPrice=registrationPrice;
        this.speakers=speakers;
        this.topics=topics;
        this.type=type;
        this.numberOfSpaces = numberOfSpaces;
        this.dateTime=dateTime;
        this.organizerId=organizerId;
    };
    
    
}

module.exports = EventRequest