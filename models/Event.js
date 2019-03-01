const uuid = require('uuid')
// The Event Model
class Event {
    constructor(
        location ,
        description ,
        type,
        registrationPrice,
        numberOfSpaces,
        speakers,
        topics,
        numberOfRegisterations,
        dateTime,
        organizerId,
        eventRequestId
        )
        
        {
        this.eventId = uuid.v4();
        this.location=location;
        this.description=description;
        this.type=type;
        this.registrationPrice=registrationPrice;
        this.speakers=speakers;
        this.topics=topics;
        this.numberOfSpaces = numberOfSpaces;
        this.numberOfRegisterations=numberOfRegisterations;
        this.rate=5;
        this.dateTime=dateTime;
        this.organizerId=organizerId; // partner aw consultancy aw admin 
        this.eventRequestId=eventRequestId;
    };
}

module.exports = Event