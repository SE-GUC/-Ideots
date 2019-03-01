
const uuid = require('uuid')
class Request {
    constructor( 
                partnerID ,
                date ,
                description ,
                consult ,
                accepted ,
                feedback ) {
                this.requestID = uuid.v4();
                this.partnerID = partnerID ,
                this.description = description;
                this.date = date;
                this.consult = consult;
                this.accepted = accepted;
                this.feedback = feedback;
            };
}

module.exports = Request